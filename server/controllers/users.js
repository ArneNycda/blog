const bcrypt = require('bcrypt');
const User = require('../models').User;
const Post = require('../models').Post;
const requiredLength = 8;
const checkStringLength = (input, len) => input.length === 0 || input.length >= len;

module.exports = {
  create(req, res) {
    return User
      .create({
        username: checkStringLength(req.body.username, requiredLength) ? req.body.username : undefined,
        password: checkStringLength(req.body.password, requiredLength) ? bcrypt.hashSync(req.body.password, 9) : undefined,
        displayname: checkStringLength(req.body.displayname, requiredLength) ? req.body.username : undefined
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Post,
          as: 'posts',
        }],
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.userid, {
        include: [{
          model: Post,
          as: 'posts',
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  findByUsername(req, res) {
    return User
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
};
