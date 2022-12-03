import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {
  mapper:any = {
    student: {
      searchPlaceHolder: 'Student ID',
      name: 'student_name',
      title: 'Student Book Management'
    },
    faculty: {
      searchPlaceHolder: 'Faculty ID',
      name: 'faculty_name',
      title: 'Faculty Book Management'
    }
  };
  role:any = 'student';
  searchPlaceHolder = 'Student ID';
  validateForm!: UntypedFormGroup;
  bookId: string = '';
  userId: string = '';
  book: any = {};
  user: any = {};
  history:any = [];
  fine:number = 5;
  available:boolean = true;
  constructor(private api: ApiService, private message: NzMessageService, private route: ActivatedRoute, private router: Router) {
    const role = this.route.snapshot.queryParams['role'];
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.role = role;
    if (!['student', 'faculty'].includes(this.role)) this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.user = {};
    this.book = {};
    this.history = {};
    this.bookId = '';
  }
  getUserById() {
    this.user = {};
    this.book = {};
    this.history = {};
    this.bookId = '';
    this.api.getUserById(this.userId, this.role).subscribe((data:object) => {
      console.log(data);
      this.user = data;
      if(!data) {
        this.user = {};
        this.book = {};
        this.history = {};
        this.bookId = '';
        alert('No user found with this id');
        return;
      }
      this.api.getBookHistoryByUser(this.userId, this.role).subscribe((data:any) => {
        console.log(data);
        this.history = data;
      });
    });
  }
  getBookById() {
    this.api.getStatus(this.bookId).subscribe((resp:any) => {
      console.log(resp);
      this.available = resp.available;
      this.api.getBookById(this.bookId).subscribe((data:any) => {
        this.book = data || {};
        if (!data) {
          this.book = {};
          alert('No book found with this id');
        }
        console.log(data);
      });
    })
  }
  issueBook() {
    this.api.issueBook(this.userId, this.bookId, this.role).subscribe((data:any) => {
      if (data.success) {
        this.api.getBookHistoryByUser(this.userId, this.role).subscribe((data:any) => {
          console.log(data);
          this.history = data;
        });
      }
      this.getBookById();
      alert(data.message);
    });
  }
  returnBook(id:any) {
    this.api.getFineDetails(id, this.role).subscribe((res:any) => {
      let confirmed = true;
      if (res.fine) this.fine = res.fine;
      if (res.fined) confirmed = confirm(`You\'ve exceeded due date, press ok to pay $${this.fine} fine and continue`);
      if (!confirmed) return;
      this.api.returnBook(id, this.role, this.fine).subscribe((data:any) => {
        if (data.message) alert(data.message);
        console.log(data);
        this.api.getBookHistoryByUser(this.userId, this.role).subscribe((data:any) => {
          console.log(data);
          this.history = data;
        });
      });
    });
    
  }
  getPlaceHolder() {
    console.log(this.mapper, this.role);
    return this.mapper[this.role].searchPlaceHolder;
  }
}
