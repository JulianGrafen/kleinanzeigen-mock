import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ReceiveListingDTO } from './DTO/ReceiveListing.dto';
import { object } from 'joi';

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

@Post('getListingsById')
async findById(@Body() objectId){
  const listings = this.listingsService.findById(objectId); 
  return listings;
}



}

