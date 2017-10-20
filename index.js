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

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// app.route('/')
//     .get(function (req, res) {
//         // if (loggedin) {
//             res.render('./pages/index', {posts:
//                 [
//                     {
//                         id: '1',
//                         title: 'This is my first post',
//                         author: 'arne'
//                     },
//                     {
//                         id: '2',
//                         title: 'This is my second post',
//                         author: 'lloyd'
//                     }
//                 ]
//             });
//         // } else {
//         //     res.redirect('./pages/login');
//         // }
//     });

// app.route('/login')
//     .get(function (req, res) {
//         res.render('./pages/login');
//     })
//     .post(function (req, res) {
//         // login();
//         res.redirect('./pages/index');
//     });

// app.route('/new')
//     .get(function (req, res) {
//         // if (loggedin) {
//             res.render('./pages/new');
//         // } else {
//         //     res.redirect('./pages/login');
//         // }
//     })
//     .post(function (req, res) {
//         // savePost();
//         res.redirect('posts');
//     });

// app.route('/register')
//     .get(function (req, res) {
//         res.render('./pages/register');
//     })
//     .post(function (req, res) {
//         // saveUser
//         res.redirect('login');
//     });

// app.route('/logout')
//     .get(function (req, res) {
//         // logout()
//         res.redirect('login');
//     });

// app.route('/post')
//     .get(function (req, res) {
//         // if (loggedin) {
//             res.render('./pages/posts');
//         // } else {
//         //     res.redirect('./pages/login');
//         // }
//     })
//     .post(function (req, res) {
//         // saveComment();
//         res.redirect('posts');
//     });

module.exports = app;
