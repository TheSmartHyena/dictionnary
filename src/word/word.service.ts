import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { WordDto } from './dto/word.dto';
import * as data from './words.json'

@Injectable()
export class WordService {
  private readonly myLogger = new Logger(WordService.name);

  constructor() {
    data.words.forEach(word => {
      // this.myLogger.log(word);
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

  validate(word: string): any {
    return {"word": word, "actionType": "validate", "result": false};
  }

  search(word: string): any {
    return {"word": word, "actionType": "search", "result": []};
  }
}
