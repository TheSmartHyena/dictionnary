import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordDto } from './dto/word.dto';
import { Word } from './entities/word.entity';
import * as data from './words.json'

@Injectable()
export class WordService {
  private readonly myLogger = new Logger(WordService.name);

  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
  ) {
    data.words.forEach(async (word)=> {
      await this.wordsRepository.insert({ 
        value: word
      });
    });
  }

  handleRequest(wordDto: WordDto) {
    switch(wordDto.actionType) {
      case 'validate':
        return this.validate(wordDto.word);
        break;
      case 'search':
        return this.search(wordDto.word);
        break;
      default:
        const completeMsg = `Action type not recognised: ${wordDto.actionType}`;
        this.myLogger.error(completeMsg);
        throw new HttpException(completeMsg, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async validate(word: string) {

    const result = await this.wordsRepository.findOne({ value: word });
    if (result) {
      return {"word": word, "actionType": "validate", "result": true};
    } else {
      return {"word": word, "actionType": "validate", "result": false};
    }    
  }

  search(word: string): any {
    return {"word": word, "actionType": "search", "result": []};
  }
}
