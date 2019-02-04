var {User} = require('./../models/user');

//middleware function to make all of our routes private
//based on the token we can return the appropriate user from the app call
var authenticate = ( request, response, next) => {
    var token = request.header('x-auth'); //get the header and verify the token and get the user

    User.findByToken(token).then( (user) => {
        if ( !user ) {
            return Promise.reject();
        }
        request.user = user;
        request.token = token;
        next(); //we have to call next because all calling methods it will not execute;
    }).catch((e) => {
        response.status(401).send()
    });;
}

module.exports = { authenticate };