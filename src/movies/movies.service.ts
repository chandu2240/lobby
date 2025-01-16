import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async create(movie: Movie): Promise<Movie> {
    try {
      const newMovie = new this.movieModel(movie);
      await newMovie.save();
      return newMovie;
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: string, movie: Movie): Promise<Movie> {
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, movie, { new: true })
      .exec();
    if (!updatedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return updatedMovie;
  }

  async delete(id: string): Promise<void> {
    const result = await this.movieModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Movie not found');
    }
  }
}
