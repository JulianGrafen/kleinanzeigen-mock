import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './schemas/listing.schema';
import { ReceiveListingDTO } from './dto/ReceiveListing.dto';


@Injectable()
export class ListingsService {

  constructor(@InjectModel(Listing.name) private listingModel: Model<Listing>) {}

  async create(receiveListingDTO: ReceiveListingDTO): Promise<string> {
    console.log("Listing saved");
    const receiveListing = new this.listingModel(receiveListingDTO);
    const savedArticle = await receiveListing.save();
    console.log(savedArticle._id)
    return savedArticle._id.toString();
  }

  async findAll(): Promise<Listing[]> {
    return this.listingModel.find().exec();
  }
}
