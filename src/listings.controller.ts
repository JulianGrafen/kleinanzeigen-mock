import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ReceiveListingDTO } from './DTO/ReceiveListing.dto';

@Controller()
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {};


@Post('receiveListing')
  async receiveListing(@Body() receiveListingDTO:ReceiveListingDTO){
  const createdListingId = await this.listingsService.create(receiveListingDTO);
  return { _id: createdListingId };
}

@Get('getListings')
async findAll() {
  return this.listingsService.findAll();
}



}

