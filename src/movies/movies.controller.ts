import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }
}
