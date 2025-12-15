import { useState, useEffect } from "react";
import ListaMensagens from "../components/ListaMensagens";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";
import {perguntarReceita} from '../services/api';

const MENSAGEM_INICIAL = {
  id: 1,
  texto: "Olá! Sou o DevChef. Quais ingredientes você tem hoje? Me diga e eu criarei uma receita para você!",
  remetente: "bot",
};

const criarNovaConversa = () => ({
  id: Date.now(),
  titulo: "Nova Conversa",
  mensagens: [MENSAGEM_INICIAL],
});

const ChatReceitas = () => {
  const [loading, setloading] = useState(false);
  const [conversas, setConversas] = useState([]);
  const [conversaAtualId, setConversaAtualId] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Carregar conversas do localStorage na inicialização
  useEffect(() => {
    const conversasSalvas = JSON.parse(localStorage.getItem("chat_conversas") || "[]");
    if (conversasSalvas.length > 0) {
      setConversas(conversasSalvas);
      // Define a mais recente como ativa
      setConversaAtualId(conversasSalvas[0].id); 

    } else {
      const novaConversa = criarNovaConversa();
      setConversas([novaConversa]);
      setConversaAtualId(novaConversa.id);
    }
  }, []);

  // Salvar conversas no localStorage sempre que forem alteradas
  useEffect(() => {
    if (conversas.length > 0) {
      localStorage.setItem("chat_conversas", JSON.stringify(conversas));

    } else {
      // Limpa o localStorage se não houver mais conversas
      localStorage.removeItem("chat_conversas");
    }
  }, [conversas]);

  const handleNovaConversa = () => {
    const novaConversa = criarNovaConversa();
    setConversas([novaConversa, ...conversas]);
    setConversaAtualId(novaConversa.id);
  };

  const handleSelecionarConversa = (id) => {
    setConversaAtualId(id);
  };

  const handleDeletarConversa = (idParaDeletar) => {
    const conversasRestantes = conversas.filter((c) => c.id !== idParaDeletar);

    setConversas(conversasRestantes);

    // Se não houver mais conversas, cria uma nova
    if (conversasRestantes.length === 0) {
      handleNovaConversa();
    } 
    // Se a conversa deletada era a ativa, seleciona a primeira da lista restante
    else if (conversaAtualId === idParaDeletar) {
      setConversaAtualId(conversasRestantes[0].id);
    }

    
  };

  
  const onEnviarMensagem = async (textoMensagem) => {
    const novaMensagemUsuario = {
      id: Date.now(),
      texto: textoMensagem,
      remetente: "usuario",
    };
    //TODO Entender como esse blobo de codigo funciona
    // Atualiza a conversa correta com a nova mensagem do usuário
    const conversasAtualizadas = conversas.map((conversa) => {
      if (conversa.id === conversaAtualId) {
        // Se for a primeira mensagem do usuário, atualiza o título da conversa
        const ehPrimeiraMensagem = conversa.mensagens.length === 1;
        return {
          ...conversa,
          titulo: ehPrimeiraMensagem ? textoMensagem : conversa.titulo,
          mensagens: [...conversa.mensagens, novaMensagemUsuario],
        };
      }
      return conversa;
    });

    setConversas(conversasAtualizadas);
    setProcessing(true);
    setloading(true);

    try {
      const resposta = await perguntarReceita(textoMensagem);
      const novaMensagemBot = {
        id: Date.now() + 1,
        texto: resposta,
        remetente: "bot",
      };

      // Adiciona a resposta do bot à conversa
      setConversas((prevConversas) =>
        prevConversas.map((conversa) =>
          conversa.id === conversaAtualId
            ? { ...conversa, mensagens: [...conversa.mensagens, novaMensagemBot] }
            : conversa
        )
      );
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setProcessing(false);
      setloading(false);
    }
  };

  const conversaAtual = conversas.find((c) => c.id === conversaAtualId);
  const mensagensAtuais = conversaAtual ? conversaAtual.mensagens : [];

  return (
    <div className="flex h-screen bg-[#F8F9FAff] font-sans">
      <SideBar
        conversas={conversas}
        conversaAtualId={conversaAtualId}
        onNovaConversa={handleNovaConversa}
        onSelecionarConversa={handleSelecionarConversa}
        onDeletarConversa={handleDeletarConversa}
      />

        {/* Área de Conteúdo Principal */}
        <main className="flex-1 flex flex-col">
          <header className=" flex flex-wrap  justify-between border-b border-[#e4e6e9]">
            <div className="flex flex-col p-4">
              <h1 className="text-2xl text-black leading-normal font-mono font-bold min-w-72 ">
                DevChef Chat
              </h1>
              <p className="text-gray-600 text-lg">
                Seu assistente pessoal de receitas com IA. O que você tem na geladeira hoje?
              </p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 gap-6">
            <div className="flex flex-col gap-6 max-w-6xl h-full mx-auto">
              <ListaMensagens mensagens={mensagensAtuais} loading={loading} />
              <ChatBox onEnviarMensagem={onEnviarMensagem} processing={processing}/>
            </div>
          </div>
        </main>
      </div>
  );
};

export default ChatReceitas;