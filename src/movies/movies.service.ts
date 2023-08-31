import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async likeMovie(movieId: string): Promise<Movie | null> {
    let movie = await this.movieModel.findByIdAndUpdate(
      /* eslint-disable indent, spaced-comment */
      movieId,
      { $inc: { likes: 1 } },
      { new: true, upsert: true },
    );

    if (!movie) {
      movie = new this.movieModel({
        _id: movieId,
        likes: 1,
      });

      await movie.save();
      return movie;
    }

    return movie;
  }

  async getMovie(movieId: string): Promise<Movie | null> {
    const movie = await this.movieModel.findById(movieId).exec();

    if (!movie) {
      throw new NotFoundException('Filme não encontrado!');
    }

    return movie;
  }

  async getLikesForMovie(movieId: string): Promise<number> {
    const movie = await this.movieModel.findById(movieId).exec();

    if (!movie) {
      throw new NotFoundException('Filme não encontrado!');
    }

    return movie.likes;
  }
}
