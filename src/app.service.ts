import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Here you will see the articles that have been published trough Vencio';
  }
}
