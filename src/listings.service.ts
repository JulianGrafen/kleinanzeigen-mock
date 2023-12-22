import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './schemas/listing.schema';
import { ReceiveListingDTO } from './dto/ReceiveListing.dto';
import { UpdatedArticleDto } from './DTO/UpdatedArticel.dto';


@Injectable()
export class ListingsService {

  constructor(@InjectModel(Listing.name) private listingModel: Model<Listing>) {}

  async create(receiveListingDTO: ReceiveListingDTO): Promise<string> {
    console.log("Listing saved");
    const receiveListing = new this.listingModel(receiveListingDTO);
    const savedArticle = await receiveListing.save();
    console.log(savedArticle._id)
    console.log(receiveListingDTO);
    return savedArticle._id.toString();
  }

  async findAll(): Promise<Listing[]> {
    return this.listingModel.find().exec();
  }

  async findById(objectId){
    try {
      const listings = await this.listingModel.find({ _id: { $in: objectId } }).exec();
      console.log(listings);
      return listings;
    } catch (error) {
      console.error('Error finding listings by object IDs:', error);
      throw error;
    }
  }

  async update(updatedArticleDto: UpdatedArticleDto): Promise<any> {
    try {
      console.log("update called")
      const objectId = updatedArticleDto.id; 
      const updatedListing = await this.listingModel.findByIdAndUpdate(
        objectId,
        { $set: updatedArticleDto },
        { new: true } 
      );

      if (!updatedListing) {
        throw new Error('Listing not found');
      }

      return updatedListing;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  }
}