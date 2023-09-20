import { Injectable, NotFoundException } from '@nestjs/common';
import { Library } from './library.module';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LibraryService {
  private libraries: Library[] = [];

  insertLibrary(title: string, dateOfPublished: string, description: string, author: string): string {
    const libraryId = uuidv4();
    const newLibrary = new Library(libraryId, title, dateOfPublished, description, author);
    this.libraries.push(newLibrary);
    return libraryId;
  }

  getLibraries(): Library[] {
    return this.libraries;
  }

  getSingleLibrary(libraryId: string): Library {
    const [library] = this.findLibrary(libraryId);
    return library;
  }

  updateLibrary(libraryId: string, title: string, dateOfPublished: string, description: string, author: string): void {
    const [library, index] = this.findLibrary(libraryId);

    if (title) {
      library.title = title;
    }
    if (dateOfPublished) {
      library.dateOfPublished = dateOfPublished;
    }
    if (description) {
      library.description = description;
    }
    if (author) {
      library.author = author;
    }
  }

  deleteLibrary(libraryId: string): void {
    const [_, index] = this.findLibrary(libraryId);
    this.libraries.splice(index, 1);
  }

  private findLibrary(id: string): [Library, number] {
    const libraryIndex = this.libraries.findIndex((library) => library.id === id);
    if (libraryIndex === -1) {
      throw new NotFoundException(`Library with ID ${id} not found`);
    }
    return [this.libraries[libraryIndex], libraryIndex];
  }
}
