import { Body, Controller, Post } from '@nestjs/common';
import { NursingHomeService } from './nursing-home.service';
import { GetMultipleCategoriesDto } from './dto/get-multiple-categories.dto';

@Controller('nursing-home')
export class NursingHomeController {
  constructor(private readonly nursingHomeService: NursingHomeService) {}

  @Post('getMultipleCat')
  async getMultipleCategories(@Body() queryDto: GetMultipleCategoriesDto): Promise<any> {
    return this.nursingHomeService.getMultipleCategories(queryDto);
  }
}
