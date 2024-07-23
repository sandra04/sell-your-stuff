const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		// Gets the token
		const token = req.headers.authorization.split(" ")[1];

		// Verifies the token
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);

		// Gets the user id from the token
		const userId = decodedToken.userId;

		// Used for requests with authentication
		req.auth = {
			userId: userId
		};
		next();
	}
	catch(error) {
		res.status(401).json({ error });
	}
};