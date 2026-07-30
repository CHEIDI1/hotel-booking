import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const publicUser = user => ({ id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt })
const tokenFor = user => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
export async function register(req, res, next) { try { const { name, email, password } = req.body; if (!name || !email || !password || password.length < 6) return res.status(400).json({ error: 'Nom, email et mot de passe de 6 caractères minimum requis.' }); const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) }); return res.status(201).json({ user: publicUser(user), token: tokenFor(user) }) } catch (error) { return next(error) } }
export async function login(req, res, next) { try { const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() }).select('+password'); if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ error: 'Email ou mot de passe incorrect.' }); return res.json({ user: publicUser(user), token: tokenFor(user) }) } catch (error) { return next(error) } }
