import express from "express";
import multer from "multer";
import { listarPosts, listarPostPorID, criarPost, uploadImage } from "../controllers/postsController.js";

const upload = multer({ dest: 'uploads/' });

const routes = (app) => {
  app.use(express.json());
  app.route("/").get((req, res) => res.status(200).send("URL base da imersão back-end!"));
  app.get("/posts", listarPosts);
  app.get("/posts/:id", listarPostPorID);
  app.post("/posts", criarPost);
  app.post('/posts/upload', upload.single('image'), uploadImage);
};

export default routes;
