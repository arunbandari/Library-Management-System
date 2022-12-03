// eslint-disable-next-line strict
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db.js');
const bookHelper = require('./books.js');
const requstBooksHelper = require('./book_requests.js');
const userHelper = require('./users.js');
const studentHelper = require('./students.js');
const facultyHelper = require('./faculty.js');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(true));

db(app);

// books
app.get('/api/books', bookHelper.getBooks);
app.post('/api/books/add', bookHelper.addBook);
app.patch('/api/books/update', bookHelper.updateBook);
app.get('/api/books/:id', bookHelper.getBookById);
app.get('/api/books/:id/status', bookHelper.status);
app.get('/api/book_requests', requstBooksHelper.getBookRequests);
app.post('/api/book_requests/issue', requstBooksHelper.issueBook);
app.post('/api/book_requests/return', requstBooksHelper.returnBook);
app.get('/api/book_requests/fine-details', requstBooksHelper.returnStatus);

// common
app.get('/api/users', userHelper.getUsers);
app.get('/api/users/:id/history', userHelper.getBookRequestsByUserId);
app.get('/api/users/:id', userHelper.getUserById);

// students
app.get('/api/students', studentHelper.getStudents);
app.get('/api/students/:id', studentHelper.getStudentById);
app.get('/api/students/:id/history', studentHelper.getBookRequestsByStudentId);
app.post('/api/students/add', studentHelper.addStudent);
app.patch('/api/students/update', studentHelper.updateStudent);

// faculty
app.get('/api/faculty', facultyHelper.getFaculty);
app.get('/api/faculty/:id', facultyHelper.getFacultyById);
app.get('/api/faculty/:id/history', facultyHelper.getBookRequestsByFacultyId);
app.post('/api/faculty/add', facultyHelper.addFaculty);
app.patch('/api/faculty/update', facultyHelper.updateFaculty);

app.listen(3000, () => console.log('Server listening on port ' + 3000));
