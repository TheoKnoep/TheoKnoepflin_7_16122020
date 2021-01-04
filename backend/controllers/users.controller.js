const User = require("../models/users.model.js"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
//const { update } = require("../models/users.model.js"); //à quoi sert cette ligne ?
const fs = require("fs"); 

exports.create = (req, res, next) => {
	console.log(req.body); 
	if (!req.body) {
		res.status(400).send({
			message: "Le contenu ne peut pas être vide"
		}); 
	} 
	let profilePictureUrl = ""; 
	if (!req.file) {
		console.log("La requête n'a pas d'image"); 
	} else {
		console.log(req.file); 
		profilePictureUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
	}
	//hashage du mot de passe + enregistrement utilisadeur dans la DB : 
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				name: req.body.name, 
				email: req.body.email, 
				password: hash, 
				position: req.body.position ? req.body.position : "",
				profile_picture: profilePictureUrl
			}); 
			User.create(user, (err, data) => {
				if (err)
				res.status(500).send({ 
					message: 
					err.message || "Some error occured while creating the user"
				}); 
				else res.status(201).send(data); 
			}); 
		})
		.catch(error => res.status(502).json({ "error kakolac": error }));  
}; 

exports.login = (req, res, next) => {
	User.findOne(req.body.email, (err, data) => {
		if (!data) {
			console.log("L'utilisateur n'existe pas");
			res.status(404).json({ message: "L'utilisateur n'existe pas" }); 
		} else {
			console.log(`Le mot de passe : ${data.password} / id utilisateur = ${data.id}`); 
			bcrypt.compare(req.body.password, data.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({error: "Mot de passe incorrect" }); 
					}
					res.status(200).json({
						userId: data.id, 
						token: jwt.sign(
							{ userId: data.id }, 
							'TOKEN_RANDOM_KEY', 
							{expiresIn: '24h'}
						)
					}); 
				})
				.catch(error => res.status(500).json({ error })); 
		}
	}); 
}; 

exports.findOne = (req, res, next) => {
	User.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Customer with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Customer with id " + req.params.customerId
				});
			}
		} else res.status(200).send(data);

	}); 
}; 

exports.updateOne = (req, res, next) => {
	const updatedUser = new User({
		name: "name", 
		email: "email", 
		password: "password",
		position: "position",
		profile_picture: ""
	}); 
	User.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Customer with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Customer with id " + req.params.customerId
				});
			}
		} else {
			updatedUser.name = data.name; 
			updatedUser.email = data.email; 
			updatedUser.password = data.password; 
			updatedUser.position = data.position; 
			updatedUser.profile_picture = data.profile_picture; 
		}

		console.log("Utilisateur originel : "); 
		console.log(updatedUser); 
		if (req.body.name) { updatedUser.name = req.body.name }; 
		if (req.body.email) { updatedUser.email = req.body.email }; 
		if (req.body.position) { updatedUser.position = req.body.position } ; 

		if (!req.file) {
			console.log("La requête n'a pas d'image"); 
		} else {
			console.log(req.file); 
			const oldImageUrl = updatedUser.profile_picture; 
			updatedUser.profile_picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
			
			//supprimer l'image existante ici : 
			const imageToDelateName = oldImageUrl.split("/images/")[1]; 
			fs.unlink(`images/${imageToDelateName}`, () => {}); 
		}
		console.log("Utilisateur mis à jour : ");
		console.log(updatedUser); 

		User.update(req.params.id, updatedUser, (err, data) => { 
			if (err) 
			res.status(500).send({ 
				message: 
				err.message || "Some error occured while updating the user"
			}); 
			else res.status(201).send(data); 
		}); 
	}); 
	
}; 