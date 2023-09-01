import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { MostLikedMoviesModule } from './most-liked-movies/most-liked-movies.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/movie_likes'),
    MoviesModule,
    MostLikedMoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
