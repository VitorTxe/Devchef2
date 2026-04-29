import obterRespostaReceita from "../services/openai.services.js";

export const perguntarReceita = async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({
        erro: "É obrigatorio enviar uma pergunta",
      });
    }

    const resposta = await obterRespostaReceita(pergunta);

    res.status(200).json({ resposta });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao processar sua pergunta" });
  }
};
