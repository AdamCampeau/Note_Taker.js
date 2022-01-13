const notes = require("./db/db.json");
const path = require("path");
const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));


app.get("/api/notes", (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data))
    })
});


app.post("/api/notes", (req, res) => {
    var newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
   fs.readFile('db/db.json', 'utf-8', (err, data) => {
       var currentNotes = JSON.parse(data)
       currentNotes.push(newNote)
       fs.writeFile('./db/db.json', JSON.stringify(currentNotes), err => {
           err ? console.log(err) : console.log("Saved Note");
       })
       res.sendFile(path.join(__dirname, "/public/notes.html"));
   })

});

app.delete("/api/notes/:id", (req, res) => {
    
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});