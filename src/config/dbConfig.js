// import { MongoClient } from 'mongodb';

// export default async function conectarAoBanco(stringConexao) {
//   let mongoClient;

//   try {
//       mongoClient = new MongoClient(stringConexao);
//       console.log('Conectando ao cluster do banco de dados...');
//       await mongoClient.connect();
//       console.log('Conectado ao MongoDB Atlas com sucesso!');

//       return mongoClient;
//   } catch (erro) {
//       console.error('Falha na conexão com o banco!', erro);
//       process.exit();
//   }
// }

import mysql from "mysql2/promise";
import { Connector } from "@google-cloud/cloud-sql-connector";
// import { GoogleAuth } from "google-auth-library";

export async function conectarInstanciaSQL() {
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: "PUBLIC",
    authType: "PASSWORD",
  });
  const pool = await mysql.createPool({
    ...clientOpts,
    user: process.env.CLOUD_SQL_USER,
    password: process.env.CLOUD_SQL_PSWD,
    database: process.env.CLOUD_SQL_DB,
  });
  const conn = await pool.getConnection();
  const [result] = await conn.query(`SELECT NOW();`);
  console.table(result);

  await pool.end();
  connector.close();
}
