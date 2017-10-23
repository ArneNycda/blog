const usersController = require('../controllers').users;
const postsController = require('../controllers').posts;
const commentsController = require('../controllers').comments;

module.exports = (app) => {
  app.get('/api/user/all', usersController.list);
  app.get('/api/user/:userid', usersController.retrieve);
  app.get('/api/user/find/:username', usersController.findByUsername);
  app.post('/api/user/create', usersController.create);

  app.get('/api/post/all', postsController.list);
  app.get('/api/post/:postid', postsController.retrieve);
  app.post('/api/post/create', postsController.create);
  app.post('/api/user/:userid/post', postsController.create);

  app.get('/api/comment/all', commentsController.list);
  app.get('/api/comment/:commentid', commentsController.retrieve);
  app.get('/api/comment/forpost/:postid', commentsController.retrieveForPost);
  app.post('/api/comment/create', commentsController.create);
  app.post('/api/post/:postid/comment', commentsController.create);
};
