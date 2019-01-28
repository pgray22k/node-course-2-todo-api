// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb'); //using destructing and making object id on the fly

var obj = new ObjectID(); //new instance object id

console.log ( `New Object Id ${obj}` );

//object destructing - lets you pull out properties from an object to make variables.
// e.g
// var user = { name: `Philip`, age: 36 };
// var {name} = user;
// console.log(`Destructing user to get the name ${name}`);

//make a callback function to connect and handle error messages
MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true }, ( err, client ) => {
    if ( err ) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp'); //get the database reference

    //fetch all todos table/collection
    //returns cursor
    //pass in json string to search the table/document
    //if want to search by id we need to make a new object since values are stored as objects
    // db.collection('Todos').find({
    //     _id: new ObjectID('5c4dd35dd723905ad8ed45cf')
    // }).toArray().then((docs) => {
    //     console.log(`Todos`);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log(`Unable to fetch todos`, err);
    // }); //gives you a array of documents and return a promise

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    //     //console.log(JSON.stringify(count, undefined, 2));
    // }, (err) => {
    //     console.log(`Unable to fetch todos`, err);
    // }); //gives you a array of documents and return a promise

    db.collection('Users').find({ name : `Philip`}).toArray().then( (docs) => {
        console.log(`Todos`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(`Unable to fetch todos`, err);
    }); //gives you a array of documents and return a promise

    client.close();
});