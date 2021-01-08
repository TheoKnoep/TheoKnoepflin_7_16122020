const sql = require("./db.js"); 

//constructor 
const Post = function(post) {
	this.title = post.title;
	this.date = post.date; 
	this.content = post.content; 
	this.media = post.media; 
	this.author = post.author; 
}; 








module.exports = Post; 