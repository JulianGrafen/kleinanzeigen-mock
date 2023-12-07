import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ReceiveListingDTO } from './DTO/ReceiveListing.dto';

@Controller()
export class ListingsController {
  constructor(private readonly appService: AppService) {}


@Post('receiveListing')
receiveListing(@Body() receiveListingDTO:ReceiveListingDTO){
 console.log(receiveListingDTO);
}
}
