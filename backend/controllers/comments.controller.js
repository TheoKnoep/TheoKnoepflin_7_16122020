const Comment = require('../models/comments.model.js'); 

exports.createOne = (req, res, next) => {
	const comment = new Comment({
		content: req.body.content, 
		post_id: req.body.post_id,
		comment_author_id: req.body.author_id
	}); 

	console.log(comment); 

	comment.comment_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');     // delete the dot and everything after

	Comment.createComment(comment, (err, data) => {
		if (err) {
			res.status(400).json({ error: err})
		} else {
			res.status(200).json({ response: { ...data }}); 
		}
	});
}

exports.findOne = (req, res, next) => {
	const commentsPostId = req.params.id; 
	Comment.findAllCommentsOfOnePost(commentsPostId, (err, data) => {
		res.status(200).json({ response: { ...data }}); 
	}); 
};

exports.deleteOne = (req, res, next) => {
	const commentId = req.params.id; 
	Comment.deleteOne(commentId, (err, data) => {
		res.status(200).json({ message: "Comment deleted"}); 
	});
};

