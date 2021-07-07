import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { ValidateController } from './validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { SearchController } from './search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [ValidateController, SearchController],
  providers: [WordService]
})
export class WordModule {}
