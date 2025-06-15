import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
 const token = req.cookies.token; 
 
  if (!token) return res.status(403).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;