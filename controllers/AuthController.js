import UnidadModel from "../models/UnidadModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        
        const unidad = await UnidadModel.findOne({
            where: { usuario }
        });
        
        if (!unidad) {
            return res.status(401).json({ 
                success: false, 
                message: "Credenciales incorrectas" 
            });
        }
        if (contraseña !== unidad.contraseña) {
            return res.status(401).json({ 
                success: false, 
                message: "Credenciales incorrectas" 
            });
        }
        
        const token = jwt.sign(
            { 
                id: unidad.id, 
                usuario: unidad.usuario, 
                tipo: unidad.tipo,
                unidad: unidad.unidad
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        res.json({ 
            success: true, 
            message: "Autenticación exitosa",
            token,
            tipo: unidad.tipo,  // Asegurarse de enviar el tipo
            unidad: {  // Estructura que espera el frontend
                id: unidad.id,
                usuario: unidad.usuario,
                tipo: unidad.tipo,
                unidad: unidad.unidad
            }
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ 
            success: false, 
            message: "Token no proporcionado" 
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: "Token inválido o expirado" 
        });
    }
};

export const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(403).json({ 
                success: false, 
                message: "No autenticado" 
            });
        }
        
        if (!rolesPermitidos.includes(req.usuario.tipo)) {
            return res.status(403).json({ 
                success: false, 
                message: "No tienes permisos para esta acción" 
            });
        }
        
        next();
    };
};