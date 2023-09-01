import { Test, TestingModule } from '@nestjs/testing';
import { MostLikedMoviesService } from './most-liked-movies.service';

describe('MostLikedMoviesService', () => {
  let service: MostLikedMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MostLikedMoviesService],
    }).compile();

    service = module.get<MostLikedMoviesService>(MostLikedMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
