const Post = require("../models/posts.model.js"); 


exports.findAll = (req, res, next) => {
	res.json({ message: "OK findAll" }); 
}; 

exports.findOne = (req, res, next) => {
	res.json({ message: "OK findOne" }); 
}; 

exports.createOne = (req, res, next) => { 
	/*
	const post = new Post({
		title = req.body.title,
		date = Date.now(),
		content = req.body.content,
		media = req.body.media, 
		author_id = req.body.author
	}); */
	res.status(200).json({ body: {...req.body } }); //pourquoi renvoie un body vide {} ??
}; 

exports.updateOne = (req, res, next) => {
	res.json({ message: "OK updateOne" }); 
}; 

exports.deleteOne = (req, res, next) => {
	res.json({ message: "OK deleteOne" }); 
}; 