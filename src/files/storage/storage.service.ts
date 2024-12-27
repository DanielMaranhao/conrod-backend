import { Injectable, StreamableFile } from '@nestjs/common';
import { File } from 'files/util/file.constants';

@Injectable()
export abstract class StorageService {
  abstract saveFile(path: string, file: File): Promise<void>;
  abstract createDir(path: string): Promise<void>;
  abstract getFile(path: string): StreamableFile;
  abstract getDirFilenames(path: string): Promise<string[]>;
  abstract getDirFilecount(path: string): Promise<number>;
  abstract delete(path: string): Promise<void>;
  abstract validatePath(path: string): Promise<void>;
  abstract validateFilecount(count: number, max: number): void;
  abstract genUniqueFilename(filename: string): string;
}
