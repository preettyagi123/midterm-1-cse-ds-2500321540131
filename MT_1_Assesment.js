const express = require('express');
const app = express();

app.use(express.json());

// Course data
let courses = [
    {
        id: 101,
        coursename: "Full Stack Development",
        coursecode: "FSD201",
        department: "CSE DS"
    }
];

// GET - Display all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// GET - Display course by ID
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == req.params.id);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    res.json(course);
});

// POST - Add new course
app.post('/courses', (req, res) => {
    const newCourse = {
        id: req.body.id,
        coursename: req.body.coursename,
        coursecode: req.body.coursecode,
        department: req.body.department
    };

    courses.push(newCourse);

    res.status(201).json({
        message: "Course added successfully",
        course: newCourse
    });
});

// PUT - Update course
app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == req.params.id);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    course.coursename = req.body.coursename;
    course.coursecode = req.body.coursecode;
    course.department = req.body.department;

    res.json({
        message: "Course updated successfully",
        course: course
    });
});

// DELETE - Delete course
app.delete('/courses/:id', (req, res) => {
    const index = courses.findIndex(c => c.id == req.params.id);

    if (index === -1) {
        return res.status(404).send("Course not found");
    }

    courses.splice(index, 1);

    res.send("Course deleted successfully");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});