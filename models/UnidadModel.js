// models/UnidadModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UnidadModel = db.define('unidades', {
    usuario: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

export default UnidadModel;