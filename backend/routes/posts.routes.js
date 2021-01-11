module.exports = app => {
	const posts = require("../controllers/posts.controller.js"); 
	const multer = require("../middlewares/multer-config"); 
	const auth = require("../middlewares/auth"); 

	app.get("/posts", posts.findAll);
	app.get("/posts/:id", posts.findOne); 
	app.post("/posts/", multer, posts.createOne);  
	app.put("/posts/:id", multer, posts.updateOne); 
	app.delete("/posts/:id", posts.deleteOne); 
}; 