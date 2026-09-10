const students = [
    { id: 1, name: "Alice", course: "BSCS" },
    { id: 2, name: "Bob", course: "BSIT" },
    { id: 3, name: "Cara", course: "BSCS" },
];

let nextId = students.length + 1;

const create = (name, course) => {
    const newStudent = { id: nextId++, name, course };
    students.push(newStudent);
    return newStudent;
};

const findAll = () => students;

const findById = (id) => students.find(s => s.id === id);

const update = (student, { name, course }) => {
    if (name) student.name = name;
    if (course) student.course = course;
    return student;
};

const remove = (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    const [deleted] = students.splice(index, 1);
    return deleted;
};

module.exports = { create, findAll, findById, update, remove };