//server class file will be responsible for our routes.
const express = require( 'express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); //destructor our models and reference them to the class
var {User} = require ('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

//route for doing deletes in the program / database
app.delete('/todos/:id', (request, response)=> {
    //get by id
    var id = request.params.id;

    //validate by id
    if (!ObjectID.isValid(id)) {
        console.log('ID not valid');
        response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then( (todo) => {
        if(!todo) {
            response.status(404).send("ID not found");
        }
        response.status(200).send({todo});
    }).catch((e) => {
        response.status(400).send();
    });
});


//This is an update route, we use patch to make update calls to the database / program
app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;

    //using lodash module we are to get only the subset of the things the users passes to us
    var body = _.pick(request.body, ['text', 'completed']);  //this just takes the text and completed properties

    if (!ObjectID.isValid(id)) {
        console.log('ID not valid');
        response.status(404).send();
    }

    if( _.isBoolean(body.completed) && body.completed ) {
        body.completedAt = new Date().getTime(); //returns javascript timestamp in millisecoonds
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            response.status(404).send();
        }
        response.send({todo});

    }).catch((e) => {
        response.status(400).send();
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};