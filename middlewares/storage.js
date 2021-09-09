const courseService = require('../services/course'); 

module.exports = () => (req, res, next) => {
    //TODO import and decorate services
    req.storage = {
        ...courseService
    };
	next();
}