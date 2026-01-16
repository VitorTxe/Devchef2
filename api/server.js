import express from "express";
import receitasRoutes from './src/routes/receitas.route.js'
import cors from 'cors';
import helmet from 'helmet';

const app = express();

const port = process.env.PORT || 3001;

app.use(cors())
// helmet ajuda a proteger o servidor, porque ajuda a proteger contra ataques de hackers
app.use(helmet());

app.use(express.json())

app.use('/api/receitas', receitasRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
