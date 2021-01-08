const express = require("express"); 
const bodyParser = require("body-parser"); 

const path = require('path'); 
/* const { nextTick } = require("process"); */

const app = express(); 

app.use((req, res, next) => { //Déclaration des headers CORS 
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
	res.json("Bienvenue sur l'API REST du réseau social de Groupomania"); 
}); 

app.use('/images', express.static(path.join(__dirname, 'images' ))); 



require("./routes/users.routes.js")(app); 
require("./routes/posts.routes.js")(app); 


//set port, listen for requests
app.listen(3000, () => {
	console.log("Server is running on port 3000"); 
});