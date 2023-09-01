import { Movie } from './interfaces/movie.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
import { NotFoundException } from '@nestjs/common';

describe('MovieService', () => {
  let movieService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test', {}),
        MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
      ],
      providers: [MoviesService],
    }).compile();

    movieService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  it('should increment likes for an existing movie', async () => {
    // Create a movie in the test database
    const movieId = 'testMovieId';
    const initialMovie = new Movie({ _id: movieId, likes: 1 });
    await initialMovie.save();

    // Call the likeMovie method
    const updatedMovie = await movieService.likeMovie(movieId);

    // Check if the likes have been incremented
    expect(updatedMovie.likes).toBe(2);
  });

  it('should create a new movie with 1 like if the movie does not exist', async () => {
    // Call the likeMovie method with a non-existing movieId
    const movieId = 'nonExistingMovieId';
    const newMovie = await movieService.likeMovie(movieId);

    // Check if a new movie with 1 like has been created
    expect(newMovie._id).toBe(movieId);
    expect(newMovie.likes).toBe(1);
  });
});

describe('MovieService', () => {
  let movieService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test', {}),
        MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
      ],
      providers: [MoviesService],
    }).compile();

    movieService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('getMovie', () => {
    it('should return a movie if it exists', async () => {
      const movieId = 'testMovieId';
      const movieTitle = 'Test Movie';
      const existingMovie = new Movie({ _id: movieId, title: movieTitle });
      await existingMovie.save();

      const foundMovie = await movieService.getMovie(movieId);

      expect(foundMovie).toBeDefined();
      expect(foundMovie.title).toBe(movieTitle);
    });

    it('should throw NotFoundException if the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';

      try {
        await movieService.getMovie(nonExistingMovieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Filme não encontrado!');
      }
    });
  });
});
