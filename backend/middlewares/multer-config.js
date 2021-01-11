const multer = require('multer'); 

const MIME_TYPES = {
	'image/jpg': 'jpg', 
	'image/jpeg': 'jpg', 
	'image/png': 'png', 
	'image/gif': 'gif'
}; 

const storage = multer.diskStorage({ //objet de configuration pour Multer, avec la fonction diskStorage, qui prend 2 arguments : destination + filename 
	destination: (req, file, callback) => {
		callback(null, 'images') //on indique que les images doivent être stockées dans le dossier 'images'
	}, 
	filename: (req, file, callback) => {
		const fileName = file.originalname.split(/\s|\./).join('_'); 
		const extension = MIME_TYPES[file.mimetype]; 
		const name = fileName + '_' + Date.now() + '.' + extension; 
		callback(null, name); 
	}
}); 

module.exports = multer({ storage }).single('image'); 