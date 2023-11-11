const { CourseResponse } = require("../helpers/helpers");
const CourseModel = require("../models/courseModel");

const courses = [
    {
        id: 1,
        Name: "Web Development",
        ShortName: "Web Dev",
        courseFee: 1000
    },
    {
        id: 2,
        Name: "Graphic Designing",
        ShortName: "Graphic Design",
        courseFee: 800
    },
    {
        id: 3,
        Name: "Mobile App Development",
        ShortName: "App Dev",
        courseFee: 1200
    },
    {
        id: 4,
        Name: "Data Science",
        ShortName: "Data Sci",
        courseFee: 1500
    },
    {
        id: 5,
        Name: "Network Security",
        ShortName: "Sec. Net",
        courseFee: 1100
    },
    {
        id: 6,
        Name: "Python Programming",
        ShortName: "Python",
        courseFee: 900
    },
    {
        id: 7,
        Name: "Java Development",
        ShortName: "Java Dev",
        courseFee: 1100
    },
    {
        id: 8,
        Name: "Digital Marketing",
        ShortName: "Digi. Mktg",
        courseFee: 850
    },
    {
        id: 9,
        Name: "Machine Learning",
        ShortName: "ML",
        courseFee: 1400
    },
    {
        id: 10,
        Name: "Database Management",
        ShortName: "DB Management",
        courseFee: 950
    },
    {
        id: 11,
        Name: "Front-end Development",
        ShortName: "Front-end Dev",
        courseFee: 1000
    },
    {
        id: 12,
        Name: "Back-end Development",
        ShortName: "Back-end Dev",
        courseFee: 1050
    },
    {
        id: 13,
        Name: "UI/UX Design",
        ShortName: "UI/UX",
        courseFee: 900
    },
    {
        id: 14,
        Name: "Artificial Intelligence",
        ShortName: "AI",
        courseFee: 1300
    },
    {
        id: 15,
        Name: "Software Testing",
        ShortName: "Testing",
        courseFee: 950
    },
    {
        id: 16,
        Name: "Cybersecurity",
        ShortName: "Cybersec",
        courseFee: 1200
    },
    {
        id: 17,
        Name: "Cloud Computing",
        ShortName: "Cloud",
        courseFee: 1100
    },
    {
        id: 18,
        Name: "Game Development",
        ShortName: "Game Dev",
        courseFee: 1050
    },
    {
        id: 19,
        Name: "Data Analytics",
        ShortName: "Data Analytics",
        courseFee: 1100
    },
    {
        id: 20,
        Name: "DevOps",
        ShortName: "DevOps",
        courseFee: 1150
    },
    {
        id: 21,
        Name: "Digital Illustration",
        ShortName: "Illus. Design",
        courseFee: 800
    },
    {
        id: 22,
        Name: "Blockchain Development",
        ShortName: "Blockchain",
        courseFee: 1250
    },
    // Add more courses here...
];
const CourseController = {

    get: async (req, res) => {
        try {
            let {pageNo , pageSize} = req.query
            let skipPage = (pageNo - 1) * pageSize
            const getcoursesArr = await CourseModel.find().limit(pageSize).skip(skipPage)
            res.send(CourseResponse(true, "", getcoursesArr))
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, "Data Not Found", error))
        }
    },
    getbyId: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await CourseModel.findById(id);
            res.status(200).send(CourseResponse(true, "ok", result));
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }

    },
    add: async (req, res) => {
        try {
            const { Name, ShortName, courseFee } = req.body
            const obj = { Name, ShortName, courseFee }
            const errArr = []
            if (!obj.Name) {
                errArr.push('Required Name')
            }
            if (!obj.ShortName) {
                errArr.push('Required ShortName')
            }
            if (!obj.courseFee) {
                errArr.push('Required courseFee')
            }
            if (errArr.length > 0) {
                res.status(401).send(CourseResponse(false, 'Validation Error!', errArr))
            }
            else {
                // obj.id = courses.length + 1
                // courses.push(obj)
                const course = new CourseModel(obj)
                const result = await course.save()
                res.status(200).send(CourseResponse(true, "Data Added Successfully", result))
            }
        }
        catch (e) {
            res.send(CourseResponse(false, "Data Not Added! :(", e))
        }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id
            const { Name, ShortName, courseFee } = req.body
            const obj = { Name, ShortName, courseFee }
            const errArr = []
            if (!obj.Name) {
                errArr.push('Required Name')
            }
            if (!obj.ShortName) {
                errArr.push('Required ShortName')
            }
            if (!obj.courseFee) {
                errArr.push('Required courseFee')
            }
            if (errArr.length > 0) {
                res.status(401).send(CourseResponse(false, 'Validation Error!', errArr))
            }
            else {
                const result = await CourseModel.findByIdAndUpdate(id, obj)
                res.status(200).send(CourseResponse(true, "Updated Successfully", obj))
            }
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    },
    del: async (req, res) => {
        const id = req.params.id
        try {
            const result = await CourseModel.findByIdAndDelete(id)
            res.status(200).send(CourseResponse(true, "Deleted Successfully", result))
        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    }
}

module.exports = CourseController
