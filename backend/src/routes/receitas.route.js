import express from "express"
import { perguntarReceita } from '../controllers/receitas.controller.js'
import { cadastrarUsuario, loginUsuario, usuario } from "../controllers/authController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router()

router.post('/login', loginUsuario)
router.post('/cadastrar', cadastrarUsuario)
router.post('/perguntar', authMiddleware, perguntarReceita)
router.get('/usuarios', usuario)

export default router 
