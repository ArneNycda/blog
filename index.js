const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const request = require('request');
const baseUrl = 'http://localhost:3000';
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const authenticate = require('./lib/authenticate');

app.use(
    sassMiddleware({
        src: `${__dirname}/public/styles/sass`,
        dest: `${__dirname}/public/styles`,
        debug: true,
        outputStyle: 'expanded',
        prefix: '/styles'
    }),
    express.static(`${__dirname}/public`)
);
app.set('view engine', 'pug');
app.use('/public', express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secure blog',
    resave: true,
    saveUninitialized: false
}));
require('./server/routes')(app);

app.route('/login')
    .get((req, res) => {
        res.render('./pages/login');
    })
    .post((req, res) => {
        request(`${baseUrl}/api/user/find/${req.body.username}`, (error, response, user) => {
            if (user !== '' && bcrypt.compareSync(req.body.password, JSON.parse(user).password)) {
                req.session.user = user;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        });
    });

app.get('/retrieveUserid', (req, res) => {
    const userid = JSON.parse(req.session.user).id;

    res.send({ userid });
});

app.get('/register', (req, res) => {
    res.render('./pages/register');
});

app.get('/', authenticate, (req, res) => {
    request(`${baseUrl}/api/post/all`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.render('./pages/index', { posts: JSON.parse(body) });
        }
    });
});

app.get('/new', authenticate, (req, res) => {
    res.render('./pages/new');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw err;
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/post', authenticate, (req, res) => {
    const postid = req.query.id;

    if (postid === undefined ) {
        res.redirect('/');
    } else {
        request(`${baseUrl}/api/post/${postid}`, (error, response, post) => {
            request(`${baseUrl}/api/comment/forpost/${postid}`, (error, response, comments) => {
                if (!error && response.statusCode === 200) {
                    res.render('./pages/posts', { post: JSON.parse(post), comments: JSON.parse(comments) });
                }
            });
        });
    }
});

app.get('*', authenticate, (req, res) => {
    res.redirect('/');
});

module.exports = app;
