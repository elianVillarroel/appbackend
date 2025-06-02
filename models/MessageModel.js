import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MessageModel = db.define('messages', {
    title: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    status: { 
        type: DataTypes.STRING,
        defaultValue: 'active' 
    },
    fechaInicio: { 
        type: DataTypes.DATE, 
        allowNull: false
    },
    fechaFin: { 
        type: DataTypes.DATE
    },
    hora_inicio: { 
        type: DataTypes.TIME, 
    },
    hora_fin: { 
        type: DataTypes.TIME
    },
    unidad_emisora: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    destinatarios_csv: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_url: {
    type: DataTypes.STRING,
    allowNull: true
    }
}, {
    timestamps: false 
});


export default MessageModel;

