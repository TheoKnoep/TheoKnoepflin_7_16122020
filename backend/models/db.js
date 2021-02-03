const mysql = require("mysql"); 
const dbConfig = require("../config/db-config.js"); 

//Connexion avec la base de données : 
const connection = mysql.createConnection({
	host: dbConfig.HOST, 
	user: dbConfig.USER, 
	password: dbConfig.PASSWORD, 
	database: dbConfig.DB,
	charset: 'utf8mb4'
}); 

//Ouverture de la connexion à MySQL : 
connection.connect(error => {
	if (error) throw error; 
	console.log("Successful connection to the database")
}); 

module.exports = connection;  