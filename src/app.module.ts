import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration } from './config/configuration';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    Configuration,
    MongooseModule.forRootAsync({
      imports: [Configuration],
      useFactory: async (configService: ConfigService) => {
        const mongoURI = configService.get<string>('MONGO_URI');
        const USER_NAME = configService.get<string>('USER_NAME');
        const PASSWORD = configService.get<string>('PASSWORD');
        const DB_NAME = configService.get<string>('DB_NAME');
        const uri = mongoURI
          .replace('${USER_NAME}', USER_NAME)
          .replace('${PASSWORD}', PASSWORD)
          .replace('${DB_NAME}', DB_NAME);
        return { uri };
      },
      inject: [ConfigService],
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
