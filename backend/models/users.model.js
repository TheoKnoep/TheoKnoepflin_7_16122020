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

	/*
	sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		
		console.log("created customer: ", { id: res.insertId, ...newCustomer });
		result(null, { id: res.insertId, ...newCustomer });
	});
	*/
}; 

module.exports = User; 