import sopa3 from "../assets/sopa3.png";

const Mensagem = ({ mensagem }) => {
  const isBot = mensagem.remetente === "bot";

  return (
    <div className={`flex items-start gap-3 p-2 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <img
          src={sopa3}
          alt="Logo DevChef"
          className="w-10 h-10 p-1 text-black bg-[#FF6B00ff] rounded-full"
        />
      )}
      <div
        className={`max-w-xs lg:max-w-xl p-4 shadow-md hover:shadow-lg cursor-auto ${
          isBot
            ? "bg-gray-50 text-gray-800 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-xl border border-gray-300"
            : "bg-[#343A40] text-white rounded-br-none rounded-tr-xl rounded-tl-xl rounded-bl-xl"
        }`}
      >
        <p className="text-sm whitespace-pre-line">{mensagem.texto}</p>
      </div>
    </div>
  );
};

export default Mensagem;
