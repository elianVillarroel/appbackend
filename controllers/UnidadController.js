// controllers/UnidadController.js
import UnidadModel from "../models/UnidadModel.js";

// Métodos CRUD para unidades
export const getAllUnidades = async (req, res) => {
    try {
        const unidades = await UnidadModel.findAll();
        res.json(unidades);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getUnidad = async (req, res) => {
    try {
        const unidad = await UnidadModel.findAll({
            where: { id: req.params.id }
        });
        res.json(unidad[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createUnidad = async (req, res) => {
    try {
        await UnidadModel.create(req.body);
        res.json({ "message": "¡Registro creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateUnidad = async (req, res) => {
    try {
        await UnidadModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ "message": "¡Registro actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteUnidad = async (req, res) => {
    try {
        await UnidadModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ "message": "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Método para autenticación
export const loginUnidad = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        const unidad = await UnidadModel.findOne({
            where: { usuario, contraseña }
        });
        
        if (unidad) {
            res.json({ success: true, message: "Autenticación exitosa" });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};