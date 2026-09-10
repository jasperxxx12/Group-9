const studentService = require("../service/studentService");

const createStudent = (req, res) => {
    const newName = req.body.name;
    const newCourse = req.body.course;

    if (!newName || !newCourse) {
        return res.status(400).send({ error: "name and course are required" });
    }

    const newStudent = studentService.createStudent(newName, newCourse);
    res.send(newStudent);
};

const getAllStudents = (req, res) => {
    res.send(studentService.getAllStudents());
};

const getStudentById = (req, res) => {
    const student = studentService.getStudentById(Number(req.params.id));
    if (!student) return res.status(404).send({ error: "Student not found" });
    res.send(student);
};

const updateStudent = (req, res) => {
    const student = studentService.getStudentById(Number(req.params.id));
    if (!student) return res.status(404).send({ error: "Student not found" });

    const updated = studentService.updateStudent(student, req.body);
    res.send(updated);
};

const deleteStudent = (req, res) => {
    const deleted = studentService.deleteStudent(Number(req.params.id));
    if (!deleted) return res.status(404).send({ error: "Student not found" });
    res.send(deleted);
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};