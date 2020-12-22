const sql = require("./db.js"); 

//constructor 
const User = function(user) {
	this.name = user.name;
	this.email = user.email; 
	this.password = user.password;
	this.position = user.position;
}; 

User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		}

		console.log("Nouvel utilisateur créé : ", {id: res.insertId, ...newUser }); 
		result(null, { id: res.insertId, ...newUser }); 
	}); 
}; 

User.findOne = (userEmail, result) => {
	sql.query(`SELECT * FROM users WHERE email = "${userEmail}"`, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		}

		if (res.length) {
			console.log("Found user : ", res[0]); 
			result(null, res[0]); 
			return; 
		}

		result({ kind: "not_found" }, null); 
	})
}

module.exports = User; 