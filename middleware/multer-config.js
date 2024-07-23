const multer = require("multer");

// Authorized file types
const MIME_TYPES = {
	"image/jpg" : "jpg",
	"image/jpeg" : "jpg",
	"image/png" : "png"
};


const storage = multer.diskStorage({
	// Path where we store the files
	destination: (req, file, callback) => {
		// If there isn't any error, we store the file in the folder "images"
		callback(null, "images")
	},
	// Defines the file's name
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];

		// If there isn't any error, the file will have the name in arg 2
		callback(null, name + Date.now() + "." + extension);
	}
});


// Multer is configured with the informations about the path and the file
// It concerns a single file of type "image"
module.exports = multer({ storage }).single("image");