import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
})
export class BookCollectionComponent implements OnInit {
  Books: Book[];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.Books = books));
  }
}
