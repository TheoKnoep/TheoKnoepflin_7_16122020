const Post = require("../models/posts.model.js"); 
const fs = require('fs'); 

exports.findAll = (req, res, next) => {
	Post.getAll( (err, data) => {
		if(err) {
			res.status(400).json({ "error": err }); 
		} else {
			res.status(200).json(data); 
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
		console.log("La requête n'a pas d'image"); 
	} else {
		console.log(req.file); 
		imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
	}
	const post = new Post({
		title: req.body.title, 
		publication_date: Math.floor(Date.now()/1000), 
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
		} else {
			console.log(data); 
			console.log(updatedPost); 
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
			console.log(imageToDelete); 
			fs.unlink(`images/${imageToDelete}`, () => {}); 

			console.log("coucou"); 
			
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