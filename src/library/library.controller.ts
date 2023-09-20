import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  addLibrary(
    @Body('title') libraryTitle: string,
    @Body('dateOfPublished') libraryDate: string,
    @Body('description') libraryDesc: string,
    @Body('author') libraryAuth: string,
  ): any {
    const generatedId = this.libraryService.insertLibrary(libraryTitle, libraryDate, libraryDesc, libraryAuth);
    return { id: generatedId };
  }

  @Get()
  getAllLibraries() {
    return this.libraryService.getLibraries();
  }

  @Get(':id')
  getLibraryById(@Param('id') libraryId: string) {
    return this.libraryService.getSingleLibrary(libraryId);
  }

  @Put(':id')
  updateLibrary(
    @Param('id') libraryId: string,
    @Body('title') libraryTitle: string,
    @Body('dateOfPublished') libraryDate: string,
    @Body('description') libraryDesc: string,
    @Body('author') libraryAuth: string,
  ) {
    this.libraryService.updateLibrary(libraryId, libraryTitle, libraryDate, libraryDesc, libraryAuth);
    return null;
  }

  @Delete(':id')
  deleteLibraryById(@Param('id') libraryId: string) {
    this.libraryService.deleteLibrary(libraryId);
    return null;
  }
}
