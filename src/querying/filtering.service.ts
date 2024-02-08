import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

@Injectable()
export class FilteringService {
  contains(text: string) {
    if (!text) return;

    return ILike(`%${text}%`);
  }
}
