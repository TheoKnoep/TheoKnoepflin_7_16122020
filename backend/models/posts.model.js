const sql = require("./db.js"); 

//constructor 
const Post = function(post) {
	this.title = post.title;
	this.date = post.date; 
	this.content = post.content; 
	this.media = post.media; 
	this.author_id = post.author_id; 
}; 










module.exports = Post; 