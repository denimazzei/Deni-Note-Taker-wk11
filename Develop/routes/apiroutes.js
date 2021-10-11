const uuid = require('uuid');
const fs = require('fs');
const path = require('path');



module.exports = app => {
        // GET Route for retrieving all the notes
    const newNote = app.get('/', (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    const allNotes = app.get('/', (_req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    //return notes as parsed json
    app.get('/api/notes', (req, res) => {
        fs.readFromFile(path.join(__dirname, '../db/db.json'), (err,data) => {
            if (error) throw err;
            newNote = JSON.parse(data);
            res.json(notes);
        })
    });


    // POST Route for adding all the notes
    app.post('/api/notes', (req, res) => {
        fs.readFromFile(path.join(__dirname, '../db/db.json'), (err,data) => {
            if (error) throw err;
            newNote = JSON.parse(data);
            const addNote = req.body;
            addNote.id = uuid.v4();
            notes.push(addNote);

            const createNote = JSON.stringify(addNote);
            fs.writeFile(path.join(__dirname, '../db/db/json'), 
            createNote, (err) => {
                if (err) throw err;
            });
            res.json(addNote);

        });
    });
}

