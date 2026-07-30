import Room from '../models/Room.js'
export async function listRooms(req, res, next) { try { const rooms = await Room.find({ active: true }).sort({ price: 1 }); res.json({ rooms: rooms.map(room => ({ id: room._id, name: room.name, price: room.price, capacity: room.capacity, image: room.image })) }) } catch (error) { next(error) } }
export async function createRoom(req, res, next) { try { res.status(201).json({ room: await Room.create(req.body) }) } catch (error) { next(error) } }
