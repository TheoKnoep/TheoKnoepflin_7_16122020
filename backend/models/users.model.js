const sql = require("./db.js"); 

//constructor 
const User = function(user) {
	this.name = user.name;
	this.email = user.email; 
	this.password = user.password;
	this.position = user.position;
	this.profile_picture = user.profile_picture;
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
	});
}

User.findById = (userId, result) => {
	sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
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
	});
}

User.update = (userId, updatedUser, result) => {
	sql.query(`UPDATE users SET ? WHERE users.id = ${userId};`, updatedUser, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		} 

		console.log(res); 
		result(null, {...updatedUser});
	}); 
}; 

module.exports = User; 