import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordService } from './word.service';
import { WordDto } from './dto/word.dto';

/**
 * Represents the Word controler
 */
@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  /**
   * This route is the entrypoint of the application, the unique POST route. <br>
   * @param {WordDt} wordDto Payload
   * @returns {object} With this signature: {word: string, actionType: string, result: string[]|boolean}
   */
  @Post()
  create(@Body() wordDto: WordDto) {
    return this.wordService.handleRequest(wordDto);
  }
}
