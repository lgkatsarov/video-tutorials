const router = require('express').Router();

router.get('/', async (req, res) => {
    
    const courses = await req.storage.getAllCourses(Boolean(req.user));

    const ctx = {
        userData: req.user,
        courses
    }

    if (ctx.userData) {
        res.render('home/user', ctx);
    } else {
        res.render('home/guest', ctx);
    }
});

module.exports = router;