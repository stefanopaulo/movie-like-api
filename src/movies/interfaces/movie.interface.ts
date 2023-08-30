import mongoose from 'mongoose';

export interface Movie extends mongoose.Document {
  title: string;
  popularity: number;
  likes: number;
}
