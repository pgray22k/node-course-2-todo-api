const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '6c4f68757d84186ef0fd7d43'; //'5c50bb867c8b34a4c46c69de11';//5c50bb867c8b34a4c46c69de

// if (!ObjectID.isValid(id)) {
//     return console.log('ID not valid');
// }

console.log('\nExample quires using Todos and Users');

//mongoose allows us to pass a string and it will do the conversion to object id automatically
// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// //finds the first match of document also returns object instead of array
// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('Todo', todo );
// });

//finds by an id
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Todo by id not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User by id', user);
}).catch((e) => console.log(e));