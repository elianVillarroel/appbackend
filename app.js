import express from "express";
import cors from "cors";
import db from "./database/db.js";
import messageRoutes from './routes/MessageRoutes.js';
import unidadRoutes from './routes/UnidadRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/messages', messageRoutes);
app.use('/unidades', unidadRoutes);
app.use('/auth', authRoutes);

db.authenticate()
  .then(() => {
    console.log('Conexión a DB exitosa');
    return db.sync({ force: false });
  })
  .then(() => {
    app.listen(8000, () => {
      console.log('Servidor en http://localhost:8000');
    });
  })
  .catch(error => console.error('Error:', error));

app.get('/', (req, res) => res.send('API funcionando'));