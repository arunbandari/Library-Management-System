import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000/api';
  addBook(body:any) {
    return this.http.post(`${this.baseUrl}/books/add`, body);
  }
  updateBook(body:any) {
    return this.http.patch(`${this.baseUrl}/books/update`, body);
  }
  getBooks() {
    return this.http.get(`${this.baseUrl}/books`);
  }
  getBookById(bookId:any) {
    return this.http.get(`${this.baseUrl}/books/${bookId}`);
  }
  getUserById(userId:any, role:string) {
    return this.http.get(`${this.baseUrl}/users/${userId}?role=${role}`);
  }
  getBookHistoryByUser(userId:any, role: string) {
    return this.http.get(`${this.baseUrl}/users/${userId}/history?role=${role}`);
  }
  issueBook(userId:any, bookId:any, role:string) {
    return this.http.post(`${this.baseUrl}/book_requests/issue`, { userId, bookId, role });
  }
  returnBook(id:any, role:string, fine: number) {
    return this.http.post(`${this.baseUrl}/book_requests/return`, { id, role, fine });
  }
  getStatus(bookId:any) {
    return this.http.get(`${this.baseUrl}/books/${bookId}/status`);
  }

  // students
  getStudents() {
    return this.http.get(`${this.baseUrl}/students`);
  }
  addStudent(body:any) {
    return this.http.post(`${this.baseUrl}/students/add`, body);
  }
  getStudentById(studentId:any) {
    return this.http.get(`${this.baseUrl}/students/${studentId}`);
  }
  updateStudent(body:any) {
    return this.http.patch(`${this.baseUrl}/students/update`, body);
  }

  //faculty
  getFaculty() {
    return this.http.get(`${this.baseUrl}/faculty`);
  }
  addFaculty(body:any) {
    return this.http.post(`${this.baseUrl}/faculty/add`, body);
  }
  getFacultyById(facultyId:any) {
    return this.http.get(`${this.baseUrl}/faculty/${facultyId}`);
  }
  updateFaculty(body:any) {
    return this.http.patch(`${this.baseUrl}/faculty/update`, body);
  }

  // misc
  getFineDetails(id:any, role:any) {
    return this.http.get(`${this.baseUrl}/book_requests/fine-details?id=${id}&role=${role}`);
  }
}
