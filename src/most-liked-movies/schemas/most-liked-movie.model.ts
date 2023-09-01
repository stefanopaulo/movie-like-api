/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MostLikedMovie extends Document {
  @Prop()
  _id: string;

  @Prop()
  likesCount: number;
}

export const MostLikedMovieSchema = SchemaFactory.createForClass(MostLikedMovie);
