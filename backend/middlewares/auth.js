const jwt = require("jsonwebtoken"); 

module.exports = (req, res, next) => {
	try{
		console.log(req.headers.authorization); 
		const token = req.headers.authorization.split(' ')[1]; 
		const clearId = req.headers.authorization.split(' ')[2]; 
		const decodedToken = jwt.verify(token, 'TOKEN_RANDOM_KEY'); 
		console.log(decodedToken); 
		const userId = decodedToken.userId; 
		console.log(userId); 
		console.log(clearId); 
		if (userId && clearId != userId) {
			throw 'User ID non valable'; 
		} else {
			next(); 
		}
	} catch (error) {
		res.status(401).json({ error: error + 'bibou' | 'Requête non authentifiée' })
	}
}; 