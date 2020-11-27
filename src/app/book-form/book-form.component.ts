import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { NgForm } from '@angular/forms';
import { Book } from '../book';
import { FormValuesService } from '../form-values.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  formValues: Book = {
    title: '',
    author: '',
    pages: 0,
    reading_status: false,
    id: 0,
  };
  update = false;
  constructor(
    private bookService: BookService,
    private formValuesService: FormValuesService
  ) {}

  ngOnInit(): void {
    this.formValuesService.formValues.subscribe((values) => {
      this.formValues = values;
      this.update = true;
    });
  }
  onSubmit(f: NgForm) {
    if (f.value.reading_status == 'true') {
      this.formValues.reading_status = true;
    } else {
      this.formValues.reading_status = false;
    }
    if (this.update) {
      this.bookService.updateBooks(this.formValues);
      this.update = false;
    } else {
      this.bookService.addBook(this.formValues);
    }
    f.reset();
  }
}
