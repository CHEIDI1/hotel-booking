import 'dotenv/config'
import app from './app.js'
import { connectDatabase } from './config/database.js'
import { seedRooms } from './config/seedRooms.js'
const port = process.env.PORT || 3001
connectDatabase().then(seedRooms).then(() => app.listen(port, () => console.log(`API MVC démarrée sur le port ${port}`))).catch(error => { console.error('Impossible de démarrer l’API :', error.message); process.exit(1) })
