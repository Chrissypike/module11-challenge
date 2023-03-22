//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//gets the notes from db.json inside the db folder
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

//adds the note to db.json inside the db folder
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const postNote = req.body;
    newNotes.id = uuid.v4();
    notes.push(postNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

//calls index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//calls notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//function to start the Port
app.listen(PORT, function () {
    console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT}`);
});