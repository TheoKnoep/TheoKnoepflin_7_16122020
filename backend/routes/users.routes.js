module.exports = app => {
	const users = require("../controllers/users.controller.js"); 

	app.post("/users/signup", users.create); 
	app.post("/users/login", users.login); 
}; 