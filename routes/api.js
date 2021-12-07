const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const notes_db = require('../db/db.json');

app = express();

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received get all notes`);

    // Send user the json file
    res.sendFile(path.join(__dirname, '..', 'db/db.json'));
});

app.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
    console.log(req.body);
    //generate id for new note
    const noteId = uuidv4();
    //TODO: Make this async? for better performance
    //take the note add unique id to it and save it to db.json
    let note = req.body;
    note.id = noteId;
    notes_db.push(note); // add note to notes array
    res.json(JSON.stringify(note)); // return the new response to user
    updateNotes_db(); // Update db.json
});

app.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received to remove a note`)
    console.log(`Id: ${req.params.id}`);
    
    let noteFound = false;
    notes_db.forEach((note) => {
        console.log(note.id);
        if (note.id === req.params.id)
        {
            const index = notes_db.indexOf(note);
            notes_db.splice(index, 1);
            noteFound = true;
            return;
        }
    })
    if (!noteFound) { console.log(`No note matching note with id: ${req.params.id} could be found`); }
    else { console.log(`Note with id ${req.params.id} was removed`); updateNotes_db(); }
});

//TODO: Make this async? for better performance when files are huge
function updateNotes_db(){
    fs.writeFile(path.join(__dirname, '..', 'db/db.json'), JSON.stringify(notes_db), err => {
        if (err) {
            console.error(err);
            return
        }
        console.log("Wrote to file successfully.");
    })
}

module.exports = app;