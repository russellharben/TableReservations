  // Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Reservations(DATA)
// =============================================================
let currentres= [];

counter = 0;

function Reservation (name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.uniqueId = function(){
        counter++;
        return counter;
    };
  }; 


// Routes
// =============================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/assets/css/styles.css", function(req, res){
  res.sendFile(path.join(__dirname, "assets/css/styles.css"));
});

app.get("/api/tables", function(req, res) {
    return res.json(table);
});

app.get("/api/reserve", function(req, res) {
    return res.json(currentres);
});

app.post("/api/reserve", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = new Reservation (req.body.name, req.body.phone, req.body.email);

    currentres.push(newTable);

    console.log(currentres);
  
    // We then display the JSON to the users
    res.send(true);
  });
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });