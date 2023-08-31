import mongoose from 'mongoose';

export interface Movie extends mongoose.Document {
  _id: string;
  title: string;
  popularity: number;
  likes: number;
}
