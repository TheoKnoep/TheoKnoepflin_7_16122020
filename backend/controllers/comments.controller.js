const Comment = require('../models/comments.model.js'); 

exports.createOne = (req, res, next) => {
	const comment = new Comment({
		content: req.body.content, 
		post_id: req.body.post_id,
		comment_author_id: req.body.author_id
	}); 

	Comment.createComment(comment, (err, data) => {
		if (err) {
			res.status(400).json({ error: err})
		} else {
			Comment.getOneCommentById(data.id, (err, data) => {
				if (err) {
					res.status(400).json({ error: err})
				} else 
				res.status(200).json({ response: { ...data }}); 
			})
		}
	});
}

exports.findOne = (req, res, next) => {
	const commentsPostId = req.params.postId; 
	Comment.findAllCommentsOfOnePost(commentsPostId, (err, data) => {
		if (err) {
			res.status(400).json({ error: err})
		} else {
			const tableOfComments = []; 
			for (let i = 0; i < data.length ; i++) {
				tableOfComments.push(data[i]); 
			}
			res.status(200).json({ response: tableOfComments }); 
		}
	}); 
};

exports.deleteOne = (req, res, next) => {
	const commentId = req.params.id; 
	Comment.deleteOne(commentId, (err, data) => {
		if (err) {
			res.status(400).json({ error: err})
		} else {
			res.status(200).json({ message: "Comment deleted"}); 
		}
	});
};

