import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class FormValuesService {
  formValues = new Subject<Book>();

  constructor() {}

  addValues(book: Book): void {
    this.formValues.next(book);
  }
}
