import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { FormValuesService } from '../form-values.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  @Input() book: Book;
  @Input() del: boolean = true;
  constructor(
    private formValues: FormValuesService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {}
  // edit(): void {
  //   this.formValues.addValues(this.book);
  // }
  delete(): void {
    this.bookService.deleteBook(this.book);
  }
}
