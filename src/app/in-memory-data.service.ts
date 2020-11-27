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
        title: 'Things Fall Apart',
        pages: 209,
        author: 'Chinua Achebe',
        reading_status: true,
      },
      {
        id: 12,
        title: 'Wuthering Heights ',
        pages: 342,
        author: 'Emily Bront',
        reading_status: false,
      },
      {
        id: 13,
        title: 'Middlemarch',
        pages: 800,
        author: 'Middlemarch',
        reading_status: true,
      },
      {
        id: 14,
        title: 'Nostromo',
        pages: 194,
        author: 'Joseph Conrad',
        reading_status: false,
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
