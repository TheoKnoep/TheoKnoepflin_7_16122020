module.exports = app => {
	const posts = require("../controllers/posts.controller.js"); 
	const multer = require("../middlewares/multer-config"); 
	const auth = require("../middlewares/auth"); 

	app.get("/posts", posts.findAll);
	app.get("/posts/:id", posts.findOne); 
	app.post("/posts/", posts.createOne);  
	app.put("/posts/:id", posts.updateOne); 
	app.delete("/posts/:id", posts.deleteOne); 
}; 