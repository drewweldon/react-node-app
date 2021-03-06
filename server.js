/**
 * REST Server for Application
 */
var express = require("express");

var bodyParser = require("body-parser"); // <- needed to use request body

var app = express();

app.use(bodyParser.json());

var data = []; // This will hold the necessary data for appointments such as time, name and number

app.listen(8080, function () {

    var id = 1;

    // Populate array with available times for initial run of application
    for (var i = 9; i < 17; i++) { // start from 0900 hours to 1700 hours
        var startTime = i;
        var endTime = i + 1;
        if (i % 12 > 0) {
            startTime = i % 12;
        }
        if (endTime % 12 > 0) { //
            endTime %= 12;
        }
        var appointment = {
            id: id++,
            time: startTime + ":00 - " + endTime + ":00", // time of individual appointment
            name: "", // name is blank by default
            number: "" // number is blank by default
        };
        data.push(appointment); // add appointment to data
    }

    console.log("Server running on Port: 8080");
});

app.get("/", function (req, res) {
    res.sendfile("static/index.html");
});

app.get("/js/main.js", function (req, res) {
    res.sendfile("static/js/main.js");
});

app.get("/api/appointments", function (req, res) {
    res.json(data);
});

app.get("/api/appointments/:id", function (req, res) {

    // Iterate through data to find sqecific appointment by ID
    data.forEach(function (element) {
        if (element.id === Number(req.params.id)) {
            res.json(element);
        }
    });
});

app.put("/api/appointments/:id", function (req, res) {

    // Find the appointment by id
    data.forEach(function (element) {

        // Once the element is found, modify the appointment
        if (element.id === Number(req.params.id)) {
            element.name = req.body.name;
            element.number = req.body.number;
        }
    });

    res.json(data);
});

