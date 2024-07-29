import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class nursingHomenew extends Document {
  @Prop()
  cms_certification_number: string;

  @Prop()
  provider_ssa_county_code: number;

  @Prop()
  county_or_parish: string;

  @Prop()
  ownership_type: string;

  @Prop()
  average_number_of_residents_per_day: number;

  @Prop()
  average_number_of_residents_per_day_footnote: string;

  @Prop()
  provider_type: string;

  @Prop()
  provider_resides_in_hospital: boolean;

  @Prop()
  legal_business_name: string;

  @Prop()
  date_first_approved_to_provide_medicare_and_medicaid_services: string;

  @Prop()
  affiliated_entity_name: string;

  @Prop()
  affiliated_entity_id: number;

  @Prop()
  name: string;

  @Prop()
  profile: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ default: 'nursingHome' })
  mainCategory: string;

  @Prop({ default: 0 })
  contactedCustomer: number;

  @Prop()
  city: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  fullAddress: string;

  @Prop()
  zipCode: string;

  @Prop()
  state: string;

  @Prop()
  closed: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop()
  patient_survey_rating: string;

  @Prop()
  number_of_certified_beds: string;

  @Prop()
  overall_rating: number;

  @Prop()
  management: string;

  @Prop()
  in_hospital: boolean;

  @Prop({
    type: Map,
    of: String,
  })
  openingHours: Record<string, string>;

  @Prop([{
    name: String,
    email: String,
    reviews: String,
    startRating: Number,
    date: { type: Date, default: Date.now },
  }])
  reviews: Record<string, any>[];

  @Prop([{
    name: String,
    email: String,
    complain: String,
    date: { type: Date, default: Date.now },
  }])
  complain: Record<string, any>[];
}

export const NursingHomeSchema = SchemaFactory.createForClass(nursingHomenew);
NursingHomeSchema.index({ location: '2dsphere' });