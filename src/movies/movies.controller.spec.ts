import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
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
  const mockMoviesService = {
    findAll: jest.fn().mockResolvedValue(mockMovies),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const res = await controller.findAll();
    expect(res).toEqual(mockMovies);
    expect(service.findAll).toHaveBeenCalled();
  });
});
