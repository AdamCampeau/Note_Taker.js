const notes = require("../db/db.json");
const path = require("path");

module.exports = function(app) {
    
    app.get("/api/notes/", (req,res) => {
        res.json(notes);
    });

    
    app.post("/api/notes/", (req,res) => {
        notes.push(req.body);
        res.json(true);
    });

    app.get("/notes", function(req,res) {
        res.sendFile(path.join(__dirname, "/notes.html"));
    });

    app.get("*", function(req,res) {
        res.sendFile(path.join(__dirname, "/index.html"));
    });

} 

module.exports = function(app) {
    
} 