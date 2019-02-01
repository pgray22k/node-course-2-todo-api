//create a user model
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
        email : {
            type : String,
            required: true,
            minLength: 10, //sets the min length
            trim: true ,//trims the beginning and end of the text string
            unique: true,
            validate: {
                validator: (value)=> {
                    return validator.isEmail(value);
                },
                message: `{VALUE} is not a valid email`
            }
        } ,
        firstName : {
            type : String,
            required: true
        },
        lastName : {
            type : String,
            required : true
        },
        password : {
            type: String,
            required : true,
            minLength: 6,
        },
        tokens:[{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
);

//instance method, instance methods have access to individual documents
//creating a method to the model
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(()=> {
      return token;  //get passed as success argument for the next then call
  });
};

//override methods
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    //want to only see the user constants, giving password, token, etc. should only be for server information
    return _.pick(userObject, ['_id','email','firstName']);
};

var User = mongoose.model('User',  UserSchema );

// newUser.save().then((doc) => {
//     console.log( JSON.stringify(doc, undefined, 2) );
// }, (e) => {
//     console.log('Unable to save todo')
// });

module.exports = {User};  //have to export methods variables ... liking me them public in java