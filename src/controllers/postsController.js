import fs from "fs";
import {
  getTodosOsPosts,
  getPostPorID,
  postNovoPost,
  atualizaPost,
  deletaUmPost,
} from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
  try {
    const listaPosts = await getTodosOsPosts();
    res.status(200).json(listaPosts);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json("falha na requisição");
  }
}

export async function listarPostPorID(req, res) {
  const idDoPost = req.params.id;
  try {
    const umPost = await getPostPorID(idDoPost);
    res.status(200).json(umPost);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json("falha na requisição");
  }
}

export async function criarPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await postNovoPost(novoPost);
    res
      .status(200)
      .json({ message: "post criado com sucesso", post: postCriado });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json("falha na requisição");
  }
}

export async function uploadImage(req, res) {
  const novoPost = {
    imgUrl: req.file.originalname,
    descricao: "",
    alt: "",
  };

  try {
    const novoDoc = await postNovoPost(novoPost);
    //por enquanto só png
    //depois fazer lógica para pegar substring da ext se der tempo
    const arquivoAtualizado = `public/images/${novoDoc.insertedId}.png`;
    fs.renameSync(req.file.path, arquivoAtualizado);
    res.status(200).json({
      message: "imagem salva com sucesso",
      id: novoDoc.insertedId.toString(),
    });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json("falha ao salvar imagem");
  }
}

export async function atualizaNovoPost(req, res) {
  const id = req.params.id;
  const urlDaImagem = `http://localhost:3000/images/${req.params.id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`public/images/${req.params.id}.png`);
    const altText = await gerarDescricaoComGemini(imageBuffer);

    const postAtualizadoObj = {
      imgUrl: urlDaImagem,
      descricao: req.body.descricao,
      alt: altText,
    };

    const postCriado = await atualizaPost(id, postAtualizadoObj);
    res
      .status(200)
      .json({ message: "post atualizado com sucesso", post: postCriado });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json("falha na requisição");
  }
}

export async function excluiPostPorID(req, res) {
  const idDoPost = req.params.id;
  // aqui talvez vamos ter que refatorar para path mas no local tá funcionando
  const caminhoImagem = `./public/images/${idDoPost}.png`;
  try {
    const resultadoExclusao = await deletaUmPost(idDoPost);

    if (resultadoExclusao.deletedCount !== 0) {
      fs.unlink(caminhoImagem, (erro) =>
        erro
          ? console.error("erro ao excluir imagem", erro)
          : console.log("imagem excluída")
      );
    } else {
      throw new Error("erro na exclusão");
    }

    res.status(200).json(resultadoExclusao);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json("falha na requisição");
  }
}
