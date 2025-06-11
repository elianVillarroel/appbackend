import MessageModel from "../models/MessageModel.js";

export const getAllMessage = async (req, res) => {
    try {
        const message = await MessageModel.findAll();
        res.json(message);
    } catch (error) {
        res.json({ message: error.message });
    }
};

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