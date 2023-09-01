import { Controller, Get } from '@nestjs/common';
import { MostLikedMovie } from './schemas/most-liked-movie.model';
import { MostLikedMoviesService } from './most-liked-movies.service';

@Controller('most-liked-movies')
export class MostLikedMoviesController {
  constructor(private mostLikedMoviesService: MostLikedMoviesService) {}

  @Get()
  async findAll(): Promise<MostLikedMovie[]> {
    return this.mostLikedMoviesService.findAll();
  }
}
