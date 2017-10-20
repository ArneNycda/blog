const Comment = require('../models').Comment;

module.exports = {
  create(req, res) {
    return Comment
      .create({
        text: req.body.text,
        postid: req.params.postid
      })
      .then(comment => res.status(201).send(comment))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Comment
      .all()
      .then(comments => res.status(200).send(comments))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Comment
      .findById(req.params.commentid)
      .then(comment => {
        if (!comment) {
          return res.status(404).send({
            message: 'Comment Not Found',
          });
        }
        return res.status(200).send(comment);
      })
      .catch(error => res.status(400).send(error));
  },
  retrieveForPost(req, res) {
    return Comment
      .findAll({
        where: {
          postid: req.params.postid
        }
      })
      .then(comments => {
        if (!comments) {
          return res.status(404).send({
            message: 'Comment Not Found',
          });
        }
        return res.status(200).send(comments);
      })
      .catch(error => res.status(400).send(error));
  }
};
