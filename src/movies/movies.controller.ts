import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    movie: Movie,
  ): Promise<Movie> {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.moviesService.delete(id);
  }
}
