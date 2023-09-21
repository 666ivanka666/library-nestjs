import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { IdDto, LibraryDto } from './dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  addLibrary(@Body() body: LibraryDto): any {
    const generatedId = this.libraryService.insertLibrary(
      body.title,
      body.dateOfPublished,
      body.description,
      body.author,
    );
    return { id: generatedId };
  }

  @Get()
  getAllLibraries() {
    return this.libraryService.getLibraries();
  }

  @Get(':id')
  getLibraryById(@Param() params: IdDto) {
    return this.libraryService.getSingleLibrary(params.id);
  }

  @Put(':id')
  updateLibrary(@Param() params: IdDto, @Body() body: LibraryDto) {
    console.log(params);
    this.libraryService.updateLibrary(
      params.id,
      body.title,
      body.dateOfPublished,
      body.description,
      body.author,
    );
    return null;
  }

  @Delete(':id')
  deleteLibraryById(@Param() params: IdDto) {
    this.libraryService.deleteLibrary(params.id);
    return null;
  }
}
