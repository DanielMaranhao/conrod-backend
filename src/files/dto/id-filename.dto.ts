import { IdDto } from '#/common/dto/id.dto.js';
import { IntersectionType } from '@nestjs/swagger';
import { FilenameDto } from './filename.dto.js';

export class IdFilenameDto extends IntersectionType(IdDto, FilenameDto) {}
