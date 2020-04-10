const express = require("express");
const router = express.Router();



const { v1: uuidv1 } = require('uuid');

const fs = require("fs");
const util = require("util");
const database = "db/db.json";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


router.get("/api/notes", async function(req, res) {
    try {
        const data = await readFileAsync(database, "utf8");

        res.json(JSON.parse(data))
    } catch {
        console.log(err)
    }

});

router.post("/api/notes", async function(req, res) {
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

router.delete("/api/notes/:id", async function(req, res) {
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




module.exports = router;