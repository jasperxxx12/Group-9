const studentModel = require("../models/studentModel");

const createStudent = (name, course) => studentModel.create(name, course);

const getAllStudents = () => studentModel.findAll();

const getStudentById = (id) => studentModel.findById(id);

const updateStudent = (student, data) => studentModel.update(student, data);

const deleteStudent = (id) => studentModel.remove(id);

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};