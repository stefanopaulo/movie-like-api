import { Test, TestingModule } from '@nestjs/testing';
import { MostLikedMoviesController } from './most-liked-movies.controller';

describe('MostLikedMoviesController', () => {
  let controller: MostLikedMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MostLikedMoviesController],
    }).compile();

    controller = module.get<MostLikedMoviesController>(MostLikedMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
