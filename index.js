const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const ejs = require('ejs');
const { Pool } = require('pg');
const pool = new Pool({
      host: 'localhost',
      port: 3001,
      database: 'blog',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
});
const SQL = require('sql-template-strings');
const request = require('request');
const baseUrl = 'http://localhost:3000';
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.engine('ejs', require('express-ejs-extend'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'oh wow very secret much security',
    resave: true,
    saveUninitialized: false
}));
require('./server/routes')(app);

app.route('/login')
    .get(function (req, res) {
        res.render('./pages/login');
    })
    .post(function (req, res) {
        request(`${baseUrl}/api/user/find/${req.body.username}`, function(error, response, user) {
            if(user !== null && req.body.password === JSON.parse(user).password) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.redirect('login');
            }
        });
    });

app.route('/register')
    .get(function (req, res) {
        res.render('./pages/register');
    })
    .post(function (req, res) {
        request.post({
            url: `${baseUrl}/api/user/create`,
            form: req.body
        }, function (error, response, post) {
            if (!error && response.statusCode == 201) {
                res.redirect('login');
            }
        });
    });

app.route('/')
    .get(function (req, res) {
        const user = req.session.user;

        if (user === undefined) {
            res.redirect('login');
        } else {
            request(`${baseUrl}/api/post/all`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.render('./pages/index', {posts: JSON.parse(body)});
                }
            });
        }
    });

app.route('/new')
    .get(function (req, res) {
        const user = req.session.user;

        if (user === undefined) {
            res.redirect('login');
        } else {
            res.render('./pages/new');
        }
    })
    .post(function (req, res) {
        const userid = JSON.parse(req.session.user).id;

        request.post({
            url: `${baseUrl}/api/user/${userid}/post`,
            form: req.body
        }, function (error, response, post) {
            if (!error && response.statusCode == 201) {
                res.redirect(`/post/?post=${JSON.parse(post).id}`);
            }
        });

    });

app.route('/logout')
    .get(function (req, res) {
        req.session.destroy(function(err) {
            if(err) {
                throw err;
            } else {
                res.redirect('login');
            }
        });
    });

app.route('/post')
    .get(function (req, res) {
        const user = req.session.user;

        if (user === undefined) {
            res.redirect('login');
        } else {
            const postid = req.query.post;

            if (postid === undefined ) {
                res.redirect('new');
            } else {
                request(`${baseUrl}/api/post/${postid}`, function (error, response, post) {
                    request(`${baseUrl}/api/comment/forpost/${postid}`, function (error, response, comments) {
                        if (!error && response.statusCode == 200) {
                            res.render('./pages/posts', {post: JSON.parse(post), comments: JSON.parse(comments)});
                        }
                    });
                });
            }
        }
    });

app.route('/comment')
    .post(function (req, res) {

        request.post({
            url: `${baseUrl}/api/post/${req.query.postid}/comment`,
            form: req.body
        }, function (error, response, comment) {
            if (!error && response.statusCode == 201) {
                res.redirect(`/post/?post=${JSON.parse(comment).postid}`);
            }
        });
    });

app.route('*')
    .get(function (req, res) {
        const user = req.session.user;

        if (user === undefined) {
            res.redirect('login');
        } else {
            res.redirect('/');
        }
    });

module.exports = app;
