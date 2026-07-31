import Reservation from '../models/Reservation.js'
import Room from '../models/Room.js'

const view = reservation => ({
  id: reservation._id,
  checkIn: reservation.checkIn,
  checkOut: reservation.checkOut,
  guests: reservation.guests,
  nights: reservation.nights,
  totalPrice: reservation.totalPrice,
  status: reservation.status,
  room: reservation.room
})

export async function listReservations(req, res, next) {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('room', 'name image price')
    res.json({ reservations: reservations.map(view) })
  } catch (error) { next(error) }
}

export async function createReservation(req, res, next) {
  try {
    const { roomId, checkIn, checkOut, guests = 1 } = req.body
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const nights = Math.round((end - start) / 86400000)

    if (!roomId || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || nights < 1) {
      return res.status(400).json({ error: 'Dates de réservation invalides.' })
    }

    const room = await Room.findById(roomId)
    if (!room || !room.active) return res.status(404).json({ error: 'Chambre introuvable.' })
    if (guests > room.capacity) return res.status(400).json({ error: 'Capacité de la chambre dépassée.' })

    const unavailable = await Reservation.exists({
      room: roomId,
      status: 'confirmed',
      checkIn: { $lt: end },
      checkOut: { $gt: start }
    })
    if (unavailable) return res.status(409).json({ error: 'Cette chambre est indisponible à ces dates.' })

    const reservation = await Reservation.create({
      user: req.user.id,
      room: roomId,
      checkIn: start,
      checkOut: end,
      guests,
      nights,
      totalPrice: room.price * nights
    })
    await reservation.populate('room', 'name image price')
    return res.status(201).json({ reservation: view(reservation) })
  } catch (error) { next(error) }
}

export async function cancelReservation(req, res, next) {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id, user: req.user.id }).populate('room', 'name image price')
    if (!reservation) return res.status(404).json({ error: 'Réservation introuvable.' })
    reservation.status = 'cancelled'
    await reservation.save()
    res.json({ reservation: view(reservation) })
  } catch (error) { next(error) }
}

export async function dashboard(req, res, next) {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('room', 'name image price')
    const active = reservations.filter(item => item.status === 'confirmed')
    res.json({
      statistics: {
        reservations: active.length,
        totalNights: active.reduce((sum, item) => sum + item.nights, 0),
        totalSpent: active.reduce((sum, item) => sum + item.totalPrice, 0)
      },
      reservations: reservations.map(view)
    })
  } catch (error) { next(error) }
}

export async function listAllReservations(req, res, next) {
  try {
    const reservations = await Reservation.find()
      .populate('room', 'name image price')
      .populate('user', 'fullName email')
    res.json({
      reservations: reservations.map(r => ({ ...view(r), user: r.user }))
    })
  } catch (error) { next(error) }
}
