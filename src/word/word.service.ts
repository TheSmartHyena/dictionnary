import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
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
    this.initDb();
  }

  async initDb() {        
    if (await this.wordsRepository.count() === 0) {
      data.words.forEach(async (word) => {
        await this.wordsRepository.insert({ 
          value: word
        });
      });
      this.myLogger.log(`Number of words: ${await this.wordsRepository.count()}`);
    }
  }

  async validate(wordDto: WordDto) {
    const found: Word = await this.wordsRepository.findOne({ value: wordDto.word });
    return found.value !== "" ? true: false;
  }

  async search(wordDto: WordDto) {
    let sqliteQuery = "";
    if (wordDto.word.includes("?") ) {
      sqliteQuery = this.buildQueryWithWildcard(wordDto.word);
    } else {
      sqliteQuery = this.buildQueryWithoutWildcard(wordDto.word);
    }    
    return this.wordsRepository.query(sqliteQuery);
  }

  buildQueryWithoutWildcard(word: string): string {
    let result: string = `SELECT * FROM word WHERE LENGTH(value)=${word.length} `;    
    for (const char of word) {
      result += ` AND value LIKE '%${char}%'`;
    }
    return result;
  }

  buildQueryWithWildcard(word: string): string {
    let charList: string = "";
    for (const char of word) {
      if (char === '?') {
        charList += `_`;
      } else {
        charList += char;
      }
    }

    return `SELECT * FROM word where value LIKE '${charList}' AND LENGTH(value) = ${word.length}`;
  }

}
