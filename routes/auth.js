const express = require('express');
const User = require('../models/user');


const { body } = require('express-validator');

const authController = require('../controllers/auth');

const isUserAuth = require('../middleware/is-userAuth');

const router = express.Router();



//////// CREATING NEW USER /////////////////
router.put('/create-new-user', [
    body('userNameOrEmail')

        .isEmail()
        .trim()
        .withMessage('please enter a userName or e-mail.')
        .custom((value, { req }) => {

            return User.findOne({ userNameOrEmail: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail address exists!')
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
    body('userFirstName')
        .trim()
        .not()
        .isEmpty()
],
authController.createNewUser
);

///////////////////////////////////////////////////////////////

//////////////// LOGIN INTO USER //////////

router.post('/userLogin', authController.UserLogin);

//////////////// GET THE CURRENT USER //////////

router.post('/myAccount', isUserAuth, authController.getCurrentUser);

router.put('/user/updateUser', [
    body('userNameOrEmail')
        .isEmail()
        .trim()
        .withMessage('please enter a userName or e-mail with more than 2 characters.')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('please enter a password with more than 5 characters.'),
    body('userFirstName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('please enter a name with more than 2 characters.')
], 
isUserAuth, authController.updateCurrentUserDetails);

/////// CHECKING THE CURRENTLY SIGNED USER AUTH STATE AND USER ID /////////

router.post('/checkUserSignIn', isUserAuth, authController.checkUserSignIn);

module.exports = router