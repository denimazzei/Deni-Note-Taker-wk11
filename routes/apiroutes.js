const uuid = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');
const path = require('path');
const notes = require('express').Router();



    // GET Route for retrieving all the notes and sending result to browser
    notes.get('/', (req, res) =>{
        readFromFile('.db/db.json').then((data)=>
        res.json(JSON.parse(data)));
    });

    notes.post('/', (req, res) => {
        console.log(req.body);

        const { title, text} = req.body;
        if (req.body) {
            const note = {
                title,
                text,
                id: uuid(),
            };

            readAndAppend(note, './db/db.json');
            res.json('Note added!');
        }else {
            res.error("error with note!");
        }
    });



    // DELETE Route for removing a note

notes.delete("/api/notes/:id", (req, res) => {
    try {
        notes = fs.readFile("/db/db.json", "utf8");
        notes = JSON.parse(notes);
        notes = notes.filter(function(noteData) {
            return noteData.id !== req.params.id;
        });
        notes = JSON.stringify(notes);
        fs.writeFile("/db/db.json", notes, "utf8", (err) => {
            if (err) throw err;
        });
        res.send(JSON.parse(notes));
    }   catch (err) {
        throw err;
    }
});

module.exports = notes;