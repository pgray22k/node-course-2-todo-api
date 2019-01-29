/*
    Test Class to test our post api calls
 */
const expect = require('expect');  //helps create test classes
const request = require('supertest'); //test http post and response methods

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//mske dummy todos
const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

/*
    1) database will be empty before the test runs, we are doing this in order to past our test case
    the to-do is coming back with 1 item in the database
    2) After we remove we must also insert test data back into the database to test we have the expected items
    when submitting a failure
 */
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(()=> done()); //chaining callbacks
});

//group multiple routes
describe('POST /todos', () => {
    it ('should create a new todo', (done) => { //asynchronous test so have to call done
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text}) //Supertest automatically converts to JSON when using this library
            .expect(200)
            .expect((response) => { //assertion about the body of the text that will come back
                expect(response.body.text).toBe(text); //the text body should be the text that is defined above
            })
            .end((err, response) => {  //instead of calling done we will check if the text got entered in the database
                if(err) {
                    return done(err); //stops the function execution if there is an eroor
                }

                //call find to see if the text was actually stored
                //added find the specific text that we entered so the test should come back as 1
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1); //because we added one to-do item
                    expect(todos[0].text).toBe(text);//if the text is the same is
                    done();
                }).catch((e) => done(e)); // catch the error if failed saving to the database because the above calls only catches http errors in our test case
            });
    });

    //when we send bad data
    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({}) //Supertest automatically converts to JSON when using this library
            .expect(400)
            // .expect((response) => { //assertion about the body of the text that will come back
            //     expect(response.body.text).toBe(text); //the text body should be the text that is defined above
            // })
            .end((err, response) => {  //instead of calling done we will check if the text got entered in the database
                if(err) {
                    return done(err); //stops the function execution if there is an eroor
                }

                //call find to see if the text was actually stored
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2); //there should only two documents because that we added in the before
                    //expect(todos[0].text).toBe(text);//if the text is the same is
                    done();
                }).catch((e) => done(e)); // catch the error if failed saving to the database because the above calls only catches http errors in our test case
            });
    });
});

describe('GET /todos', () => {
    it ('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response)=>{
                expect(response.body.todos.length).toBe(2) //because we have two to-dos in our test data
            })
            .end(done);
    })
});