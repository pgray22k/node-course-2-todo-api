//server class file will be responsible for our routes.
var express = require( 'express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); //destructor our models and reference them to the class
var {User} = require ('./models/user');

var app = express();

/*
    crud -- create , read, update, and delete.

    To create a resource you use post http method and send the resource as a body
 */

//middle ware for handling json for express
app.use( bodyParser.json() );

/*
    Make a Route via api post for json queries
 */

//resources use /(object) creating a new object

app.post('/todos', (request, response) => {
    var todo = new Todo({
       text: request.body.text
    });

    //save the document and send the results to the user
    todo.save().then((doc) => {
        response.send( doc );
    }, (e) => {
        response.status(400).send( e );
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};