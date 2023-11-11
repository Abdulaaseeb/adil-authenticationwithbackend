const { CourseResponse } = require("../helpers/helpers")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AuthModel = require("../models/authModel")

const AuthController = {
    signUp: async (req, res) => {
        try {
            const { email, password, contactNo } = req.body
            const obj = { email, password, contactNo }
            const errArr = []
            if (!obj.email) {
                errArr.push("Username is required")
            }
            if (!obj.password) {
                errArr.push("Password is required")
            }
            if (errArr.length > 0) {
                res.send(CourseResponse(false, "Validation Error", errArr))
            }

            const checkUser = await AuthModel.findOne({ email: obj.email })
            if (checkUser) {
                res.send(CourseResponse(false, "User Already Exist", null))
                return;
            }
            obj.password = await bcrypt.hash(obj.password, 10)
            const user = new AuthModel(obj)
            const result = await user.save()
            if (result) {
                res.send(CourseResponse(true, "Data Added Successfully", result))
            }

        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    },
    login: async (req, res) => {
        try {
            console.log(req.body)
            const { email = "", password = "" } = req.body
            if (email && password) {
                const obj = { email, password }
                const userExist = await AuthModel.findOne({ email: obj.email })
                if (userExist) {
                    let correctPassword = await bcrypt.compare(obj.password, userExist.password)
                    if (correctPassword) {
                        const token = jwt.sign({ ...userExist }, process.env.SECRET_KEY)
                        const data = {
                            email: userExist.email,
                            token
                        }
                        res.status(200).send(CourseResponse(true, "Data Added Successfully", { user: data }))
                    }
                    else {
                    res.status(400).send(CourseResponse(false, "Data Not Found", null))
                    }
                }

                else {
                    res.status(404).send(CourseResponse(false, "User Not Found", null))
                }
            }
            else {
                res.status(404).send(CourseResponse(false, "Credentials not found", null))
            }
        }
        catch (error) {
            res.status(400).send(CourseResponse(false, error, null))
        }
    },

    protected: () => { },
}

module.exports = AuthController