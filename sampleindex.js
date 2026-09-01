const express = require("express");

const students = [
    { id: 1, name: "Alice", course: "BSCS" },
    { id: 2, name: "Bob", course: "BSIT" },
    { id: 3, name: "Cara", course: "BSCS" },
];

let nextId = students.length + 1;

const app = express();
app.use(express.json());

// Create
app.post('/students', (req, res) => {
    const newName = req.body.name;
    const newCourse = req.body.course;

    if (!newName || !newCourse) {
        return res.status(400).send({ error: "name and course are required" });
    }

    const newStudent = { id: nextId++, name: newName, course: newCourse };

    students.push(newStudent);
    res.send(newStudent);
});

// Read
app.get('/students', (req, res) => {
    res.send(students);
});
// Read one
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));
    if (!student) return res.status(404).send({ error: "Student not found" });
    res.send(student);
})

// Update
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));
    if (!student) return res.status(404).send({ error: "Student not found" });

    const { name, course } = req.body;
    if (name) student.name = name;
    if (course) student.course = course;

    res.send(student);
});

// Delete
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));
    if (index === -1) return res.status(404).send({ error: "Student not found" });

    const [deleted] = students.splice(index, 1);
    res.send(deleted);
});

app.listen(3000, () => {
    console.log("App is listening to port 3000");
});