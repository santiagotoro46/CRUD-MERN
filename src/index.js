import app from './app.js';
import { connectDB } from './db.js';

// conectar base de datos
connectDB();


app.listen(5000, ()=> console.log("Server on port 5000"))



