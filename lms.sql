-- MySQL dump 10.13  Distrib 8.0.31, for macos12.6 (arm64)
--
-- Host: localhost    Database: Library
-- ------------------------------------------------------
-- Server version	8.0.31


DROP DATABASE IF EXISTS Library;
SELECT 'DROPPED EXISTING LIBRARY DATABASE';
CREATE DATABASE IF NOT EXISTS Library;
SELECT 'CREATED NEW LIBRARY DATABASE';
USE Library;

--
-- Table structure for table `books`
--
CREATE TABLE books (
    book_id int AUTO_INCREMENT,
    book_name varchar(255),
    book_author varchar(255),
    PRIMARY KEY (book_id)
);

--
-- Dumping data for table `books`
--
INSERT INTO books VALUES (1, 'Introduction to Computer Science Using Python', 'Charles Dierbach');
INSERT INTO books VALUES (2, 'Code: The Hidden Language of Computer Hardware and Software', 'Charles Petzold');
INSERT INTO books VALUES (3, 'JavaScript: The Good Parts', 'Douglas Crockford');
INSERT INTO books VALUES (4, 'The Elements of Computing Systems: Building a Modern Computer from First Principles', 'Noam Nisan');
INSERT INTO books VALUES (5, 'The Pragmatic Programmer', 'Andrew Hunt');
INSERT INTO books VALUES (6, 'Structure and Interpretation of Computer Programs', 'Harold Abelson');
INSERT INTO books VALUES (7, 'Modern Operating Systems', 'Andrew S. Tanenbaum');
INSERT INTO books VALUES (8, 'Introduction to Algorithms', 'Thomas H. Cormen');
INSERT INTO books VALUES (9, 'The New Turing Omnibus: Sixty-Six Excursions in Computer Science', 'A. K. Dewdney');
INSERT INTO books VALUES (10, 'C Programming Language', 'Brian W. Kernighan');

SELECT 'CREATED BOOKS TABLE';

--
-- Table structure for table `departments`
--
CREATE TABLE departments (
    department_id int AUTO_INCREMENT,
    department_name varchar(255),
    PRIMARY KEY (department_id)
);

SELECT 'CREATED DEPARTMENTS TABLE';

--
-- Dumping data for table `departments`
--
INSERT INTO departments VALUES (1, 'Computer Science And Engineering');
INSERT INTO departments VALUES (2, 'Information Technolgy');
INSERT INTO departments VALUES (3, 'Mechanical Engineering');


--
-- Table structure for table `students`
--
CREATE TABLE students (
    student_id int AUTO_INCREMENT,
    student_name varchar(255),
    student_dob date,
    student_department_id int,
    PRIMARY KEY (student_id),
    FOREIGN KEY (student_department_id) REFERENCES departments(department_id)
);

SELECT 'CREATED STUDENTS TABLE';

--
-- Dumping data for table `students`
--
INSERT INTO students VALUES (1, 'Arun', '1997-04-18', 1);
INSERT INTO students VALUES (2, 'Rahul', '1998-02-22', 1);
INSERT INTO students VALUES (3, 'Neelesh', '1999-02-22', 1);
INSERT INTO students VALUES (4, 'Sheshi', '2000-05-02', 1);


--
-- Table structure for table `faculty`
--
CREATE TABLE faculty (
    faculty_id int AUTO_INCREMENT,
    faculty_name varchar(255),
    faculty_department_id int,
    PRIMARY KEY (faculty_id),
    FOREIGN KEY (faculty_department_id) REFERENCES departments(department_id)
);

SELECT 'CREATED Faculty TABLE';

--
-- Dumping data for table `faculty`
--
INSERT INTO faculty VALUES (1, 'Yu Man Lui', 1);
INSERT INTO faculty VALUES (2, 'Chai', 1);


--
-- Table structure for table `student_book_requests`
--
CREATE TABLE student_book_requests (
    book_request_id int AUTO_INCREMENT,
    student_id int,
    book_id int,
    issue_date datetime,
    due_date datetime,
    return_date datetime,
    is_returned boolean,
    fine int,
    PRIMARY KEY (book_request_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

SELECT 'CREATED STUDENT_BOOK_REQUESTS TABLE';
--
-- Dumping data for table `student_book_requests`
--

INSERT INTO student_book_requests (book_request_id, student_id, book_id, issue_date, due_date, return_date, is_returned, fine) VALUES (1, 1, 1, '2022-11-25', '2022-12-10', '2022-11-26', true, 0);
INSERT INTO student_book_requests (book_request_id, student_id, book_id, issue_date, due_date, return_date, is_returned, fine) VALUES (2, 1, 1, '2022-10-10', '2022-10-25', '2022-10-20', false, 0);

--
-- Table structure for table `faculty_book_requests`
--
CREATE TABLE faculty_book_requests (
    book_request_id int AUTO_INCREMENT,
    faculty_id int,
    book_id int,
    issue_date datetime,
    due_date datetime,
    return_date datetime,
    is_returned boolean,
    fine int,
    PRIMARY KEY (book_request_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

SELECT 'CREATED FACULTY_BOOK_REQUESTS TABLE';
--
-- Dumping data for table `faculty_book_requests`
--
INSERT INTO faculty_book_requests (book_request_id, faculty_id, book_id, issue_date, due_date, return_date, is_returned, fine) VALUES (1, 1, 1, '2022-09-25', '2022-10-25', '2022-09-30', true, 0);
INSERT INTO faculty_book_requests (book_request_id, faculty_id, book_id, issue_date, due_date, return_date, is_returned, fine) VALUES (2, 1, 1, '2022-10-12', '2022-11-12', '2022-10-22', false, 0);

--
-- Table structure for table `meta_data`
--
CREATE TABLE meta_data (
    meta_data_id int AUTO_INCREMENT,
    key_ varchar(255),
    value_ int,
    PRIMARY KEY (meta_data_id)
);

SELECT 'CREATED META_DATA TABLE';
--
-- Dumping data for table `meta_data`
--
INSERT INTO meta_data (meta_data_id, key_, value_) VALUES (1, 'student_days_allowed', 15);
INSERT INTO meta_data (meta_data_id, key_, value_) VALUES (2, 'faculty_days_allowed', 30);
INSERT INTO meta_data (meta_data_id, key_, value_) VALUES (3, 'student_fine_per_day', 1);
INSERT INTO meta_data (meta_data_id, key_, value_) VALUES (4, 'faculty_fine_per_day', 1);

--
-- Table structure for table `admins`
--

CREATE TABLE admins (
    admin_id int AUTO_INCREMENT,
    username varchar(255),
    password varchar(255),
    PRIMARY KEY (admin_id)
);

SELECT 'CREATED ADMIN TABLE';
--
-- Dumping data for table `admins`
--
INSERT INTO admins (admin_id, username, password) VALUES (1, 'admin', 'admin');