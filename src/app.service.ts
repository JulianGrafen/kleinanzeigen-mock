import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class AppService {

  constructor(
    private httpService: HttpService

  ) {}

  getHello(): string {
    return 'Here you will see the articles that have been published trough Vencio';
  }
  async receiveMessage(messageDto) {
    //const apiUrl = "http://localhost:5000/"
    const message = messageDto.message.toString();
    console.log(message);
  
  }
}