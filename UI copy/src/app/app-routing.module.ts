import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BooksComponent} from './books/books.component'
import {IssueBookComponent} from './issue-book/issue-book.component'
import {BookComponent} from './book/book.component';
import {ListComponent} from './students/list/list.component';
import {FacultyListComponent} from './faculty/faculty-list/faculty-list.component';
import {StudentComponent} from './students/student/student.component';
import {FacultyComponent} from './faculty/faculty/faculty.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'issue-book-student', component: IssueBookComponent },
  { path: 'book', component: BookComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'students', component: ListComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'faculty', component: FacultyListComponent },
  { path: 'faculty-form', component: FacultyComponent },
  { path: 'faculty-form/:id', component: FacultyComponent },
  { path: 'issue-book-faculty', component: IssueBookComponent },
  { path: '**', component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
