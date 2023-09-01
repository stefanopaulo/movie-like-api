import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MostLikedMovie } from './schemas/most-liked-movie.model';
import { Model } from 'mongoose';

@Injectable()
export class MostLikedMoviesService {
  constructor(
    @InjectModel(MostLikedMovie.name)
    private mostLikedMovieModel: Model<MostLikedMovie>,
  ) {}

  async findAll(): Promise<MostLikedMovie[]> {
    return this.mostLikedMovieModel.find().exec();
  }
}
