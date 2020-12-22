const User = require("../models/users.model.js"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

exports.create = (req, res, next) => {
	if (!req.body) {
		res.status(400).send({
			message: "Le contenu ne peut pas être vide"
		}); 
	}

	//hashage du mot de passe + enregistrement utilisadeur dans la DB : 
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				name: req.body.name, 
				email: req.body.email, 
				password: hash, 
				position: req.body.position
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
		.catch(error => res.status(502).json({ error }));  
}; 

exports.login = (req, res, next) => {
	User.findOne(req.body.email, (err, data) => {
		if (!data) {
			console.log("L'utilisateur n'existe pas");
			res.status(404).json({ message: "L'utilisateur n'existe pas" }); 
		} else {
			console.log(`Le mot de passe : ${data.password} / id = ${data.id}`); 
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