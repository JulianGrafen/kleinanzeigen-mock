import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './DTO/Message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/articles")
  getHello(): string {
    return this.appService.getHello();

 
  }
  @Post("message")
  async receiveMessage(@Body()messageDto:MessageDto){
    this.appService.receiveMessage(messageDto);
  }
  
  
}
