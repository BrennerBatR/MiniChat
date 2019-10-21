const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express(); //servidor do express para ouvir endereços
const server = require("http").Server(app); //unindo conexoes http com socket io
const io = require("socket.io")(server); //agora esta pronto para receber http e socket
var bodyParser = require('body-parser');

const connectedUsers = {}; //map de id user e id socket para armazenar qual o socket do user. Para melhorar isso , armazenar no mongo


io.on("connection", socket => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.on("sendMessage", data => {
    //data = mensagem on = ouvir emit = enviar
    console.log("Message: ", data);

    socket.broadcast.emit("receivedMessage", data); //braodcast envia para todos q estao conectados na aplicção
  });
});

mongoose
  .connect(
    //"mongodb+srv://Brenner:dezoitos@cluster0-kdimj.mongodb.net/test?retryWrites=true&w=majority",
    "mongodb://localhost:27017/redesChat",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log("MongoDB connection error:", err);
    res.status(500).send({ msg: "MongoDB connection error" });
  });

app.use((req, res, next) => {
  //chega aqui antes de ir para as rotas
  req.io = io;
  req.connectedUsers = connectedUsers; //enviando para o controler esses dados

  return next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes); //adicionando as configs do routes

server.listen(3000);
