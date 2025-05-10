import jwt from 'jsonwebtoken';

const requireLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Adjust for token in cookies or headers
    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated',
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid token',
        success: false,
      });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({
      message: 'Invalid token',
      success: false,
    });
  }
};
export default requireLogin;