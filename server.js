// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");
const { dirname } = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/assets"));




// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/assets/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/assets/notes.html"));
});

// Displays all characters
app.get("/api/notes", function (req, res) {
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    res.send(data)
  });

});
app.post('/api/notes', function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved ", newNote);
  res.json(savedNotes);


})

app.delete("/api/notes/:id", function (req, res) {
  let noteId = req.params.id;
  let newId = 0;
  console.log(`Deleting note with id ${noteId}`);
  data = data.filter(currentNote => {
    return currentNote.id != noteId;
  });
  for (currentNote of data) {
    currentNote.id = newId.toString();
    newId++;
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.json(data);
});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
