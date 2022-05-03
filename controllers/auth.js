const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');



///////// CREATE A NEW USER CONTROLLER /////////
exports.createNewUser = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const error = new Error('validation failed. ');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;

    }
    const userFirstName = req.body.userFirstName;
    const userLastName = req.body.userLastName;
    const dateOfBirth = req.body.dateOfBirth;
    const age = req.body.age;
    const email = req.body.email;
    const gender = req.body.gender;

    const userNameOrEmail = req.body.userNameOrEmail;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    console.log(email)
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {

            console.log(hashedPw);

            const user = new User({
                userNameOrEmail: userNameOrEmail,
                password: hashedPw,

                userFirstName: userFirstName,

                userLastName: userLastName,
                dateOfBirth: dateOfBirth,
                age: age,
                email: email,
                gender: gender

            });
            return user.save();
        })
        .then(result => {

            res.status(201).json({ message: 'User created', userId: result._id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}



////////////////// LOGIN THINGS GOES HERE /////////////////////////
////////// USER LOGIN ////////////////

exports.UserLogin = (req, res, next) => {
    const userNameOrEmail = req.body.userNameOrEmail;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ userNameOrEmail: userNameOrEmail })
        .then(user => {
            console.log(user)
            if(!user) {
                const error = new Error('A user with this email does not exists.');
                error.statusCode = 401;
                throw error;
            }
            
            loadedUser = user;

            console.log(loadedUser)
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {

            if (!isEqual) {
                const error = new Error('wrong password');
                error.statusCode = 401;
                next(error)
                throw error;
            }

            const token = jwt.sign(
                {
                    userNameOrEmail: loadedUser.userNameOrEmail,
                    userId: loadedUser._id.toString(),
                    userName: loadedUser.userFirstName
                },
                'somesupersecretsecret',
                { expiresIn: '1h'}
            );

            res.status(200).json({ token: token, userId: loadedUser._id.toString(), firstName: loadedUser.userFirstName, isUserAuthenticated: true, userDateOfBirth: loadedUser.dateOfBirth })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


///// GET A SINGLE USER FULL DETAILS CONTROLLER ///////////////////
exports.getCurrentUser = (req, res, next) => {
    const currentUserId = req.body.userId;
  
    User.findById(currentUserId)
      .then(currentUser => {
        if (!currentUser) {
          const error = new Error('Could not find the User. ');

          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Current User Fetched', currentUser: currentUser, isCurrentUserAuthenticated: true});
      })
      .catch(err => {
  
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


///// CHECK INITIAL AUTH STATE OF USER ///////////////////
exports.checkUserSignIn = async (req, res, next) => {

    const userId = req.currentUserId;


    try {

        res.status(200).send({ currentUserId: userId, isUserAuthenticated: true })

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }

        res.status(400).send(err)
    }

}


///// UPDATE USER DETAILS CONTROLLER ///////////////////
exports.updateCurrentUserDetails = async (req, res, next) => {

    const currentUserId = req.body.userId;

    const userFirstName = req.body.userFirstName;
    const userNameOrEmail = req.body.userNameOrEmail;

    console.log(req.body)
    console.log(userNameOrEmail)

    const password = req.body.password;


    const updates = Object.keys(req.body);


    try {

        const hashedPassword = await bcrypt.hash(password, 12);

        console.log(hashedPassword)

        console.log(currentUserId);

        const currentUser = await User.findById(currentUserId)

        if (!currentUser) {
            console.log('user Not found')
  
            error.statusCode = 404;
            throw error;
          }

        currentUser["userFirstName"] = userFirstName;
        currentUser["userNameOrEmail"] = userNameOrEmail;
        console.log(currentUser["userNameOrEmail"] = userNameOrEmail)
        currentUser["password"] = hashedPassword;

        console.log(currentUser)

        await currentUser.save()

        res.send(currentUser)

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }

        res.status(400).send(err)
    }

}
