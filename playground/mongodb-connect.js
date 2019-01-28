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

    //insert a record into the collection, make sure we create a call back function to handle the error and print
    //the results
    /*db.collection('Todos').insertOne({
        text: `Something to do`,
        completed: false
    }, ( err , result ) => {
        if ( err ) {
            return console.log('Unable to insert Todo', err );
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

    /*.collection('Users').insertOne({
        //_id: 123, //can also create id
        name: `Philip Gray`,
        age: 36,
        location: `Hillsborough`
    }, ( err , result ) => {
        if ( err ) {
            return console.log('Unable to insert entry to Users table', err );
        }

        //we can get the timestamp off of mongo db id random generator by calling timestamp, to see when
        //the object was created
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });*/

    client.close();
});