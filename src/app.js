import express from 'express';
import cors from 'cors';
import router from './routes.js';
import fs from 'fs';
import https from 'https';
import { createCategoryTable } from './Controller/Category.js';
import { createOptionTable } from './Controller/Option.js';
// Importe outras funções de criação de tabela conforme necessário

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Api Rodando na porta ${PORT}`);
  await createCategoryTable();
  await createOptionTable();
  // Chame outras funções de criação de tabela conforme necessário
});

// Se você quiser suportar HTTPS localmente
if (fs.existsSync('src/SSL/code.crt') && fs.existsSync('src/SSL/code.key')) {
  https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
  }, app).listen(3001, () => console.log("Rodando em https na porta 3001"));
}
