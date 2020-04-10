// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

/*const express = require("express");
//const router = express.Router();
//const express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);
// const htmlRoutes = require("./routes/htmlRoute");
// app.use(htmlRoute);
// //DATA ROUTES
// const apiRoutes = require("./routes/apiRoute");
// app.use("/api", apiRoute);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});*/
const { v1: uuidv1 } = require('uuid');



var path = require("path");

var express = require("express");

const fs = require("fs");

const util = require("util");

const database = "db/db.json"

var app = express();

var PORT = process.env.PORT || 3000;

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);





app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());






app.get("/api/notes", async function(req, res) {

    try {



        const data = await readFileAsync(database, "utf8");

        res.json(JSON.parse(data))



    } catch {

        console.log(err)

    }

});





app.post("/api/notes", async function(req, res) {

    try {

        let note = req.body;

        let data = await readFileAsync(database, "utf8");

        let noteArr = JSON.parse(data);



        note.id = uuidv1();



        noteArr.push(note)



        let strArr = JSON.stringify(noteArr, null, 4)



        await writeFileAsync(database, strArr);

        res.json(note)











    } catch {

        console.log("error")

    }



});







app.delete("/api/notes/:id", async function(req, res) {

    try {



        let data = await readFileAsync(database, "utf8");



        let noteID = req.params.id

        let noteArr = JSON.parse(data)



        for (let i = 0; i < noteArr.length; i++) {

            if (noteArr[i].id === noteID) {

                noteArr.splice(i, 1);

            }

        }





        let strArr = JSON.stringify(noteArr, null, 4)



        await writeFileAsync(database, strArr);

        res.json({ ok: true })



    } catch {

        console.log("error")

    }

});





app.get("/notes", function(req, res) {

    res.sendFile(path.join(__dirname, "/notes.html"));

});





app.get("*", function(req, res) {

    res.sendFile(path.join(__dirname, "/index.html"));

});







app.listen(PORT, function() {

    console.log("App listening on PORT: " + PORT);

});