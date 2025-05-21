import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MessageModel = db.define('messages', {
    title: { 
        type: DataTypes.STRING,
        allowNull: false // Añadir validaciones
    },
    description: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    status: { 
        type: DataTypes.STRING,
        defaultValue: 'active' // Valor por defecto
    },
    fechaInicio: { 
        type: DataTypes.DATE, // Mejor usar DATE para fechas
        allowNull: false
    },
    fechaFin: { 
        type: DataTypes.DATE
    },
    hora_inicio: { 
        type: DataTypes.TIME, // Mejor usar DATE para fechas
    },
    hora_fin: { 
        type: DataTypes.TIME
    },
    unidad_emisora: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Desactiva createdAt y updatedAt
});


export default MessageModel;

