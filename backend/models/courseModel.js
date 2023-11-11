const mongoose = require('mongoose')
const CourseScheema = mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    ShortName: {
        type: String,
        require: true
    },
    courseFee: {
        type: String,
        require: true
    }
},
{
    timestamps:true
})

const CourseModel = mongoose.model('/courses' , CourseScheema)

module.exports = CourseModel