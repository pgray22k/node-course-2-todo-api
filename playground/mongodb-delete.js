// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb'); //using destructing and making object id on the fly

// var obj = new ObjectID(); //new instance object id
//
// console.log ( `New Object Id ${obj}` );

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

    // ///deleteMany
    // //deletes all todos that text equals
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then( (result) => {
    //    console.log(result);
    // });
    //
    // //deleteOne
    // //deletes the first one
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //    console.log(result);
    // });
    //
    // //findAndDelete
    // //finds the first one then deletes the first document
    // db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    //
    // })

    db.collection('Users').deleteMany({name: 'Mike'}).then( (result) => {
       console.log(result);
    });

    db.collection('Users').deleteOne({name: 'Philip Gray'}).then((result) => {
       console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c4f21c6f632a04190a10727')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2 ));
    });


    // client.close();
});