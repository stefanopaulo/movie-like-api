/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MostLikedMoviesService } from './most-liked-movies.service';
import { MostLikedMoviesController } from './most-liked-movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MostLikedMovie, MostLikedMovieSchema } from './schemas/most-liked-movie.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
        name: MostLikedMovie.name, 
        schema: MostLikedMovieSchema,
    }]),
  ],
  providers: [MostLikedMoviesService],
  controllers: [MostLikedMoviesController],
})
export class MostLikedMoviesModule {}
