const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = new Schema({
    strategiesNE:{
        type: String,
        default: "Not Entered"
    },
    strategiesE:{
        type: String,
        default: "Not Entered"
    },
    comments: {
        type: String,
        default: "Not Entered"
    },
    intervention: {
        type: String,
        default: "Not Entered"
    },
    rating: {
        type: String,
        default: "0"
    }
    }
)

const Student = new Schema({
    student_name: {
        type: String
    },
    student_grade: {
        type: Number
    },
    student_section: {
        type: String
    },
    student_mainneed: {
        type: String
    },
    student_wave: {
        type: String
    },
    student_teachers: {
        type: String
    },
    english_comments: [Comments],
    math_comments: [Comments],
    science_comments: [Comments],
    sst_comments: [Comments]
});


module.exports = mongoose.model('Student', Student);
