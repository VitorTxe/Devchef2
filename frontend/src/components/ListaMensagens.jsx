import Mensagem from "./Mensagem"
import sopa3 from "../assets/sopa3.png";


const ListaMensagens = ({mensagens, loading}) => {
    return (
        <div className=" flex-1 overflow-y-auto p-4 space-y-4">
            <div className="">
                {mensagens.map(mensagem => (
                <Mensagem key={mensagem.id} mensagem={mensagem}/>
            ))}
            {loading && (
                <div className="flex items-start gap-3 p-2 justify-start">
                    <img
                        src={sopa3}
                        alt="Logo DevChef"
                        className="w-10 h-10 p-1 text-black bg-[#FF6B00ff] rounded-full"
                    />
                    <div className="max-w-xs lg:max-w-xl p-4 shadow-md bg-gray-50 text-gray-800 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-xl border border-gray-300">
                        <div className="flex items-center justify-center space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            
        </div>
    )
}

export default ListaMensagens