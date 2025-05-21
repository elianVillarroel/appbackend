import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MensajeDestinatarioModel = db.define('mensaje_destinatario', {
    mensaje_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    destinatario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'mensaje_destinatario'
});

export default MensajeDestinatarioModel;