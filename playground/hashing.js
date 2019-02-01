//JWT JSON Web Token Support
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

//create a salt automatic for you
//bcrypt is inheritly slow wish a good thing because it prevents people to do DoS attack
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash( password, salt, (err, hash)=> {
//         console.log(hash);
//     });
// });

var hashedPassword ='$2a$10$5MO06RYmqVVooFAuYg4SFuMD0K8j4C6/6pNzJARsydFNGwvZEaYWa';

bcrypt.compare( '123', hashedPassword, (err, result) => {
    console.log( result );
})

// var data = {
//     id: 10
// }
//
// var token = jwt.sign( data, '123abc');
// console.log( token );
// var decoded = jwt.verify( token, '123abc');
// console.log( decoded );

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id : 4
// };
//
//
// //salt -- secret that salts our hash, to make it unique and user cant change it
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if ( resultHash === token.hash ){
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed do not trust');
// }