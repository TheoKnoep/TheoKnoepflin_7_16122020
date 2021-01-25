const jwt = require("jsonwebtoken"); 

module.exports = (req, res, next) => {
	try{
		console.log(req.headers.authorization); 
		const token = req.headers.authorization.split(' ')[1]; 
		const clearId = req.headers.authorization.split(' ')[2]; 
		const decodedToken = jwt.verify(token, 'TOKEN_RANDOM_KEY'); 
		console.log(decodedToken); 
		const userId = decodedToken.userId; 
		const isAdmin = decodedToken.isAdmin; 
		console.log(userId); 
		console.log(isAdmin); 
		if (userId && clearId != userId) {
			throw 'User ID non valable'; 
		} else {
			//req.body.userId = userId; 
			req.body.isAdmin = isAdmin === 1 ? true : false; 
			next(); 
		} 
	} catch (error) {
		res.status(401).json({ error: error | 'Requête non authentifiée' })
	}
}; 