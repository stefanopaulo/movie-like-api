/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  popularity: Number,
  likes: Number,
});