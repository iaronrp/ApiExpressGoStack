const express = require("express");

const server = express();

server.use(express.json());

const dados = [];
let number = 0;

function idNotExist(req, res, next) {
  const { id } = req.params;

  dados.map(dado => {
    if (dado["id"] == id) {
      return next();
    }
  });
  return res.status(400).json({ erro: "Id not exist" });
}

function requestNumber(req, res, next) {
  number++;
  console.log(number);
  return next();
}

server.post("/projects", requestNumber, (req, res) => {
  const { id, title } = req.body;

  dados.push({ id, title, tasks: [] });

  return res.json(dados);
});

server.get("/projects", requestNumber, (req, res) => {
  return res.json(dados);
});

server.put("/projects/:id", idNotExist, requestNumber, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  dados.map(dado => {
    if (dado["id"] === id) {
      dado["title"] = title;
    }
  });

  return res.json(dados);
});

server.delete("/projects/:id", idNotExist, requestNumber, (req, res) => {
  const { id } = req.params;

  for (let i = 0; i < dados.length; i++) {
    if (dados[i].id === id) {
      dados.splice(i, 1);
    }
  }
  return res.json(dados);
});

server.post("/projects/:id/tasks", idNotExist, requestNumber, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (let i = 0; i < dados.length; i++) {
    if (dados[i].id === id) {
      dados[i]["tasks"] = [title];
    }
  }

  return res.json(dados);
});

server.listen(3000);
