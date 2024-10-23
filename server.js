import express from "express";
import routes from "./src/routes/postsRoute.js";

const PORT = 3000;
const app = express();
app.use(express.static('public'));
routes(app);

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
