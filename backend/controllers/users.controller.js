const User = require("../models/users.model.js"); 

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Le contenu ne peut pas être vide"
		}); 
	}

	//création de l'utilisateur 
	const user = new User({
		name: req.body.name, 
		email: req.body.email, 
		password: req.body.password, 
		position: req.body.position
	}); 

	//inscription de l'utilisateur dans la base de données : 
	User.create(user, (err, data) => {
		if (err)
		res.status(500).send({
			message: 
			err.message || "Some error occured while creating the user"
		}); 
		else res.send(data); 
	}); 
}; 