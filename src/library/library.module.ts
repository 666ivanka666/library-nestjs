import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService]
})
export class LibraryModule {}



export class Library {
  constructor(
    public id: string,
    public title: string,
    public dateOfPublished: string,
    public description: string,
    public author: string, 
  ) {}
}


