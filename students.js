const getStudents = async (req, res) => {
    const results = await req.app.mysql.query('SELECT * from students s LEFT JOIN departments d ON s.student_department_id=d.department_id');
    res.send(results[0]);
};

const getStudentById = async (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM students INNER JOIN departments WHERE student_id=${userId}`;
    const results = await req.app.mysql.query(query);
    res.send(results&&results[0]&&results[0][0]);
};

const addStudent = async (req, res) => {
    const studentName = req.body.student_name;
    const departmentId = req.body.student_department_id;
    const query = `INSERT INTO students (student_name, student_department_id) VALUES ("${studentName}", ${departmentId})`;
    console.log(query);
    const results = await req.app.mysql.query(query);
    res.send(results[0]);
}

const getBookRequestsByStudentId = async (req, res) => {
    const userId = req.params.id;
    const results = await req.app.mysql.query(`select * from book_requests br, books b where br.book_id=b.book_id and br.user_id=${userId} order by is_returned;`);
    const history = results&&results[0]&&results[0].map(r => {
        if (r.is_returned) r.status = true;
        else r.status = false;
        return r;
    });
    res.send(history);
};
const updateStudent = async (req, res) => {
    const studentId = req.body.student_id;
    const studentName = req.body.student_name;
    const departmentId = req.body.student_department_id;
    const query = 'UPDATE students SET student_name=?, student_department_id=? where student_id=?';
    const results = await req.app.mysql.query(query, [studentName, departmentId, studentId]);
    res.send(results[0]);
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    getBookRequestsByStudentId,
    updateStudent
}