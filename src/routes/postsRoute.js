import express from "express";
import multer from "multer";
import cors from "cors";
import {
  listarPosts,
  listarPostPorID,
  criarPost,
  uploadImage,
  atualizaNovoPost,
  excluiPostPorID,
} from "../controllers/postsController.js";

const upload = multer({ dest: "./public/images/" });

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app
    .route("/")
    .get((req, res) => res.status(200).send("URL base da imersão back-end!"));
  app.get("/posts", listarPosts);
  app.get("/posts/:id", listarPostPorID);
  app.post("/posts", criarPost);
  app.post("/posts/upload", upload.single("image"), uploadImage);
  app.put("/posts/upload/:id", atualizaNovoPost);
  app.delete("/posts/:id", excluiPostPorID);
};

export default routes;
