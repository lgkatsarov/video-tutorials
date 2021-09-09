const Course = require('../models/Course');
const User = require('../models/User');

async function getAllCourses(isGuest) {
    let sort = { createdAt: -1 };
    if (isGuest) {
        sort = { usersEnrolled: 'desc' };
    }
    return Course.find({ isPublic: true }).sort(sort).lean();
}

async function createCourse(courseData) {
    const pattern = new RegExp(`^${courseData.name}$`, 'i');
    const existing = await Course.findOne({ title: { $regex: pattern } });

    if (existing) {
        throw new Error('A play with this name already exsists');
    }

    const course = new Course(courseData);
    await course.save();

    return course;
}

async function getCourseById(id) {

    return Course.findById(id).lean();

}

async function editCourse(id, courseData) {
    const course = await Course.findById(id);

    course.name = courseData.name;
    course.description = courseData.description;
    course.imageUrl = courseData.imageUrl;
    course.isPublic = Boolean(courseData.isPublic);

    return course.save();
}

async function enrollCourse(courseId, userId) {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    course.usersEnrolled.push(userId);
    user.enrolledCourses.push(courseId);

    course.save();
    user.save();
}

async function deleteCourse(id) {
    return Course.findByIdAndDelete(id);
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    editCourse,
    enrollCourse,
    deleteCourse
}