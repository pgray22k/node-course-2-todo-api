//server class file will be responsible for our routes.
var express = require( 'express');
var bodyParser = require('body-parser')

const {ObjectID} = require('mongodb');

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

//get all the todos
app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        //create an object to send back to the user to create status code or anything you want to send back to the user
        response.send({todos});
    }, (e) => {
        response.status(400).send(e);
    })
});

//GET /todos/(id) --make this url dynamic to fetch info by id
//putting a colon is a url parameter to make it dynamic
app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    //response.send(request.params);
    //validate id if not valid respond with a 404 send back empty body

    if (!ObjectID.isValid(id)) {
        console.log('ID not valid');
        response.status(404).send();
    }

    Todo.findById(id).then((todo) => {
       if(!todo) {
           response.status(404).send();
       }
       response.status(200).send({todo});
    }).catch((e) => {
        response.status(400).send();
    });

    //findById
     //success send back 200
        //if todo- send it back
        //if no todo -- send back 404 with empty body
     //error
       //send back 400 and send back empty back

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};