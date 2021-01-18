module.exports = app => {
	const comments = require("../controllers/comments.controller.js"); 
	const auth = require("../middlewares/auth"); 

	app.post("/comments", comments.createOne); 
	app.get("/comments/:id", comments.findOne); 
	app.delete("/comments/:id", comments.deleteOne); 
}; 