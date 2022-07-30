// dependices
const router = require('express').Router();
const apiController = require('./apiController');
const {Blog, Comment, Todo, User} = require('./../models');


// Router to get the landing page using try catch to handle errors
router.get('/', (req, res) => {
    res.render('landing_page',{
      isLoggedIn: req.session.isLoggedIn, // if the user is logged in, then we will set isLoggedIn to true
    }
    ); // page render the landing page file 
});

// Router to get users from the database and render the users page with the users in json format
// render users logged in
router.get('/users', async (req, res) => {
    console.log(req.session, 'I AM THE SESSION');
    try {
        const dbUsersData = await User.findAll();
        const users = dbUsersData.map(dbUser => dbUser.get({plain: true}));
        res.render('users', {
            users,
            loggedInUser: req.session.user || null,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//router to ger users id and render the user profile page
router.get('/users/:userId', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.userId);
        const user = userData.get({ plain: true });
        res.render('user_profile', {user});
    } catch (error) {
        res.status(500).json(error);
    }
});


// router to get todos from the database and render the todos page with the todos in json format
// if not logged in redirect to home page
// find all todos for the user using req.session




//router   

//router use api to controler to control the api routes

// export the router