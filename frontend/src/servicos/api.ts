import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const mensagem =
      erro.response?.data?.message ||
      erro.message ||
      'Erro desconhecido ao conectar ao servidor.'
    return Promise.reject(new Error(mensagem))
  },
)

export default api
