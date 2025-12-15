import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUsuario } from "../services/api";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const dadosLogin = { usuario: username, password: password };
            const response = await loginUsuario(dadosLogin);
            
            // 1. Pega o token da resposta da API (response já é o objeto de dados)
            const { token, message } = response;

            if (token) {
                // 2. SALVA O TOKEN NO LOCALSTORAGE!
                localStorage.setItem('userToken', token);
                setSuccess(message || "Login bem-sucedido!");
                
                setTimeout(() => {
                navigate('/chat-receitas');
            }, 4000)
            } else {
                setError('Não foi possível obter o token de autenticação.');
            }
            
        } catch (err) {
            // Exibe a mensagem de erro vinda da API ("Usuário ou senha inválidos.")
            setError(err.response?.data?.error || "Falha no login. Tente novamente.");
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800">Bem-vindo!</h2>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="username">
                    Usuário
                </label>
                <input 
                    id="username"
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00ff] focus:border-transparent" 
                    type="text" 
                    placeholder="Seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
                    Senha
                </label>
                <input 
                    id="password"
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00ff] focus:border-transparent" 
                    type="password" 
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-[#FF6B00ff] rounded-md hover:bg-orange-600 transition-colors duration-300 cursor-pointer">Entrar</button>
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
            {success && <p className="text-sm text-center text-green-500">{success}</p>}
            <p className="text-sm text-center text-gray-600">
                Não tem uma conta?{' '}
                <button type="button" onClick={() => navigate('/criar-conta')} className="font-medium text-blue-500 hover:underline">Crie uma</button>
            </p>
        </form>
    </div>    
    )
}

export default Login