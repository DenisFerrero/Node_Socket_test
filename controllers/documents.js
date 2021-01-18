const express = require('express');
var router = express.Router();
const DB = require('../models/index');
const fileUpload = require('express-fileupload');
const moment = require('moment');
const md5 = require('md5');

moment.locale('it');

module.exports = function () {

    // Thanks to this it's possible render file from front-end
    // The file are loaded from input
    // to access the file you've to access from req.files
    // https://www.npmjs.com/package/express-fileupload
    router.use(fileUpload());

    // GET function, return all documents
    router.route('/')
        // Get method
        .get((req, res) => {
            // Find all documents and after find them (.then) return the result (res)
            DB.documents.findAll().then((documents) => {
                // Check if documents are corrupted, if corrupted they'll be shown an error on frontend
                let check_corrupted_documents = [];
                documents.forEach(function (document) {
                    document['is_corrupted'] = !(md5(document.content) == document.md5);
                    check_corrupted_documents.push(document);
                });
                res.send(documents);
            });
            // the same thing can be done using query:
            // DB.sequelize.query(`SELECT * FROM documents`).then((documents) => {
            //      ...
            //      res.send(document);
            // })
        })
        // Post method
        .post((req, res) => {
            // Before post of the document check if the checksum is ok
            let md5_file = md5(req.files.document.data);
            if (md5_file == req.files.document.md5)
                DB.documents.create({ // You don't have to specify the id, sequelize'll do it for you
                    "name": req.body.name,
                    "extension": req.body.extension,
                    "description": req.body.description,
                    "content": req.files.document.data, // The file you want to save
                    "md5": req.files.document.md5, // MD5 is the checksum that identify if the file is corrupted
                    "size": req.files.document.size,
                }).then((document) => {
                    res.send(document); // Send back the document after the post
                });
            // the same thing can be done using query (by using query you'have to specify the id <-- need to be changed each time)
            // DB.sequelize.query(`INSERT INTO documents (id, name, extension, description, content, md5, size) VALUES (1, ${req.body.name}, ${req.body.extension}, ${req.body.description}, ${req.files.data}, ${req.files.md5}, ${req.files.size})`)
            //     .then(() => {
            //         DB.sequelize.query(`SELECT * FROM documents WHERE id = 1`)
            //             .then((document) => { res.send(document) });
            //     });
            else
                console.log(`Cannot save the document! ${req.files.name} is corrupted!`);
        })

    router.route('/:id')
        // Get method
        .get((req, res) => {
            // Find just the document with specific id
            // req.params.id is the value of :id of the request
            DB.documents.findOne({
                where: { id: req.params.id }
            }).then((document) => {
                document['is_corrupted'] = !(md5(document.content) == document.md5);
                res.send(document);
            })
            // the same thing can be done using query:
            // DB.sequelize.query(`SELECT * FROM documents WHERE id = ${req.params.id}`).then((document) => {
            //     res.send(document);
            // })

            // INTERPOLATION
            // var x = "Hello";
            // `${x} world!` and (x + "world!") are equal the result in both case is "Hello world!"
        })
        // Put method
        .put((req, res) => {
            DB.documents.update({
                "name": req.body.name // Values to update
            }, {
                where: {
                    id: req.params.id // Update name only to record that has this id
                }
            }).then((document) => { res.send(document); });
            // the same thing can be done using query:
            // DB.sequelize.query(`UPDATE documents SET name = ${req.body.name} WHERE id = ${req.params.id}`)
            //     .then(() => {
            //         DB.sequelize.query(`SELECT * FROM document WHERE id = ${req.params.id}`)
            //         .then((document) => { res.send(document) });
            //     })
        })
        // Delete method
        .delete((req, res) => {
            // Delete document with specific id
            DB.documents.destroy({
                where: { id: req.params.id }
            }).then(() => {
                res.send(`Document deleted!`);
            })
            // the same thing can be done using query:
            // DB.sequelize.query(`DELETE FROM documents WHERE id = ${req.params.id}`)
            //     .then(() => { res.send('Document deleted!'); })
        })

    return router;
}