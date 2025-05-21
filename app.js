import express from "express";
import cors from "cors";
import db from "./database/db.js"; // Solo importa db
import messageRoutes from './routes/MessageRoutes.js';
import unidadRoutes from './routes/UnidadRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/messages', messageRoutes);
app.use('/unidades', unidadRoutes);


// Conexión y sincronización (versión simplificada)
db.authenticate()
  .then(() => {
    console.log('Conexión a DB exitosa');
    return db.sync({ force: false }); // Sincroniza TODOS los modelos
  })
  .then(() => {
    app.listen(8000, () => {
      console.log('Servidor en http://localhost:8000');
    });
  })
  .catch(error => console.error('Error:', error));

app.get('/', (req, res) => res.send('API funcionando'));