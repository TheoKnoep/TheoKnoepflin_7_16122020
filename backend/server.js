const express = require("express"); 
const bodyParser = require("body-parser"); 

const app = express(); 

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
	res.json("Bienvenue sur l'API REST du réseau social de Groupomania"); 
}); 

require("./routes/users.routes.js")(app); 

//set port, listen for requests
app.listen(3000, () => {
	console.log("Server is running on port 3000"); 
});