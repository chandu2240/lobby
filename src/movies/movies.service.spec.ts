import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('MoviesService', () => {
  let service: MoviesService;
  let model: Model<Movie>;

  beforeEach(async () => {
    const movieModelMock = {
      find: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: movieModelMock,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    model = module.get<Model<Movie>>(getModelToken(Movie.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const mockMovies: Movie[] = [
      {
        title: 'test',
        rating: 7,
        genre: ['test'],
        streamingLink: 'test',
      },
      {
        title: 'test2',
        rating: 8,
        genre: ['test'],
        streamingLink: 'test',
      },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockMovies),
    } as any);
    const res = await service.findAll();
    expect(res).toEqual(mockMovies);
  });
});
