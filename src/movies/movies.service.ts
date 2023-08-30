import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async likeMovie(movieId: string): Promise<Movie | null> {
    const movie = await this.movieModel.findByIdAndUpdate(
      /* eslint-disable indent, spaced-comment */
      movieId,
      { $inc: { likes: 1 } },
      { new: true },
    );

    return movie;
  }
}
