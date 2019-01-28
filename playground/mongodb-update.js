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

    ///update
    //findOneAndUpdate(filter, update, options, callback){Promise.<Collection~findAndModifyWriteOpResultObject>}
    //returns a promise if no callback is specified
    /*db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c4dcba1575034137c56f704')
    }, {
        //must use operators to update mongo db, even it makes logic sense to call the set
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false //When false, returns the updated document rather than the original. The default is true.
    }).then( (result) => {
       console.log(result);
    });*/

    db.collection('Users').findOneAndUpdate({
        name: 'Angie'
    }, {
        //must use operators to update mongo db, even it makes logic sense to call the set
        $set: {
            name: 'Mike'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false //When false, returns the updated document rather than the original. The default is true.
    }).then( (result) => {
        console.log(result);
    });

    // client.close();
});