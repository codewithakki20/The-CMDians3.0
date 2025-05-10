import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check for Authorization header if needed

        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated. No token provided.',
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid or expired token',
                    success: false
                });
            }

            // Attach the user ID from the token to the request object
            req.userId = decoded.userId;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error while processing authentication',
            success: false
        });
    }
};

export default isAuthenticated;
