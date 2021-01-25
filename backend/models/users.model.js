const sql = require("./db.js"); 

//constructor 
const User = function(user) {
	this.name = user.name;
	this.email = user.email; 
	this.password = user.password;
	this.position = user.position;
	this.profile_picture = user.profile_picture;
	this.is_admin = user.is_admin; 
}; 

User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return; 
		}
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
		result(null, {...updatedUser});
	}); 
}; 

User.deleteOne = (userId, result) => {
	sql.query( 'DELETE FROM `users` WHERE `users`.`id` = ' + userId, (err, res) => {
		if (err) {
			console.log("error: ", err); 
			result(err, null); 
			return;
		} 
		result(null, res); 
	}); 
}; 

module.exports = User; 