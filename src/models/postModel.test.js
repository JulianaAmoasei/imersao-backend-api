import { describe, it, mock } from "node:test";
import assert from "node:assert";
import { postNovoPost, getTodosOsPosts } from "./postModel.js";

// function soma(a, b) {
//   return a + b;
// }

// describe("meu primeiro teste", () => {
//   it("deve retornar resultado = 3", () => {
//     assert.deepEqual(soma(1, 2), 3);
//   });
// })

describe("adicionar novo post", () => {
  const novoPostObj = {
    imgUrl: "api.com/img.png",
    descricao: "descrição de teste",
    alt: "alt de teste",
  };

  const mockReturn = () => ({ acknowledged: true, insertedId: "1" });

  it("deve inserir um novo post", async () => {
    const fn = mock.fn(postNovoPost, mockReturn);
    const res = await fn(novoPostObj);
    assert.strictEqual(res.acknowledged, true);
    assert.strictEqual(res.insertedId, "1");
  });
});

describe("listar todos os posts", () => {
  const listaPosts = [
    {
      _id: "1",
      imgUrl: "api.com/img.png",
      descricao: "descrição de teste",
      alt: "alt de teste",
    },
    {
      _id: "2",
      imgUrl: "api.com/img.png",
      descricao: "descrição de teste",
      alt: "alt de teste",
    },
  ];

  const mockReturn = () => listaPosts;

  it("deve listar todos os posts", async () => {
    const fn = mock.fn(getTodosOsPosts, mockReturn);
    assert.strictEqual(fn(), listaPosts);
  });
});
