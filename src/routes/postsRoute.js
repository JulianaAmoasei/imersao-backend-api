import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  app.use(express.json());
  app.route("/").get((req, res) => res.status(200).send("URL base da imersão back-end!"));
  app.get("/posts", listarPosts);
};


export default routes;
