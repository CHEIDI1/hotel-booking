import Room from '../models/Room.js'

export async function seedRooms() {
  if (await Room.exists({})) return
  await Room.insertMany([
    { name: 'Single Room', price: 30000, capacity: 1, image: '/rooms/single-room.jpg' },
    { name: 'Double Room', price: 40000, capacity: 2, image: '/rooms/double-room.jpg' },
    { name: 'Twins Room', price: 50000, capacity: 2, image: '/rooms/twin-room.jpg' },
  ])
  console.log('Chambres de démonstration créées')
}
