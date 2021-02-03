const Post = require("../models/posts.model.js"); 
const Comment = require("../models/comments.model.js"); 
const fs = require('fs'); 

exports.findAll = (req, res, next) => {
	Post.getAll( (err, postsData) => {
		if(err) {
			res.status(400).json({ "error": err }); 
		} else {
			Comment.getAllComments((err, commentsData) => {
				if (err) {
					res.status(400).json({ "error": err }); 
				} else {
					for (let i in postsData) {
						postsData[i].comments = []; 
					}
					for (let i in commentsData) {
						const linkedPost = commentsData[i].post_id; 
						const indexOfThePost = postsData.findIndex((element) => element.id === linkedPost);
						postsData[indexOfThePost].comments.push(commentsData[i]); 
					}
					res.status(200).json(postsData); 
				}
			});
		}
	});
}; 

exports.findOne = (req, res, next) => {
	Post.getOne(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Post with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Post with id " + req.params.customerId
				});
			}
		} else res.status(200).send(data);
	}); 
}; 

exports.createOne = (req, res, next) => { 
	if (!req.file) {
		imageUrl = null; 
	} else {
		imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
	}
	const post = new Post({
		title: req.body.title, 
		content: req.body.content, 
		media: imageUrl, 
		author_id: req.body.author_id
	}); 

	Post.createPost(post, (err, data) => {
		res.status(200).json({ response: { ...data }}); 
	}); 
}; 

exports.updateOne = (req, res, next) => {
	Post.getOne(req.params.id, (err, data) => {
		const updatedPost = { ...req.body }; 
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Post with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Post with id " + req.params.customerId
				});
			}
		} 

		if (req.file) {
			const oldImageUrl = data.media; 
			updatedPost.media = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
			
			//supprimer l'image existante : 
			const imageToDelateName = oldImageUrl.split("/images/")[1]; 
			fs.unlink(`images/${imageToDelateName}`, () => {}); 
		}
		
		Post.updateOne(req.params.id, updatedPost, (err, data) => { 
			if (err) 
			res.status(500).send({ 
				message: err.message || "Some error occured while updating the post"
			}); 
			else res.status(201).send(data); 
		}); 
	}); 
}; 

exports.deleteOne = (req, res, next) => {
	Post.getOne(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Post with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({ message: "Error retrieving Post with id " + req.params.customerId });
			}
		} else {
			const imageToDelete = data.media.split("/images/")[1]; 
			fs.unlink(`images/${imageToDelete}`, () => {}); 
		
			Post.deleteOne(req.params.id, (err, data) => { 
				if (err) {
					if (err.kind === "not_found") {
						res.status(404).send({
							message: `Not found Post with id ${req.params.id}.`
						});
					} else {
						res.status(500).send({
							message: "Error retrieving Post with id " + req.params.customerId
						});
					} 
				} else { 
					res.status(200).send(data); 
				}
			});
		};
	});
};