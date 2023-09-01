/* eslint-disable prettier/prettier */
import { closeConnection, createConnection } from 'mongoose-mock';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { ConcreteMovie } from './interfaces/concrete-movie';
import { MoviesService } from './movies.service';


describe('MoviesService', () => {
  let moviesService: MoviesService;
  let movieModel: Model<ConcreteMovie>;

  beforeEach(async () => {
    const mongoose = await createConnection();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken('Movie'),
          useValue: mongoose.model('Movie', new mongoose.Schema()),
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    movieModel = module.get<Model<ConcreteMovie>>(getModelToken('Movie'));
  });

  afterAll(() => {
    closeConnection();
  });

  describe('likeMovie', () => {
    it('should add likes to an existing movie', async () => {
      const existingMovie = new movieModel({ _id: 'movieId', likes: 5 });
      jest.spyOn(movieModel, 'findByIdAndUpdate').mockResolvedValueOnce(existingMovie);

      const result = await moviesService.likeMovie('movieId');

      expect(result.likes).toBe(6);
    });

    it('should create a new movie with likes when the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';

      jest.spyOn(movieModel, 'findByIdAndUpdate').mockResolvedValueOnce(null);
    
      movieModel.create = jest.fn().mockResolvedValueOnce({
        _id: nonExistingMovieId,
        likes: 1,
      });
    
      const result = await moviesService.likeMovie(nonExistingMovieId);
    
      expect(result._id).toBe(nonExistingMovieId);
      expect(result.likes).toBe(1);
    });

    it('should throw NotFoundException when the movie does not exist and cannot be created', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      jest.spyOn(movieModel, 'findByIdAndUpdate').mockResolvedValueOnce(null);
      jest.spyOn(movieModel, 'create').mockResolvedValueOnce(null);

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
      const existingMovie = new ConcreteMovie({ _id: 'movieId', likes: 5 });
      
      // Simule o findById para retornar o filme existente
      jest.spyOn(movieModel, 'findById').mockResolvedValueOnce(existingMovie);
  
      const result = await moviesService.getMovie('movieId');
  
      expect(result).toEqual(existingMovie);
    });
  
    it('should throw NotFoundException when the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      
      // Simule o findById para retornar nulo, indicando que o filme não existe
      jest.spyOn(movieModel, 'findById').mockResolvedValueOnce(null);
  
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
      const existingMovie = new ConcreteMovie({ _id: 'movieId', likes: 10 });
      
      // Simule o findById para retornar o filme existente
      jest.spyOn(movieModel, 'findById').mockResolvedValueOnce(existingMovie);
  
      const result = await moviesService.getLikesForMovie('movieId');
  
      expect(result).toBe(10);
    });
  
    it('should throw NotFoundException when the movie does not exist', async () => {
      const nonExistingMovieId = 'nonExistingMovieId';
      
      jest.spyOn(movieModel, 'findById').mockResolvedValueOnce(null);
  
      try {
        await moviesService.getLikesForMovie(nonExistingMovieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Filme não encontrado!');
      }
    });
  });
});
