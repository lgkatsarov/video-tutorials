function validateUserInput(username, password, rePass) {
    const errors = [];
    if (username.length < 5) {
        errors.push('Username must be at least 5 characters long');
    }
    if (!username.match(/^[0-9a-zA-Z]+$/)) {
        errors.push('Username must contain only english letters and digits');
    }
    if (password.length < 5) {
        errors.push('Password must be at least 5 characters long');
    }
    if (!password.match(/^[0-9a-z]+$/)) {
        errors.push('Password must contain only english letters and digits');
    }
    if (rePass && rePass != password) {
        errors.push('Passwords don\'t match');
    }

    return errors;
}

function validateCourseInput(name, description, imageUrl) {
    const errors = [];
    if (name.length < 4){
        errors.push('Course title must be at least 4 characters long');
    }
    if (description.length < 20){
        errors.push('Course description must be at least 20 characters long');
    }
    if (!imageUrl.match(/^https?:/)) {
        errors.push('You must enter a valid url');
    }

    return errors;
}

module.exports = {
    validateUserInput,
    validateCourseInput
}