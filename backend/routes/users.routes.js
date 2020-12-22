module.exports = app => {
	const users = require("../controllers/users.controller.js"); 

	app.post("/users", users.create); 
}; 