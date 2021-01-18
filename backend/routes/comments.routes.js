module.exports = app => {
	const comments = require("../controllers/comments.controller.js"); 
	const auth = require("../middlewares/auth"); 

	app.post("/comments", comments.createOne); 
	app.get("/comments/:postId", comments.findOne); 
	app.delete("/comments/:id", comments.deleteOne); 
}; 