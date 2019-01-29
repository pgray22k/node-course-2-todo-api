//create a user model
var mongoose = require('mongoose');

var User = mongoose.model('User',  {
    email : {
        type : String,
        required: true,
        minLength: 10, //sets the min length
        trim: true //trims the beginning and end of the text string
    } ,
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required : true
    }
});

// var newUser = new User( {
//     email: '    and@gmail.com ',
//     firstName : 'And',
//     lastName:  'Phil'
// });


// newUser.save().then((doc) => {
//     console.log( JSON.stringify(doc, undefined, 2) );
// }, (e) => {
//     console.log('Unable to save todo')
// });

module.exports = {User};  //have to export methods variables ... liking me them public in java