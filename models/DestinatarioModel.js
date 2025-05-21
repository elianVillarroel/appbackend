import db from "../database/db.js";
import { DataTypes } from "sequelize";

const DestinatarioModel = db.define('destinatarios', {
    nombre: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

export default DestinatarioModel;