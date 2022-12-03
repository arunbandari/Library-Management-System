const getFaculty = async (req, res) => {
    const results = await req.app.mysql.query('SELECT * from faculty s LEFT JOIN departments d ON s.faculty_department_id=d.department_id');
    res.send(results[0]);
};

const getFacultyById = async (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM faculty INNER JOIN departments WHERE faculty_id=${userId}`;
    const results = await req.app.mysql.query(query);
    res.send(results&&results[0]&&results[0][0]);
};

const addFaculty = async (req, res) => {
    const facultyName = req.body.faculty_name;
    const departmentId = req.body.faculty_department_id;
    const query = `INSERT INTO faculty (faculty_name, faculty_department_id) VALUES ("${facultyName}", ${departmentId})`;
    const results = await req.app.mysql.query(query);
    res.send(results[0]);
}

const getBookRequestsByFacultyId = async (req, res) => {
    const userId = req.params.id;
    const results = await req.app.mysql.query(`select * from book_requests br, books b where br.book_id=b.book_id and br.user_id=${userId} order by is_returned;`);
    const history = results&&results[0]&&results[0].map(r => {
        if (r.is_returned) r.status = true;
        else r.status = false;
        return r;
    });
    res.send(history);
};
const updateFaculty = async (req, res) => {
    const facultyId = req.body.faculty_id;
    const facultyName = req.body.faculty_name;
    const departmentId = req.body.faculty_department_id;
    const query = 'UPDATE faculty SET faculty_name=?, faculty_department_id=? where faculty_id=?';
    const results = await req.app.mysql.query(query, [facultyName, departmentId, facultyId]);
    res.send(results[0]);
}

module.exports = {
    getFaculty,
    getFacultyById,
    addFaculty,
    getBookRequestsByFacultyId,
    updateFaculty
}