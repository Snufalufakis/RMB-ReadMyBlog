# Read My Blog (RMB)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels!

Your task this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

### The challenge

Description of the assignment should go here

### User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

### Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

### Screenshot

![](./public/assets/images/1.png)
![](./public/assets/images/2.png)

### Links

- Solution URL: [Github](https://github.com/Snufalufakis/RMB-ReadMyBlog)
- Live Site URL: [Heroku](https://readmyblog.herokuapp.com/)

## My process

### Built with

- JavaScript
- express-handlebars
- express-session
- mysql2
- sequelize

### What I learned

This snippet made me run into so many errors dealing with getting my signin and signup to work, took me awhile to realize theres a hierarchy

```
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // body parser to get req.body in the app
app.use(session(sessionSettings)); // access to req.session
app.use(express.static("public"));
app.use(routes);

```

### Continued development

Still need to get comments to work, more so the button to display when signed in and need to get the dashboard to work some simple home/blog/user links.

### Useful resources

- [Stackoverflow](https://stackoverflow.com) - This helped me for 99% of my code. I'd recommend it to anyone still learning.

## Author

- Twitter - [@snufalufakis2](https://www.twitter.com/snufalufakis2)

## Acknowledgments

Big shout out to my project 2 team.
Andrew Yeh
Daniel Holloway
Jack Youkstetter
James Montogmery

I was able to use their code to help me with my assignment and I was able to add my own touch to it.
