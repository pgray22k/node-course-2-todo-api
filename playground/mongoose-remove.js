const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//To remove every document in the database have to add an empty {}
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5c52f56df632a04190a10754'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove('5c52f56df632a04190a10754').then( (todo) => {
//     console.log(todo);
// });