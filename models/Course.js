const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        maxLength: 50
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required']
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    usersEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Course', schema);
