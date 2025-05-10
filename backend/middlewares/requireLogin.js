import jwt from "jsonwebtoken";

const requireLogin = (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // In case token is sent via Authorization header as Bearer <token>

        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }

        // Attach user info to request
        req.user = { id: decoded.userId };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error while verifying token',
            success: false
        });
    }
};

export default requireLogin;
