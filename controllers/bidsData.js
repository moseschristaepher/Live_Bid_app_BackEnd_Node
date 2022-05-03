
const User = require('../models/user');




exports.getBidsData = (req, res, next) => {

    User.find()
      .then(users => {
        if (!users) {
          const error = new Error('Could not find the users list. ');

          error.statusCode = 404;
          throw error;
        }

        const userId = req.currentUserId;
        const userNameOrEmail = req.currentUserNameOrEmail;
        const userName = req.currentUserName;

        // console.log(userNameOrEmail)
        // console.log(userName)

        res.status(200).json({ message: 'users list Fetched', users: users, userId: userId, userNameOrEmail: userNameOrEmail, userName: userName, isUserAuthenticated: true });
      })
      .catch(err => {
  
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };