import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NursingHomeService } from './nursing-home.service';
import { NursingHomeController } from './nursing-home.controller';
import { nursingHomenew, NursingHomeSchema } from './schemas/nursing-home.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: nursingHomenew.name, schema: NursingHomeSchema }]),
  ],
  controllers: [NursingHomeController],
  providers: [NursingHomeService],
})
export class NursingHomeModule {}