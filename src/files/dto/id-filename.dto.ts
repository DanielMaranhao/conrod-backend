import { IntersectionType } from '@nestjs/swagger';
import { IdDto } from 'common/dto/id.dto';
import { FilenameDto } from './filename.dto';

export class IdFilenameDto extends IntersectionType(IdDto, FilenameDto) {}
