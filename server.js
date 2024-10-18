import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const posts = [
  {
    id: 1,
    imgUrl: "https://placecats.com/millie/300/150",
    descricao: "Fotografia de um gato adulto rajado olhando para a câmera",
  },
  {
    id: 2,
    imgUrl: "https://placecats.com/millie/300/150",
    descricao: "Fotografia de um gato adulto rajado olhando para a câmera",
  },
  {
    id: 3,
    imgUrl: "https://placecats.com/millie/300/150",
    descricao: "Fotografia de um gato adulto rajado olhando para a câmera",
  }
]

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
