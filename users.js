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

const getUsers = async (req, res) => {
    const role = req.query.role;
    if (!mapper[role]) return;
    const tableName = mapper[role].tableName;
    const results = await req.app.mysql.query(`SELECT * from ${tableName}`);
    res.send(results[0]);
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const role = req.query.role;
    if (!mapper[role]) return;
    const tableName = mapper[role].tableName;
    const primaryKey = mapper[role].primaryKey;
    const query = `SELECT * FROM ${tableName} t LEFT JOIN departments d ON t.${role}_department_id=d.department_id where t.${primaryKey}=${userId}`;
    const results = await req.app.mysql.query(query);
    res.send(results&&results[0]&&results[0][0]);
};

const addUser = async (req, res) => {
    const bookName = 'CCC';
    const authorName = 'A';
    const totalCopies = 5;
    const query = `INSERT INTO books (book_name, book_author, total_copies, available_copies) VALUES ("${bookName}", "${authorName}", "${totalCopies}", "${totalCopies}")`;
    const results = await req.app.mysql.query(query);
    res.send(results[0]);
}

const getBookRequestsByUserId = async (req, res) => {
    const userId = req.params.id;
    const role = req.query.role;
    if (!mapper[role]) return;
    const primaryKey = mapper[role].primaryKey;
    const results = await req.app.mysql.query(`select * from ${role}_book_requests br, books b where br.book_id=b.book_id and br.${primaryKey}=${userId} order by is_returned;`);
    const history = results&&results[0]&&results[0].map(r => {
        if (r.is_returned) r.status = true;
        else r.status = false;
        return r;
    });
    res.send(history);
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    getBookRequestsByUserId
}