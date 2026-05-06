import express from "express"
import { cadastrarUsuario, loginUsuario, usuario } from "../controllers/authController.js";

const router = express.Router()

router.post('/login', loginUsuario)
router.post('/cadastrar', cadastrarUsuario)
// router.get('/usuarios', usuario)

export default router 
