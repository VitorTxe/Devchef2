import { createBrowserRouter, Navigate } from "react-router";
import App from './App.jsx';
import Login from './pages/Login.jsx'
import ChatReceitas from './pages/ChatReceitas.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                // Redireciona a rota raiz "/" para "/login"
                path: "/",
                element: <Navigate to="/login" replace />,
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "chat-receitas",
                element: (
                    // <ProtectedRoute>
                        <ChatReceitas />
                    // </ProtectedRoute>
                )
            },
            {
                path: "criar-conta",
                element: <CreateAccount />  
            }
        ]
    }
])

export default router;