import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Cria uma instância do Axios. Usaremos esta instância para todas as chamadas.
// Adicionamos o prefixo /api/receitas diretamente na baseURL.
const apiClient = axios.create({
  baseURL: `${API_URL}/api/receitas`,
});

// Interceptor de Requisição: Adiciona o token JWT em todas as chamadas para a API.
apiClient.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem("userToken");
    if (token) {
      // Se o token existir, adiciona ao cabeçalho de autorização
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Lida com erros 401 (token expirado/inválido).
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Sessão expirada ou inválida. Redirecionando para o login.");
      localStorage.removeItem("userToken");
      // Força o redirecionamento para a página de login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Renomeamos a função 'api' para 'perguntarReceita' para maior clareza
export const perguntarReceita = async (pergunta) => {
  try {
    // Agora usamos a instância 'apiClient' que já tem o interceptor
    const response = await apiClient.post("perguntar", { pergunta });
    return response.data.resposta;

  } catch (error) {
    console.error("Erro ao buscar resposta no servidor", error);
    throw error;
  }
};

export const cadastrarUsuario = async (dadosUsuario) => {
  try {
    const response = await apiClient.post("cadastrar", dadosUsuario);
    return response.data;

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUsuario = async (dadosLogin) => {
  const response = await apiClient.post("login", dadosLogin);
  console.log(response.data);
  return response.data;
};
