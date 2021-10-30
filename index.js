const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
//Express
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

const httpServer = createServer(app);
// Socket
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(`Socket: ${socket.id} just connected`);

    // or with emit() and custom event names
    socket.on("enviar-mensaje", (data)=>{
        console.log(`${socket.id} dijo: ${data}`);
        socket.emit("enviar-mensaje", `mensaje recibido socket: ${socket.id}`);
    });
    socket.on('disconnect',()=>{
        console.log(`Socket: ${socket.id} just disconnected`);
    });
    socket.broadcast.emit("global", "Saludando a todos los sockets");
    socket.on('chat-publico', ()=>{
        socket.join('sala1');
        socket.emit('ingreso-chat', "Entraste al chat Publico");
    });
    socket.on('mensaje-chat', (mensaje)=>{
        socket.broadcast.to('sala1').emit('mensaje-chat', socket.id,mensaje);
    });
  
});
httpServer.listen(process.env.PORT || 3000, ()=>{console.log("El servidor esta corriendo en puerto 3000")});