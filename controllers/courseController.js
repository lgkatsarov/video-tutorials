const router = require('express').Router();
const { validateCourseInput } = require('../util/validateInput');

router.get('/create', (req, res) => {
    try {
        const ctx = {
            userData: {
                username: req.user.username
            }
        }
        res.render('course/create', ctx);
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.post('/create', async (req, res) => {
    try {

        const courseData = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic: Boolean(req.body.isPublic),
            author: req.user._id
        }

        const errors = validateCourseInput(courseData.name, courseData.description, courseData.imageUrl);

        if (errors.length != 0) {
            throw new Error(errors.join('\n'));
        }

        await req.storage.createCourse(courseData);

        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: err.message.split('\n'),
            userData: {
                username: req.user.username
            },
            courseData: {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: Boolean(req.body.isPublic),
            }
        }
        res.render('course/create', ctx)
    }
});

router.get('/details/:id', async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);
        const isCreator = req.user._id == course.author;
        const isEnrolled = req.user && course.usersEnrolled.find(u => u._id == req.user._id);

        const ctx = {
            userData: {
                username: req.user.username
            },
            course,
            isCreator,
            isEnrolled
        }
        res.render('course/details', ctx);
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);
        if (course.author != req.user._id) {
            throw new Error('You cannot edit plays you have not created!');
        }

        const ctx = {
            userData: {
                username: req.user.username
            },
            course
        }
        res.render('course/edit', ctx);
    } catch (err) {
        console.log(err.message);
        res.redirect('/details/' + req.params.id);
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author != req.user._id) {
            throw new Error('You cannot edit courses you have not created!');
        }

        await req.storage.editCourse(req.params.id, req.body);
        res.redirect('/');

    } catch (err) {

        const ctx = {
            errors: err.message,
            userData: {
                username: req.user.username
            },
            course: {
                _id: req.params.id,
                name: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: Boolean(req.body.isPublic)
            }
        };

        res.render('course/edit', ctx);
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author != req.user._id) {
            throw new Error('You cannot delete plays you have not created!');
        }

        await req.storage.deleteCourse(req.params.id);
        res.redirect('/');

    } catch (err) {
        console.log(err.message);
        res.redirect('/details/' + req.params.id);
    }
});

router.get('/enroll/:id', async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author == req.user._id) {
            throw new Error('You cannot like your own play!');
        }

        await req.storage.enrollCourse(req.params.id, req.user._id);
        res.redirect('/course/details/' + req.params.id);

    } catch (err) {
        console.log(err.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

module.exports = router;
