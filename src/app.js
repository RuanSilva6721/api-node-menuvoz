import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import { createTable as createCategoryTable } from './Controller/Category.js';
import { createTable as createOptionTable } from './Controller/Option.js';

const app = express();
app.use(express.json());
app.use(cors());

import router from './routes.js';
app.use(router);

app.listen(3000, async () => {
    console.log("Api Rodando.");;
    await createCategoryTable();
    await createOptionTable();
});

https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, () => console.log("Rodando em https"));
