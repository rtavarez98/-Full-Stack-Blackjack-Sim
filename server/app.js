const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

const dbService = require('./dbService');

app.use(cors() );
app.use(express.json() );
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

var sess = {};

app.post('/createAcc', (req, res) => { // slow response speed up
    const {username} = req.body;
    const {password} = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.createNewAcc(username, password, 0, 0, 0)

    result
    .then(data => res.json( {data : data} ) )
    .catch(err => console.log(err) );
});

app.post('/login', (req, res) => {
    const {username} = req.body;
    const {password} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.searchAcc(username, password)

    result
    .then(data => res.json( {data : data} ) )
    .catch(err => console.log(err) );

    if (result != {} ) { // authenticate found account
        req.session.username = username;
        req.session.password = password;
    }

    sess = req.session;
});

app.patch('/logout', (req, res) => {// revise to return response
    req.session.destroy();
});

app.patch('/updatePass', (req, res) => {
    const {newPassword} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.chgPassword(sess.username, sess.password, newPassword)

    result
     .then(data => res.json( {success : data} ) )
     .catch(err => console.log(err) );
});

app.patch('/updateWin', (req,res) => {//win
    const db = dbService.getDbServiceInstance();
    const result = db.updateWins(sess.username, sess.password)

    result
    .then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );
});

app.patch('/updateLoss', (req,res) => {//loss
    const db = dbService.getDbServiceInstance();
    const result = db.updateLosses(sess.username, sess.password)

    result
    .then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );
});

app.patch('/updateTie', (req,res) => {//tie
    const db = dbService.getDbServiceInstance();
    const result = db.updateTies(sess.username, sess.password)

    result
    .then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );
});

app.get('/readAcc', (req,res) => {
    console.log(sess.username)//test
    const db = dbService.getDbServiceInstance();
    const result = db.getWinsLossesTies(sess.username, sess.password)

    result
    .then(data => res.json( {data : data} ) )
    .catch(err => console.log(err) );
});

app.delete('/deleteAcc', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.deleteAcc(sess.username, sess.password)

    result
    .then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );

    //res.redirect('/logout');
    req.session.destroy();//placeholder
});

app.listen(5000, () => console.log('app is running') );