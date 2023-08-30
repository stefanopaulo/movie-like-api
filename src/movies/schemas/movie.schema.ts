import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  title: String,
  popularity: Number,
  likes: Number,
});