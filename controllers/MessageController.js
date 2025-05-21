import db from '../database/db.js';

// Helper para ejecutar queries
const query = (sql, values = []) => db.query(sql, values).then(([results]) => results);

export const getAllMessage = async (req, res) => {
    try {
        const messages = await query(`
            SELECT m.*, 
                   GROUP_CONCAT(d.nombre SEPARATOR ', ') AS destinatarios,
                   GROUP_CONCAT(d.id) AS destinatarios_ids
            FROM messages m
            LEFT JOIN mensaje_destinatario md ON m.id = md.mensaje_id
            LEFT JOIN destinatarios d ON md.destinatario_id = d.id
            GROUP BY m.id
        `);
        
        // Formatear resultados
        const formatted = messages.map(msg => ({
            ...msg,
            destinatarios: msg.destinatarios ? msg.destinatarios.split(', ') : [],
            destinatarios_ids: msg.destinatarios_ids ? msg.destinatarios_ids.split(',').map(Number) : []
        }));
        
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessage = async (req, res) => {
    try {
        const [message] = await query('SELECT * FROM messages WHERE id = ?', [req.params.id]);
        
        if (!message) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }
        
        const destinatarios = await query(`
            SELECT d.id, d.nombre 
            FROM destinatarios d
            JOIN mensaje_destinatario md ON d.id = md.destinatario_id
            WHERE md.mensaje_id = ?
        `, [req.params.id]);
        
        res.json({ ...message, destinatarios });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMessage = async (req, res) => {
    try {
        const { destinatarios = [], ...messageData } = req.body;
        
        // Insertar mensaje
        const { insertId } = await query('INSERT INTO messages SET ?', [messageData]);
        
        // Insertar relaciones si hay destinatarios
        if (destinatarios.length > 0) {
            await query(
                `INSERT INTO mensaje_destinatario (mensaje_id, destinatario_id) 
                 VALUES ?`,
                [destinatarios.map(id => [insertId, id])]
            );
        }
        
        res.json({
            message: "¡Mensaje creado con éxito!",
            id: insertId,
            destinatarios
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { destinatarios, ...messageData } = req.body;
        
        // Actualizar mensaje
        await query('UPDATE messages SET ? WHERE id = ?', [messageData, req.params.id]);
        
        // Sincronizar destinatarios si vienen en el request
        if (destinatarios) {
            // Eliminar relaciones existentes
            await query('DELETE FROM mensaje_destinatario WHERE mensaje_id = ?', [req.params.id]);
            
            // Insertar nuevas relaciones
            if (destinatarios.length > 0) {
                await query(
                    `INSERT INTO mensaje_destinatario (mensaje_id, destinatario_id) 
                     VALUES ?`,
                    [destinatarios.map(id => [req.params.id, id])]
                );
            }
        }
        
        res.json({ message: "¡Mensaje actualizado correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        // La relación está configurada con ON DELETE CASCADE, así que se eliminarán automáticamente
        // los registros en mensaje_destinatario
        await query('DELETE FROM messages WHERE id = ?', [req.params.id]);
        
        res.json({ message: "¡Mensaje eliminado correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};