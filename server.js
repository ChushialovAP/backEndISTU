const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const port = 9500

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.get('/index', function(req, resp) {
    if (req.cookies['auth'] != null) {
        resp.status(200).send(":)");
    } else {
        resp.redirect('/sign-in');
    }
})

app.set('view engine', 'ejs');
app.get('/sign-in', function(req, resp) {
    resp.render('pages/form');
})

app.post('/sign-in', function(req, resp) {
    console.log(req.body);
    const username = req.body.username;
    resp.cookie('auth', username, {
        maxAge: 1000 * 60 * 5
    });
    resp.redirect('/');
})

app.get('/sign-out', function(req, resp) {
    resp.clearCookie('auth');
    resp.redirect('/sign-in');
})

app.get('/', (req, res) => {
    res.redirect('/index');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})