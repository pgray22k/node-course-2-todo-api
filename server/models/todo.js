//create a todo model
//mongoose likes everything organized by creating attributes to our document/table
var mongoose = require('mongoose');


//mongoose when creating a model / table / document lowers cases the name and makes it plural
var Todo = mongoose.model('Todo',  {
   text : {
       type : String,
       required: true,
       minLength: 1, //sets the min length
       trim: true //trims the beginning and end of the text string
   } ,
   completed : {
       type : Boolean,
       default: false
   },
    completedAt : {
       type : Number,
        default : null
    }
});

// var newTodo = new Todo( {
//     text: '    clean house todo ',
//     completed : false,
//     completedAt: new Date().getTime()
// });


module.exports = {Todo};