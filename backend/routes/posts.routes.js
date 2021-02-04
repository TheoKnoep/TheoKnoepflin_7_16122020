module.exports = app => {
	const posts = require("../controllers/posts.controller.js"); 
	const multer = require("../middlewares/multer-config"); 
	const auth = require("../middlewares/auth"); 

	app.get("/posts", auth, posts.findAll);
	app.get("/posts/:id", auth, posts.findOne); 
	app.post("/posts/", auth, multer, posts.createOne);  
	app.put("/posts/:id", multer, posts.updateOne); 
	app.delete("/posts/:id", auth, posts.deleteOne); 
}; 