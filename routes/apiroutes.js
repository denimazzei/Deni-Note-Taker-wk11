const uuid = require('uuid');
const fs = require('fs');
const path = require('path');


module.exports = app => {
    // GET Route for retrieving all the notes and sending result to browser
    app.get('api/notes', (req, res) => {
        try {
            notes = res.readFileSync("/db/db.json", "utf8");
            notes = JSON.parse(notes);
        }  catch (err) {
            console.log(err);
        }  
        res.json(notes);

        });


    //return notes as parsed json
    app.post('/api/notes', (req, res) => {
        try {
            notes = fs.readFileSync("/db/db.json", "utf8");
            console.log(notes);
            notes = JSON.parse(notes);
            req.body.id = notes.length;
            notes.push(req.body);
            notes = JSON.stringify(notes);
            fs.writeFile("/db/db.json", notes, "utf8", (err) => {
                if (err) throw err;
            });
        res.json(JSON.parse(notes));    
        }  catch (err) {
        console.log(err);
        }
    });

    // DELETE Route for removing a note

app.delete("/api/notes/:id", (req, res) => {
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
}