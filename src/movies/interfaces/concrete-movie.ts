/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export class ConcreteMovie extends Document {
  _id: string;
  title: string;
  popularity: number;
  likes: number;
}
