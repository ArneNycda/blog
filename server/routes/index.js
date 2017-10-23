const usersController = require('../controllers').users;
const postsController = require('../controllers').posts;
const commentsController = require('../controllers').comments;

module.exports = (app) => {
  app.get('/api/user', (req, res) => res.status(200).send({
    message: 'Welcome to the users API!',
  }));
  app.post('/api/user/create', usersController.create); //create user
  app.get('/api/user/all', usersController.list);
  app.post('/api/user/:userid/post', postsController.create); //create post for user
  app.get('/api/user/:userid', usersController.retrieve);
  app.get('/api/user/find/:username', usersController.findByUsername);

  app.get('/api/post', (req, res) => res.status(200).send({
    message: 'Welcome to the posts API!',
  }));
  app.post('/api/post/create', postsController.create);
  app.get('/api/post/all', postsController.list);
  app.post('/api/post/:postid/comment', commentsController.create); //create comment for post
  app.get('/api/post/:postid', postsController.retrieve);

  app.get('/api/comment', (req, res) => res.status(200).send({
    message: 'Welcome to the comments API!',
  }));
  app.post('/api/comment/create', commentsController.create);
  app.get('/api/comment/all', commentsController.list);
  // no sub for this one
  app.get('/api/comment/:commentid', commentsController.retrieve);
  app.get('/api/comment/forpost/:postid', commentsController.retrieveForPost);
};
