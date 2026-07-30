import jwt from 'jsonwebtoken'
export function authenticate(req, res, next) { const token = req.headers.authorization?.replace('Bearer ', ''); if (!token) return res.status(401).json({ error: 'Authentification requise.' }); try { req.user = jwt.verify(token, process.env.JWT_SECRET); return next() } catch { return res.status(401).json({ error: 'Session invalide ou expirée.' }) } }
export function authorize(...roles) { return (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ error: 'Accès interdit.' }) }
