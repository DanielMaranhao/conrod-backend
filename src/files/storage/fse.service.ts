import { File } from '#/files/types/file.types.js';
import { BASE_PATH } from '#/files/util/file.constants.js';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import fse from 'fs-extra';
import { join } from 'path';
import { StorageService } from './storage.service.js';

@Injectable()
export class FseService implements StorageService {
  async saveFile(path: string, file: File) {
    const { originalname, buffer } = file;

    const uniqueFilename = this.genUniqueFilename(originalname);
    const fullPath = join(BASE_PATH, path, uniqueFilename);
    await fse.writeFile(fullPath, buffer);
  }

  async createDir(path: string) {
    const fullPath = join(BASE_PATH, path);
    await fse.mkdirp(fullPath);
  }

  getFile(path: string) {
    const fullPath = join(BASE_PATH, path);
    const stream = fse.createReadStream(fullPath);
    return new StreamableFile(stream);
  }

  getDirFilenames(path: string) {
    const fullPath = join(BASE_PATH, path);
    return fse.readdir(fullPath);
  }

  async getDirFilecount(path: string) {
    const dirFilenames = await this.getDirFilenames(path);
    return dirFilenames.length;
  }

  async delete(path: string) {
    const fullPath = join(BASE_PATH, path);
    await fse.remove(fullPath);
  }

  async validatePath(path: string) {
    const fullPath = join(BASE_PATH, path);

    const exists = await fse.pathExists(fullPath);
    if (!exists) {
      throw new NotFoundException('Path not found');
    }
  }

  validateFilecount(count: number, max: number) {
    if (count > max) {
      throw new ConflictException('File count exceeds max limit');
    }
  }

  genUniqueFilename(filename: string) {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    return `${uniquePrefix}-${filename}`;
  }
}
