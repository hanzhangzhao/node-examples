const assert = require('assert');

exports.insertDoucument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);
}

exports.findDoucument = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
}

exports.removeDoucument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
}

exports.updateDoucument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
}