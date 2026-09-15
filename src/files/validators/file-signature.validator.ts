import { File } from '#/files/types/file.types.js';
import { FileValidator } from '@nestjs/common';
import { filetypeinfo } from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }

  buildErrorMessage() {
    return 'Validation failed (file type does not match file signature)';
  }

  isValid(file: File) {
    const fileSignatures = filetypeinfo(file.buffer).map((file) => file.mime);
    if (!fileSignatures.length) return false;

    const isMatch = fileSignatures.includes(file.mimetype);
    if (!isMatch) return false;

    return true;
  }
}
