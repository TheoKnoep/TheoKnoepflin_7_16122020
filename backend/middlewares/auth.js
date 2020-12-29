const jwt = require("jsonwebtoken"); 

module.exports = (req, res, next) => {
	try{
		const reqHeadersAuthorization = req.headers.authorization; 
		console.log(reqHeadersAuthorization); 
		const token = req.headers.authorization.split(' ')[1]; 
		const clearId = req.headers.authorization.split(' ')[2]; 
		const decodedToken = jwt.verify(token, 'TOKEN_RANDOM_KEY'); 

		console.log('decodedToken = ' + decodedToken.userId);
		console.log('clearId = ' + clearId);

		const userId = decodedToken.userId; 
		if (clearId !== userId) {
			throw 'User ID non valable'; 
		} else {
			next(); 
		}
	} catch (error) {
		res.status(401).json({ error: error + 'bibou' | 'Requête non authentifiée' })
	}
}; 