import { useState } from "react";

const ChatBox = ({onEnviarMensagem, processing}) => {
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        onEnviarMensagem(mensagem)
        setMensagem('')
    }

    const bottonClass = processing ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF6B00ff] cursor-pointer"

    return (
        <div className="boder-t border-gray-200 bg-gray-50/80 p-3">
            <form className="flex space-x-3" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder={processing ? "Aguarde a resposta do DevChef.." : "Digite sua mensagem aqui..."}
                    disabled={processing}
                className="flex-1 px-5 py-3 bg-white border border-gray-300 rounded-full shadow-sm outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button 
                    type="submit"
                    disabled={processing || mensagem.trim() === ''}
                    className={`px-5 bg-[#FF6B00ff] text-white rounded-full ${bottonClass}`}>{processing ? "Aguarde..." : "Enviar"}</button>
            </form>
        </div>
    )
}

export default ChatBox;