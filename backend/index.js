const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = express.Router();
const authRoutes = express.Router();
const PORT = 4000;

const users= require("./auth/obj.auth.js")

let Student = require('./models/student.model.js');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

studentRoutes.route('/').get(function(req, res) {
    Student.find(function(err, students) {
        if (err) {
            console.log(err);
        } else {
            res.json(students);
        }
    });
});

studentRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Student.findById(id, function(err, student) {
        console.log(student)
        res.json(student);
    });
});

studentRoutes.route('/update/:id').post(function(req, res) {
    Student.findById(req.params.id, function(err, student) {
        if (!student)
            res.status(404).send("Data is not found");
        else
            student.student_name = req.body.student_name;
            student.student_grade = req.body.student_grade;
            student.student_section = req.body.student_section;
            student.student_mainneed = req.body.student_mainneed;
            student.student_wave = req.body.student_wave;
            student.teachers = JSON.stringify(req.body.student_teachers)
            student.save().then(student => {
                res.json('Student updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

studentRoutes.route('/delete/:id').post(function(req, res) {
    try {
        Student.findOneAndDelete({_id: req.params.id})
        .then(student => console.log(student))
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
  }
});

studentRoutes.route('/add').post(function(req, res) {
    let student = new Student({...req.body, english_comments: [{}, {}, {}], math_comments: [{}, {}, {}], science_comments: [{}, {}, {}], sst_comments: [{}, {}, {}]});
    console.log(req.body)
    student.save()
        .then(student => {
            res.status(200).json({'student': 'student added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new student failed');
        });
});

// studentRoutes.route('/commentupdate').post((req, res) => {

// });

authRoutes.route('/login').post((req, res) => {
    const user = users.find(a => a.username === req.body.username);
    console.log(req.body)
    if (!user) {
        res.status(200).send("User Not Found")
    }
    if (req.body.password === user.password) {
        res.status(200).send("Authenticated");
    } else {
        res.status(200).send("Password Wrong")
    }
})

app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});