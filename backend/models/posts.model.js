const sql = require("./db.js"); 

//constructor 
const Post = function(post) {
	this.title = post.title;
	this.content = post.content; 
	this.media = post.media; 
	this.alt_tag = post.alt_tag;
	this.author_id = post.author_id; 
}; 

Post.createPost = (newPost, result) => {
	sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		}

		result(null, { id: res.insertId, ...newPost }); 
	}); 
}; 

Post.getAll = (result) => {
	sql.query(`
			SELECT 
				posts.id, posts.title, posts.publication_date, posts.content, posts.media, posts.alt_tag, posts.author_id, users.name, users.profile_picture 
			FROM 
				posts 
			INNER JOIN 
				users ON users.id = posts.author_id 
			ORDER BY 
				publication_date DESC`, 
			(err, res) => {
				if (err) {
					console.log("error: ", err); 
					result(err, null); 
					return; 
				}

				if (res.length) {
					result(null, res); 
					return; 
				}

		result({ kind: "not_found" }, null); 
	});

}; 

Post.getOne = (postId, result) => {
	sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		}

		if (res.length) {
			console.log("Found post : ", res[0]); 
			result(null, res[0]); 
			return; 
		}

		result({ kind: "not_found" }, null); 
	});
}; 

Post.updateOne = (postId, updatedPost, result) => {
	sql.query(`UPDATE posts SET ? WHERE posts.id = ${postId};`, updatedPost, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		} 
		result(null, {...updatedPost});
	}); 
}; 

Post.deleteOne = (postId, result) => {
	sql.query( 'DELETE FROM `posts` WHERE `posts`.`id` = ' + postId, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return;
		} 
		result(null, res); 
	}); 
}; 

module.exports = Post; 