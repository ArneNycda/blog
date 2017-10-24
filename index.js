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
const bcrypt = require('bcrypt');
const session = require('express-session');
const authenticate = require('./lib/authenticate');

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
    secret: 'secure blog',
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
            if(user !== '' && bcrypt.compareSync(req.body.password, JSON.parse(user).password)) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        });
    });

app.get('/retrieveUserid', function(req, res) {
    const userid = JSON.parse(req.session.user).id;
    res.send({userid: userid});
});

app.get('/register', function (req, res) {
    res.render('./pages/register');
});

app.get('/', authenticate, function (req, res) {
    request(`${baseUrl}/api/post/all`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('./pages/index', {posts: JSON.parse(body)});
        }
    });
});

app.get('/new', authenticate, function (req, res) {
    res.render('./pages/new');
});

app.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if(err) {
            throw err;
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/post', authenticate, function (req, res) {
    const postid = req.query.post;

    if (postid === undefined ) {
        res.redirect('/');
    } else {
        request(`${baseUrl}/api/post/${postid}`, function (error, response, post) {
            request(`${baseUrl}/api/comment/forpost/${postid}`, function (error, response, comments) {
                if (!error && response.statusCode == 200) {
                    res.render('./pages/posts', {post: JSON.parse(post), comments: JSON.parse(comments)});
                }
            });
        });
    }
});

app.get('*', authenticate, function (req, res) {
    res.redirect('/');
});

module.exports = app;
