const sql = require("./db.js"); 

//constructor : 
const Comment = function(comment){
	this.content = comment.content; 
	this.post_id = comment.post_id;
	this.comment_author_id = comment.comment_author_id; 
}; 

Comment.createComment = (newComment, result) => {
	sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		}

		result(null, { id: res.insertId, ...newComment }); 
	}); 
}; 

Comment.findAllCommentsOfOnePost = (commentsPostId, result) => {
	sql.query(`
			SELECT 
				comments.content, comments.comment_date, users.name
			FROM 
				comments
			INNER JOIN 
				users ON users.id = comments.comment_author_id
			WHERE 
				post_id = ${commentsPostId} 
			ORDER BY 
				comment_date ASC`, 
			(err, res) => {
				if (err) {
					console.log("error: ", err); 
					result(err, null); 
					return; 
				}

				if (res.length) {
					result(null, res); 
					console.log("getAll res = "); 
					console.log(res); 
					return; 
				}

		result({ kind: "not_found" }, null); 
	});
}; 

Comment.deleteOne = (commentId, result) => {
	sql.query( 'DELETE FROM `comments` WHERE `comments`.`id` = ' + commentId, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return;
		} 
		result(null, res); 
	}); 
}; 

module.exports = Comment; 