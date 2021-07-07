import { Controller, Post, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { WordDto } from './dto/word.dto';

@Controller('validate')
export class ValidateController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  async handlePost(@Body() wordDto: WordDto) {
    return {
        "word":wordDto.word,
        "isValid": await this.wordService.validate(wordDto)
    }
  }
}
