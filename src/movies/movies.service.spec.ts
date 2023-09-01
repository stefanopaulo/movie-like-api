/* eslint-disable prettier/prettier */
import { Movie } from './interfaces/movie.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let movieModel: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken('Movie'), // Substitua 'Movie' pelo nome do seu modelo
          useValue: {
            findByIdAndUpdate: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    movieModel = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  describe('likeMovie', () => {
    it('should add likes to an existing movie', async () => {
      const existingMovie = new Movie({ _id: 'movieId', likes: 5 });
      movieModel.findByIdAndUpdate.mockResolvedValueOnce(existingMovie);

      const result = await moviesService.likeMovie('movieId');

      expect(result.likes).toBe(6);
    });

    it('should create a new movie with likes when the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      movieModel.findByIdAndUpdate.mockResolvedValueOnce(null);
      movieModel.create.mockResolvedValueOnce({ _id: nonExistingMovieId, likes: 1 });

      const result = await moviesService.likeMovie(nonExistingMovieId);

      expect(result._id).toBe(nonExistingMovieId);
      expect(result.likes).toBe(1);
    });

    it('should throw NotFoundException when the movie does not exist and cannot be created', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      movieModel.findByIdAndUpdate.mockResolvedValueOnce(null);
      movieModel.create.mockResolvedValueOnce(null);

      try {
        await moviesService.likeMovie(nonExistingMovieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Filme não encontrado!');
      }
    });
  });

  describe('getMovie', () => {
    it('should return an existing movie', async () => {
      const existingMovie = new Movie({ _id: 'movieId', title: 'Movie Title' });
      movieModel.findById.mockResolvedValueOnce(existingMovie);

      const result = await moviesService.getMovie('movieId');

      expect(result).toEqual(existingMovie);
    });

    it('should throw NotFoundException when the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      movieModel.findById.mockResolvedValueOnce(null);

      try {
        await moviesService.getMovie(nonExistingMovieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Filme não encontrado!');
      }
    });
  });

  describe('getLikesForMovie', () => {
    it('should return the number of likes for an existing movie', async () => {
      const existingMovie = new Movie({ _id: 'movieId', likes: 10 });
      movieModel.findById.mockResolvedValueOnce(existingMovie);

      const result = await moviesService.getLikesForMovie('movieId');

      expect(result).toBe(10);
    });

    it('should throw NotFoundException when the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      movieModel.findById.mockResolvedValueOnce(null);

      try {
        await moviesService.getLikesForMovie(nonExistingMovieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Filme não encontrado!');
      }
    });
  });
});
