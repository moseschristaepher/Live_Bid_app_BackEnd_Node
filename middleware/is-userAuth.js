const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const authHeader = req.get('Authorization')
    const authHeader = req.body.Authorization;
    // console.log(authHeader)
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
    }

    const token = authHeader.Authorization.split(' ')[1]

    if (token == null) {
        const error = new Error('Not valid token.');
        error.statusCode = 401;
    }
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret')
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }


    req.currentUserId = decodedToken.userId;
    req.currentUserNameOrEmail = decodedToken.userNameOrEmail;
    next();
}