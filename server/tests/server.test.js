/*
    Test Class to test our post api calls
 */
//To run our tests make sure we use npm run test-watch


const expect = require('expect');  //helps create test classes
const request = require('supertest'); //test http post and response methods
const {ObjectID} = require ('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
//clean up code and make a seed class that populates test in the Test Database
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

/*
    1) database will be empty before the test runs, we are doing this in order to past our test case
    the to-do is coming back with 1 item in the database
    2) After we remove we must also insert test data back into the database to test we have the expected items
    when submitting a failure
 */
beforeEach( populateUsers);
beforeEach( populateTodos );

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
                }).catch((e) => done(e)); // catch the error if failed saving to the database because the above
                // calls only catches http errors in our test case
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

describe('GET all /todos', () => {
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

describe('GET one /todos:id', ()=> {
    it('should return todo doc', (done)=> {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((response)=>{
                expect(response.body.todo.text).toBe(todos[0].text) //because we have two to-dos in our test data
            })
            .end(done);

    });

    it('should return 404 if todo not found', (done)=> {
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 non-object id', (done)=> {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', ()=> {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect( (response) => {
                expect(response.body.todo._id).toBe(hexId);
            })
            .end((err, response) => {
                if ( err ) {
                    return done(err);
                }

                //call find to see if the delete actually worked
                //added find the specific text that we entered so the test should come back as 1
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist(); //because we removed the item from the DB
                    done();
                }).catch((e) => done(e)); // catch the error if failed saving to the database because the above
                // calls only catches http errors in our test case
            });

    });

    it('should return 404 uf todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });

});

describe('Patch /todos:id', () => {

    it('should update the todo', (done)=> {
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be the new text';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect( (response) => {
                expect(response.body.todo.text).toBe(text);
                expect(response.body.todo.completed).toBe(true);
                expect(response.body.todo.completedAt).toBeA('number');
            })
            .end(done);

    });

    it('should clear completedAt when todo is not completed', (done)=> {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false})
            .expect(200)
            .expect( (response) => {
                expect(response.body.todo.completed).toBe(false);
                expect(response.body.todo.completedAt).toNotExist();
            })
            .end(done);

    });

});

describe('GET /users/me', () => {
   it('should return users if authenticated', (done) => {
      request(app)
          .get('/users/me')
          .set('x-auth', users[0].tokens[0].token) //set a header in super test
          .expect(200)
          .expect((response)=> {
              expect(response.body._id).toBe(users[0]._id.toHexString());
              expect(response.body.email).toBe(users[0].email);
          })
          .end(done);
   }) ;

   it('should return 401 if not authenticated', (done)=>{
       request(app)
           .get('/users/me')
           //.set('x-auth', users[0].tokens[0].token) //set a header in super test
           .expect(401)
           .expect((response) => {
               expect(response.body).toEqual({}) //use toEqual to compare an empty object
           })
           .end(done);
   });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb'
        var firstName = 'first';
        var lastName = 'last'
        request(app)
            .post('/users')
            .send({email, password, firstName, lastName})
            .expect(200)
            .expect((response) => {
                expect(response.headers['x-auth']).toExist();
                expect(response.body._id).toExist();
                expect(response.body.email).toBe(email);
            })
            .end((err) => {
                //we can take are call further and check if we find the email of the newly created user in the database
                //and the password does not equal the password in the database because it should be hashed.
                if(err) {
                    return done(err);
                }
                //when adding new objects make sure we add the classes from other directory .... this is how
                // we get the Reference Error is not defined

                User.findOne({email}).then((user)=>{
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => done(e) );
            });
    });

    it('should return validation errors if request invalid', (done) => {
        var email = 'example212';
        var password = '123'
        var firstName = 'first';
        var lastName = 'last'
        request(app)
            .post('/users')
            .send({email, password, firstName, lastName})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        var email = 'and@example.com';
        var password = '123mnb'
        var firstName = 'And';
        var lastName = 'Phil'
        request(app)
            .post('/users')
            .send({email, password, firstName, lastName})
            .expect(400)
            // .expect((response) => {
            //     expect(response.headers['x-auth']).toExist();
            //     expect(response.body._id).toExist();
            //     expect(response.body.email).toBe(email);
            // })
            .end(done);
    });
});

describe('POST /users/login', ()=> {
    it('should login user and return auth token', (done)=> {

        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password,
            })
            .expect(200)
            .expect((response) => {
                expect(response.headers['x-auth']).toExist();
                //expect(response.body._id).toExist();
                //expect(response.body.email).toBe(users[1].email);
            })
            .end((err, response) => {
                if ( err ) {
                    return done;
                }

                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[0]).toInclude({
                       access: 'auth',
                       token: response.headers['x-auth']
                    });
                    done();
                }).catch((e) => done(e) ); //create a custom catch call to know exactly where the error was caused
            });

    });

    it('should reject invalid login', (done)=> {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: 'badPassword',
            })
            .expect(400)
            .expect((response) => {
                expect(response.headers['x-auth']).toNotExist();
            })
            .end((err, response) => {
                if ( err ) {
                    return done;
                }

                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e) ); //create a custom catch call to know exactly where the error was caused
            });
    });
});


describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
       //DELETE /users/me/token
       //SET X-auth equal to token
       //200
       //find user, verify that tokens array has length of zero

       request(app)
           .delete('/users/me/token')
           .set('x-auth', users[0].tokens[0].token) //set a header in super test
           .expect(200)
           .expect((response)=>{
               expect(response.headers['x-auth']).toNotExist();
           })
           .end((err, response) => {
               if ( err ) {
                   return done(err);
               }

               User.findById(users[0]._id).then((user)=>{
                   expect(user.tokens.length).toBe(0);
                   done();
               }).catch((e) => done(e) ); //create a custom catch call to know exactly where the error was caused
           });
    });
})