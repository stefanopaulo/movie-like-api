import { Controller, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post(':id/like')
  async likeMovie(@Param('id') id: string) {
    const likedMovie = await this.moviesService.likeMovie(id);
    return likedMovie;
  }
}
