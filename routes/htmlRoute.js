const express = require("express");
const router = express.Router();
const path = require("path");


// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)

router.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});


router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});



module.exports = router;