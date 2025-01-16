import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

describe('AppModule', () => {
  let configService: ConfigService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    configService = module.get<ConfigService>(ConfigService);
  });
  it('should be defined', () => {
    expect(module).toBeDefined();
  });
  it('should get MONGO_URI', () => {
    expect(configService.get<string>('MONGO_URI')).toBeDefined();
  });
  it('should generate the correct mongo uri', async () => {
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      const config = {
        MONGO_URI:
          'mongodb+srv://${USER_NAME}:${PASSWORD}@movie-lobby.fop8c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=movie-lobby',
        USER_NAME: 'testUserName',
        PASSWORD: 'testPWD',
        DB_NAME: 'testDB',
      };
      return config[key];
    });
    const mongoURI = configService.get<string>('MONGO_URI');
    const USER_NAME = configService.get<string>('USER_NAME');
    const PASSWORD = configService.get<string>('PASSWORD');
    const DB_NAME = configService.get<string>('DB_NAME');
    const uri = mongoURI
      .replace('${USER_NAME}', USER_NAME)
      .replace('${PASSWORD}', PASSWORD)
      .replace('${DB_NAME}', DB_NAME);
    expect(uri).toEqual(
      'mongodb+srv://testUserName:testPWD@movie-lobby.fop8c.mongodb.net/testDB?retryWrites=true&w=majority&appName=movie-lobby',
    );
  });
});
