export default async function adicionaValidacaoPost(db) {
  db.runCommand({
    collMod: "posts",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["imgUrl", "descricao", "alt"],
        properties: {
          imgUrl: {
            bsonType: "string",
            description: "o campo deve ser uma string e é obrigatório",
          },
          descricao: {
            bsonType: "string",
            maxLength: 280,
            description: "o campo deve ser uma string e é obrigatório",
          },
          alt: {
            bsonType: "string",
            maxLength: 1000,
            description: "o campo deve ser uma string e é obrigatório",
          },
        },
      },
    },
    validationLevel: "strict", // ou "moderate"
  });
}
