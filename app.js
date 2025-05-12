// routes/app.js
import express from "express";
import cors from "cors";
import db from "./database/db.js";
import messageRoutes from './routes/MessageRoutes.js';
import unidadRoutes from './routes/UnidadRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/messages', messageRoutes);
app.use('/unidades', unidadRoutes);

// Conexión a la base de datos
db.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la db');
        return db.sync(); // Esto creará ambas tablas si no existen
    })
    .then(() => {
        app.listen(8000, () => {
            console.log('Server UP running in http://localhost:8000');
        });
    })
    .catch(error => {
        console.log(`El error de conexión es: ${error}`);
    });

app.get('/', (req, res) => {
    res.send('Hola mundo');
});