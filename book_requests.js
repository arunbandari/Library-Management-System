/* eslint-disable strict */
const mapper = {
    student: {
        tableName: 'students',
        primaryKey: 'student_id',
    },
    faculty: {
        tableName: 'faculty',
        primaryKey: 'faculty_id',
    }
};

const issueBook = async (req, res) => {
    console.log(req.body);
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const role = req.body.role;
    if (!mapper[role]) return;
    // const tableName = mapper[role].tableName;
    const primaryKey = mapper[role].primaryKey;
    const query = `SELECT COUNT(*) AS COUNT FROM ${role}_book_requests WHERE ${primaryKey}=${userId} and is_returned=false`;
    const results = await req.app.mysql.query(query);
    const count = results[0][0].COUNT;
    console.log(count);
    const response = {
        message: '',
        count,
    };
    function addDays(days) {
        const date = new Date()
        date.setDate(date.getDate() + days)
        return date.toISOString().split('T')[0];
    }
    const maxRequests = role === 'student' ? 3 : 5;
    if (count >= maxRequests)  response.message = `You can not issue more than ${maxRequests} books to a ${role}`;
    else {
        const daysAllowed = role === 'student' ? 15 : 30;
        const dueDate = addDays(daysAllowed);
        const q = `INSERT INTO ${role}_book_requests (${primaryKey}, book_id, is_returned, issue_date, due_date) VALUES (${userId}, ${bookId}, false, "${new Date().toISOString().split('T')[0]}", "${dueDate}")`;
        await req.app.mysql.query(q);
        response.message = 'Issued successfully!';
        response.success = true;
    }
    res.send(response);
};

const returnStatus = async (req, res) => {
    console.log('test');
    const requestId = req.query.id;
    const role = req.query.role;
    if (!mapper[role]) res.send({success:false});
    // const tableName = mapper[role].tableName;
    const primaryKey = mapper[role].primaryKey;
    const q = `SELECT * FROM ${role}_book_requests WHERE book_request_id=${requestId}`;
    const results = await req.app.mysql.query(q);
    const response = results[0][0];
    const days = Math.floor((new Date() - new Date(response.issue_date)) / (1000*60*60*24));
    const gracePeriod = role === 'student' ? 15 : 30;
    const out = {
        fined: false,
    };
    if (days > gracePeriod) {
        out.fined = true;
        const rem = days - gracePeriod;
        out.fine = rem * 1;
        out.rem = rem;
    }
    res.send(out);
};

const returnBook = async (req, res) => {
    const requestId = req.body.id;
    const fine = req.body.fine;
    const role = req.body.role;
    if (!mapper[role]) return;
    // const tableName = mapper[role].tableName;
    const primaryKey = mapper[role].primaryKey;
    const q = `UPDATE ${role}_book_requests SET is_returned=true, fine=${fine}, return_date="${new Date().toISOString().split('T')[0]}" WHERE book_request_id=${requestId}`;
    await req.app.mysql.query(q);
    response = { message: 'Return accepted!'};
    res.send(response);
};

const getBookRequests = async (req, res) => {
    const results = await req.app.mysql.query('SELECT * from book_requests order by is_returned desc');
    res.send(results[0]);
};

module.exports = {
    issueBook,
    returnBook,
    getBookRequests,
    returnStatus,
}