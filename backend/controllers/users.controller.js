const User = require("../models/users.model.js"); 
const bcrypt = require('bcrypt'); 

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Le contenu ne peut pas être vide"
		}); 
	}

	//hashage du mot de passe : 
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