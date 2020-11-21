import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      {
        id: 11,
        title: 'A book',
        pages: 23,
        author: 'An author',
        reading_status: true,
      },
      {
        id: 12,
        title: 'A book',
        pages: 22,
        author: 'An author',
        reading_status: false,
      },
      {
        id: 13,
        title: 'A book',
        pages: 26,
        author: 'An author',
        reading_status: true,
      },
      {
        id: 14,
        title: 'A book',
        pages: 26,
        author: 'An author',
        reading_status: false,
      },
      {
        id: 15,
        title: 'A book',
        pages: 23,
        author: 'An author',
        reading_status: true,
      },
    ];
    return { books };
  }
  genId(books: Book[]): number {
    return books.length > 0
      ? Math.max(...books.map((hero) => hero.id)) + 1
      : 11;
  }
}
