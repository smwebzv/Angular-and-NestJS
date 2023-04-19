import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { Portfolio } from '../entities/portfolio.entity';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config_test: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './database/testdb',
  entities: ['src/entities/*.entity.ts'],
  synchronize: true,
};

export async function createTestingModule() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: async () =>
          Object.assign(config_test, {
            autoLoadEntities: true,
            keepConnectionAlive: true,
          }),
      }),
      TypeOrmModule.forFeature([Portfolio]),
    ],
    controllers: [AppController],
    providers: [AppService],
  }).compile();

  return moduleFixture;
}
