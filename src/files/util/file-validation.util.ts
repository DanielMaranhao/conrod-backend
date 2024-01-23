import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import * as bytes from 'bytes';
import { NonEmptyArray } from 'common/util/array.util';

type FileSize = `${number}${'KB' | 'MB' | 'GB'}`;
type FileType = 'png' | 'jpeg' | 'pdf';

export const createFileValidators = (
  maxSize: FileSize,
  ...fileTypes: NonEmptyArray<FileType>
): FileValidator[] => {
  const fileTypeRegex = new RegExp(fileTypes.join('|'));

  return [
    new MaxFileSizeValidator({ maxSize: bytes(maxSize) }),
    new FileTypeValidator({ fileType: fileTypeRegex }),
  ];
};
