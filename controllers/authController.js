const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const { validateUserInput } = require('../util/validateInput');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post('/register', isGuest(), async (req, res) => {
    try {
        const errors = validateUserInput(req.body.username, req.body.password, req.body.rePass);
        if (errors.length != 0){
            throw new Error(errors.join('\n'));
        }
        await req.auth.register(req.body.username, req.body.password);

        res.redirect('/'); //TODO change redirect location 
    } catch (err) {
        const ctx = {
            errors: err.message.split('\n'),
            userData: {
                username: req.body.username
            }
        };
        res.render('user/register', ctx)
    }
}
)

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const errors = validateUserInput(req.body.username, req.body.password);
        if (errors.length != 0){
            throw new Error(errors.join('\n'));
        }
        await req.auth.login(req.body.username, req.body.password);

        res.redirect('/')//TODO change redirect location 
    } catch (err) {
        const ctx = {
            errors: err.message.split('\n'),
            userData: {
                username: req.body.username
            }
        };
        res.render('user/login', ctx)
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;