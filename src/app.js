import express from 'express';
import cors from 'cors';
import router from './routes.js';
import fs from 'fs';
import https from 'https';
import http from 'http';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // Ajuste isso conforme necessário
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(router);

const PORT_HTTP = process.env.PORT_HTTP || 3000;
const PORT_HTTPS = process.env.PORT_HTTPS || 3001;

// HTTP Server
http.createServer(app).listen(PORT_HTTP, () => {
  console.log(`API Rodando na porta ${PORT_HTTP}`);
});

// HTTPS Server
if (fs.existsSync('src/SSL/code.crt') && fs.existsSync('src/SSL/code.key')) {
  https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
  }, app).listen(PORT_HTTPS, () => {
    console.log(`API Rodando em https na porta ${PORT_HTTPS}`);
  });
} else {
  console.error('Certificados SSL não encontrados. HTTPS não será iniciado.');
}
