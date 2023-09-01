import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { MoviesService } from './movies.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async likeMovie(@Param('id') id: string) {
    const likedMovie = await this.moviesService.likeMovie(id);
    return likedMovie;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMovie(@Param('id') id: string) {
    const movie = await this.moviesService.getMovie(id);

    return movie;
  }

  @Get(':id/likes')
  @UseGuards(JwtAuthGuard)
  async getLikesForMovie(@Param('id') id: string) {
    const likes = await this.moviesService.getLikesForMovie(id);
    return { likes };
  }
}
