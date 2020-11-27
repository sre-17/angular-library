import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksUrl = 'api/books';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  Books = new Subject<Book[]>();
  private bookArray: Book[];

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getBooks(): void {
    this.http.get<Book[]>(this.booksUrl).subscribe((books) => {
      this.Books.next(books);
      this.bookArray = books;
    });
  }

  addBook(book: Book): void {
    console.log(book);
    this.http
      .post<Book>(this.booksUrl, book, this.httpOptions)
      // .pipe(
      //   tap((newBook: Book) =>
      //     console.log(`Book with id:${newBook.reading_status}`)
      //   ),
      //   catchError(this.handleError<Book>('addBook'))
      // )
      .subscribe((newBook: Book) => {
        console.log(newBook);
        this.bookArray.push(newBook);
        this.Books.next(this.bookArray);
      });
  }

  updateBooks(book: Book): void {
    this.http
      .put(this.booksUrl, book, this.httpOptions)
      .subscribe((book: Book) => {
        this.getBooks();
      });
  }

  deleteBook(book: Book): void {
    const id = book.id;
    const url = `${this.booksUrl}/${id}`;

    this.http
      .delete<Book>(url, this.httpOptions)
      .pipe(
        tap((_) => console.log(`Book deleted: ${book}`)),
        catchError(this.handleError<Book>('deletebook'))
      )
      .subscribe(() => this.getBooks());
  }
}
