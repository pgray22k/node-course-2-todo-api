//mongoose configuration.. this is just one time initialization of data so we call the mongoose variable once

var mongoose = require('mongoose');

//set up mongoose to use promises with its built in lib.
mongoose.Promise = global.Promise;

//connect to the database using mongoose - mongodb is the protocols
//mongoose maintains the connection over time and we don't have to use callbacks
//with this mongoose allows us not to micro manage with updating, deleting or saving.
//When developing apps , websites on different servers we have to get the URI from the process instead
//    of using are local host
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true });

module.exports = {
    mongoose : mongoose  //with e6 we can shorten this by putting this on one line.
};