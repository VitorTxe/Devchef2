import jwt from 'jsonwebtoken';


export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(' '); 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // O payload do token foi criado com 'userId', então usamos 'decoded.userId'
        req.userId = decoded.userId;
        req.userUsuario = decoded.usuario;

        return next();
        
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}