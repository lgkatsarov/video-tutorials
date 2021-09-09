const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    hashedPassword: {
        type: String,
        requred: [true, 'Password is required']
    },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        default: []
    }]
});

module.exports = model('User', schema);