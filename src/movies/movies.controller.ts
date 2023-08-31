import { Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post(':id/like')
  async likeMovie(@Param('id') id: string) {
    const likedMovie = await this.moviesService.likeMovie(id);
    return likedMovie;
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    const movie = await this.moviesService.getMovie(id);

    return movie;
  }

  @Get(':id/likes')
  async getLikesForMovie(@Param('id') id: string) {
    const likes = await this.moviesService.getLikesForMovie(id);
    return { likes };
  }
}
