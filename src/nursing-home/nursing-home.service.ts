import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nursingHomenew } from './schemas/nursing-home.schema';

@Injectable()
export class NursingHomeService {
  private readonly logger = new Logger(NursingHomeService.name);

  constructor(@InjectModel(nursingHomenew.name) private readonly nursingHomeModel: Model<nursingHomenew>) {}

  async getMultipleCategories(queryDto: any): Promise<any> {
    const { state, city, zipCode, overall_rating, name, page, limit = 10, search } = queryDto;
  
    console.log('Query DTO:', queryDto);
    const query: any = {};
  
    if (state) {
      query.state = { $regex: new RegExp(state, 'i') };
    }
  
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }
  
    if (zipCode) {
      query.zipCode = zipCode;
    }
  
    if (overall_rating) {
      const overallRatings = overall_rating.map(Number);
      query.overall_rating = { $in: overallRatings };
    }
  
    if (search) {
      const searchQuery = {
        $or: [
          { name: { $regex: new RegExp(search, 'i') } },
          { zipCode: { $regex: new RegExp(search, 'i') } },
          { state: { $regex: new RegExp(search, 'i') } },
          { city: { $regex: new RegExp(search, 'i') } },
          { mainCategory: { $regex: new RegExp(search, 'i') } },
        ],
      };
      Object.assign(query, searchQuery);
    }
  
    console.log('Constructed Query:', query);
  
    try {
      const result = await this.nursingHomeModel
        .find(query)
        .select('_id name city state mainCategory fullAddress phoneNumber zipCode images overall_rating longitude latitude')
        .lean()
        .skip(page * limit)
        .limit(limit)
        .exec();
  
      console.log('Query Result:', result);
  
      const totalCount = await this.nursingHomeModel.countDocuments(query).exec();
      console.log('Total Count:', totalCount);
  
      return { totalCount, result };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
  
}
