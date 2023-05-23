const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

const dbService = require('./dbService');
require('dotenv').config();
app.use(cors() );
app.use(express.json() );
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

var sess = {};

app.post('/createAcc', (req, res) => {
    const {username} = req.body;
    const {password} = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.createNewAcc(username, password)

    result
    .catch(err => console.log(err) );
});

app.post('/login', (req, res) => {
    const {username} = req.body;
    const {password} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.searchAcc(username, password)

    result
    .then( result => (result != {} ) ? req.session.userId = result._id : console.log("not found") )
    .then( () => sess = req.session )
    .catch(err => console.log(err) );
});

app.patch('/logout', (req, res) => {// revise to return response
    req.session.destroy();
});

app.patch('/updatePass', (req, res) => {
    const {newPassword} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.chgPassword(sess.userId, newPassword)

    result
     //.then(data => res.json( {success : data} ) )
     .catch(err => console.log(err) );
});

app.patch('/updateWin', (req,res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.updateWins(sess.userId)

    result
    //.then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );
});

app.patch('/updateLoss', (req,res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.updateLosses(sess.userId)

    result
    //.then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );
});

app.patch('/updateTie', (req,res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.updateTies(sess.userId)

    result
    //.then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );
});

app.get('/readAcc', (req,res) => { // returns an object containing wins, losses, and ties
    const db = dbService.getDbServiceInstance();
    const result = db.getWinsLossesTies(sess.userId)

    result
    .then(data => res.json( {data : data} ) )
    .catch(err => console.log(err) );
});

app.delete('/deleteAcc', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.deleteAcc(sess.userId)

    result
    //.then(data => res.json( {success : data} ) )
    .catch(err => console.log(err) );

    //res.redirect('/logout');
    req.session.destroy();//placeholder
});

app.listen(process.env.PORT || 5000, '0.0.0.0');