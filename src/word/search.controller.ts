import { Controller, Post, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { WordDto } from './dto/word.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  async handlePost(@Body() wordDto: WordDto) {
    return {
        "word":wordDto.word,
        "wordFound": await this.wordService.search(wordDto)
    }
  }
}
