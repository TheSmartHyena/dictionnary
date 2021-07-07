import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './word/word.module';
import "reflect-metadata"
import { Word } from './word/entities/word.entity';

@Module({
  imports: [WordModule, TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: 'db.sql',
    entities: [Word],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}