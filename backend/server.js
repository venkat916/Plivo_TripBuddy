const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "Hackathon"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var tripsRouter = require("./routes/trips");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
// wqUr4U5mMQjrn3Mh
mongoose.connect('mongodb+srv://Venkat:wqUr4U5mMQjrn3Mh@plivo.cq5tpuf.mongodb.net/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/trips", tripsRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
