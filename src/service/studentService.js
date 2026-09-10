const students = [
    { id: 1, name: "Alice", course: "BSCS" },
    { id: 2, name: "Bob", course: "BSIT" },
    { id: 3, name: "Cara", course: "BSCS" },
];

let nextId = students.length + 1;

const createStudent = (name, course) => {
    const newStudent = { id: nextId++, name, course };
    students.push(newStudent);
    return newStudent;
};

const getAllStudents = () => students;

const getStudentById = (id) => students.find(s => s.id === id);

const updateStudent = (student, { name, course }) => {
    if (name) student.name = name;
    if (course) student.course = course;
    return student;
};

const deleteStudent = (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    const [deleted] = students.splice(index, 1);
    return deleted;
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};