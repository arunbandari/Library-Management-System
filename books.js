/* eslint-disable strict */
const getBooks = async (req, res) => {
    const results = await req.app.mysql.query('SELECT * from books order by book_id desc');
    res.send(results[0]);
};

const status = async (req, res) => {
    let count = 0;
    const bookId = req.params.id;
    let query = `SELECT COUNT(*) AS count FROM student_book_requests where book_id=${bookId} and is_returned=false`;
    let results = await req.app.mysql.query(query);
    count += results[0][0].count;
    query = `SELECT COUNT(*) AS count FROM faculty_book_requests where book_id=${bookId} and is_returned=false`;
    results = await req.app.mysql.query(query);
    count += results[0][0].count;
    const available = count ? false : true; 
    res.send({available});
}

const getBookById = async (req, res) => {
    const bookId = req.params.id;
    const query = `SELECT * FROM books WHERE book_id=${bookId}`;
    const results = await req.app.mysql.query(query);
    res.send(results&&results[0]&&results[0][0]);
};

const addBook = async (req, res) => {
    const bookName = req.body.book_name;
    const authorName = req.body.book_author;
    const query = `INSERT INTO books (book_name, book_author) VALUES ("${bookName}", "${authorName}")`;
    const results = await req.app.mysql.query(query);
    res.send(results[0]);
}

const updateBook = async (req, res) => {
    const bookId = req.body.book_id;
    const bookName = req.body.book_name;
    const authorName = req.body.book_author;
    const query = 'UPDATE books SET book_name=?, book_author=? where book_id=?';
    const results = await req.app.mysql.query(query, [bookName, authorName, bookId]);
    res.send(results[0]);
}

module.exports = {
    status,
    getBooks,
    getBookById,
    addBook,
    updateBook,
}