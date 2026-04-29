import express from "express";
import receitasRoutes from './src/routes/receitas.route.js'
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

const port = process.env.PORT || 3001;

const corsOptions = {
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))


// Configuração do Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 5, // Limite de 100 requisições por IP a cada 15 minutos
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: "Muitas requisições. Por favor, tente novamente mais tarde." }
});

// Aplica o rate limit em todas as rotas
app.use(limiter);

// Habilita o body parser para JSON
app.use(express.json())

// helmet ajuda a proteger o servidor contra ataques XSS e clickjacking
app.use(helmet());

app.use('/api/receitas', receitasRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
