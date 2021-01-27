module.exports = app => {
	const users = require("../controllers/users.controller.js"); 
	const multer = require("../middlewares/multer-config"); 
	const auth = require("../middlewares/auth"); 

	app.post("/users/signup", multer, users.create); 
	app.post("/users/login", users.login); 
	app.get("/users/:id", /* auth, */ users.findOne); 
	app.put("/users/:id", multer, users.updateOne); 
	app.delete("/users/:id", auth, users.deleteOne); 
	app.get("/user/current", auth, users.getUser); 
}; 