import express from 'express';

const server = express();

interface teste {

}

server.get('/', (req, res) => {
  return res.send('Olá, DEVV!');
});

export { server };
