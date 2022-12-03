import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId:any;
  title:string = 'Add Book';
  bookForm!: UntypedFormGroup;
  mode:string = 'create';
  constructor(private fb: UntypedFormBuilder, private api: ApiService, private route: ActivatedRoute) {
    this.bookForm = this.fb.group({
      book_id: [null],
      book_name: [null, [Validators.required]],
      book_author: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookId = bookId;
    this.api.getBookById(this.bookId).subscribe((book:any) => {
      if (!book) return;
      this.mode = 'update';
      this.title = 'Update Book';
      this.bookForm.patchValue(book);
    });
  }

  submit() {
    if (this.mode === 'create') {
      this.api.addBook(this.bookForm.value).subscribe((data) => {
        console.log(data);
        alert('A new book has been added!');
        this.bookForm.reset();
      });
    } else {
      this.api.updateBook(this.bookForm.value).subscribe((data) => {
        console.log(data);
        alert('The book details have been updated!');
      });
    } 
  }
}
