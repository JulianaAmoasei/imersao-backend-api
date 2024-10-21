import { getTodosOsPosts } from "../models/postModel.js";

export async function listarPosts (req, res) {
    try {
      const listaPosts = await getTodosOsPosts();
      res.status(200).json(listaPosts);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };
