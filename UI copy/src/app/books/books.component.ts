import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books:any = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

}
