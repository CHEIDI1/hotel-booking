import mongoose from 'mongoose'
const roomSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, price: { type: Number, required: true, min: 0 }, capacity: { type: Number, required: true, min: 1 }, image: { type: String, default: '' }, active: { type: Boolean, default: true } }, { timestamps: true })
export default mongoose.model('Room', roomSchema)
