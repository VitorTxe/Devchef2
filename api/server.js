import express from "express";
import receitasRoutes from './src/routes/receitas.route.js'
import cors from 'cors';
import helmet from 'helmet';

const app = express();
// A porta é fornecida pela Render via variável de ambiente.
// Usamos 3001 como padrão para o ambiente local.
const port = process.env.PORT || 3001;

app.use(cors())

app.use(helmet());

app.use(express.json())

app.use('/api/receitas', receitasRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
