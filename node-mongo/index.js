const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

// MongoClient.connect(url, (err, client) => {

//     assert.equal(err, null);

//     console.log('Connected correctly to server');

//     const db = client.db(dbname);  // connect to the database

//     dboper.insertDoucument(db, { name:"Vadonut", description: "Test"}, 'dishes', (result) => {

//         console.log("Insert Document:\n", result.ops); // ops tells you the number of insert operations that were carried out

//         dboper.findDoucument(db, 'dishes', (docs) => {
//             console.log("Found Documents:\n", docs);

//             dboper.updateDoucument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes', (result) => {

//                 console.log('Updated Document:\n', result.result);

//                 dboper.findDoucument(db, 'dishes', (docs) => {
//                     console.log("Found Documents:\n", docs);

//                     db.dropCollection('dishes', (result) => {
//                         console.log('Dropped Collection: '+ result);

//                         client.close();
//                     })
//                 })
//             })
//         })
//     })
// })

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);  // connect to the database

    dboper.insertDoucument(db, { name: "Vadonut", description: "Test" }, 'dishes')
        .then((result) => {

            console.log("Insert Document:\n", result.ops); // ops tells you the number of insert operations that were carried out

            return dboper.findDoucument(db, 'dishes')
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDoucument(db, { name: 'Vadonut' }, { description: 'Updated Test' }, 'dishes')
        })
        .then((result) => {

            console.log('Updated Document:\n', result.result);

            return dboper.findDoucument(db, 'dishes')
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return db.dropCollection('dishes')
        })
        .then((result) => {
            console.log('Dropped Collection: ' + result);

            client.close();
        })
        .catch((err) => console.log(err));
})
    .catch((err) => console.log(err));