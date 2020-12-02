import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { NgForm } from '@angular/forms';
import { Book } from '../book';
import { FormValuesService } from '../form-values.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  formValues: any = {
    title: '',
    author: '',
    pages: 0,
    reading_status: false,
  };
  update = false;
  subcription;
  editBook: Book[] = [
    {
      id: 0,
      title: '',
      pages: 0,
      author: '',
      reading_status: false,
    },
  ];
  constructor(
    private bookService: BookService,
    private formValuesService: FormValuesService
  ) {}

  ngOnInit(): void {
    this.subcription = this.formValuesService.formValues.subscribe((values) => {
      this.formValues = values;
      console.log(this.formValues);
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
      this.bookService.updateBooks(this.formValues as Book);
      delete this.formValues.id;
      this.update = false;
      this.editBook[0] = {
        id: 0,
        title: '',
        pages: 0,
        author: '',
        reading_status: false,
      };
    } else {
      this.bookService.addBook(this.formValues as Book);
    }
    f.reset();
  }

  cancelEdit(f: NgForm) {
    f.reset();
    this.update = false;
    this.editBook[0] = {
      id: 0,
      title: '',
      pages: 0,
      author: '',
      reading_status: false,
    };
    this.bookService.getBooks();
  }

  drop(event: CdkDragDrop<Book[]>) {
    if (this.editBook[0].pages == 0) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0
      );
      this.formValuesService.addValues(this.editBook[0]);
    } else {
      return;
    }
  }
}
