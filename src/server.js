const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const User = require("./models/User");
const Message = require("./models/Messages");
const path = require("path");

const app = express(); //servidor do express para ouvir endereços
const server = require("http").Server(app); //unindo conexoes http com socket io
const io = require("socket.io")(server); //agora esta pronto para receber http e socket
var bodyParser = require("body-parser");

app.use("/", express.static(path.join(__dirname, "..", "public")));

io.on("connection", async socket => {
  const { user } = socket.handshake.query;
  await User.findByIdAndUpdate({ _id: user }, { socket: socket.id });
  socket.on("sendMessage", async data => {
    const msg = await Message.create(data);
    data.createdAt = msg.createdAt;
    socket.broadcast.emit("receivedMessage", data); //braodcast envia para todos q estao conectados na aplicção
  });
});

mongoose
  .connect(
    //"mongodb+srv://Brenner:dezoitos@cluster0-kdimj.mongodb.net/chat?retryWrites=true&w=majority",
    "mongodb://192.168.0.5:27017/redesChat",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  .then("DB connected")
  .catch(err => {
    console.log("MongoDB connection error:", err);
    return { msg: "MongoDB connection error" };
  });

app.use((req, res, next) => {
  //chega aqui antes de ir para as rotas
  req.io = io;
  return next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes); //adicionando as configs do routes

server.listen(3000, () => {
  console.log("App is listening Port:", 3000);
});
