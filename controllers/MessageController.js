import MessageModel from "../models/MessageModel.js";

//** Métodos para el CRUD */

// Mostrar todos los registros
export const getAllMessage = async (req, res) => {
    try {
        const message = await MessageModel.findAll();
        res.json(message);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getMessage = async (req, res) => {
    try {
        const message = await MessageModel.findAll({
            where: { id: req.params.id }
        });
        res.json(message[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createMessage = async (req, res) => {
    try {
        await MessageModel.create(req.body);
        res.json({
            "message": "¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateMessage = async (req, res) => {
    try {
        await MessageModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar registro
export const deleteMessage = async (req, res) => {
    try {
        await MessageModel.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};