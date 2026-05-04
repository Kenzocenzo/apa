var express = require("express");
var app = express();
const PORT = process.env.port || 3000;
var path = require("path");
const fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.static(__dirname + "/static"));
const database = require("./static/json/data.json");

const bodyParser = require("body-parser");
const { type } = require("express/lib/response");
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/index.html"));
});
app.get("/library", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/library.html"));
});
app.get("/library/:title", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/html/log.html"));
});
app.get("/api/library/:title", (req, res) => {
    const title = req.params.title;

    const entry = database.find((e) => e.id.toLowerCase() === title.toLowerCase());

    if (!entry) {
        return res.status(404).json({ error: "Nie znaleziono" });
    }

    res.send(JSON.stringify(entry));
});
app.get("/api/library", function (req, res) {
    let content = database.map((entry) => {
        return { id: entry.id, type: entry.type };
    });
    res.send(JSON.stringify(content));
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});

//module.exports = app;
