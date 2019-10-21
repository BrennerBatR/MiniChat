const express = require('express');
const path = require('path');

//configuração de http e websocket
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views' , path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine' , 'html');

app.use('/', (req,res)=>{
    res.render('index.html');
});


let messages = []; //depois começar jogar pro mongo

io.on('connection' , socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.on('sendMessage' , data => { //data = mensagem on = ouvir emit = enviar 
        console.log('Message: ' , data);

        socket.broadcast.emit('receivedMessage' , data); //braodcast envia para todos q estao conectados na aplicção
    });
});

server.listen(3000);