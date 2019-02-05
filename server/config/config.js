var env = process.env.NODE_ENV || 'development';

if( env === 'development' || env === 'test') {
    var config = require('./config.json');  //javascript can automatically load json files to become objects.
    var envConfig = config[env]; // have to use bracket notation to get the property development or test

    Object.keys(envConfig).forEach((key)=> {
        process.env[key] = envConfig[key];  //will set PORT or MongoDB
    });//takes an Object keys and turns them into array
}

console.log("env********", env);

// if ( env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoApp';
// } else if ( env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoAppTest';
// }