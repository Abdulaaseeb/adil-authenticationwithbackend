const mongoose = require('mongoose');
const AuthScheema = mongoose.Schema({
    email: {
        type: String,
        require: (true , "email must be required")
    },
    password: {
        type: String,
        require: (true  , "Password must be required")
    },
    contactNo: {
        type: Number,
        require: (true , "Contact must be required")
    }

})

const AuthModel = mongoose.model('/users', AuthScheema)

module.exports = AuthModel