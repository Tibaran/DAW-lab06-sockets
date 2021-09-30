// Server
const txtMensaje = document.querySelector('#mensaje');
const btnEnviar  = document.querySelector('#enviarMSG');
const btnDesconectar  = document.querySelector('#desconectar');
// Chat
const txtMensajeChat = document.querySelector('#mensaje-chat');
const btnChat = document.querySelector('#chat');
const btnEnviarChat = document.querySelector('#enviarChat');

var socket = io();
// Server
socket.on('connect', ()=>{
    console.log(`succesful connected with id: ${socket.id}`);
    socket.send(socket.id)
    btnEnviarChat.style.display = 'none';
});
socket.on('disconnect', ()=>{
    console.log(`succesful disconnected`);
});

socket.on('enviar-mensaje', (data)=>{
    console.log(data);
});
socket.on('global', (data)=>{
    console.log(`El servidor nos dice: ${data}`);
});

btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value
    txtMensaje.value = ""
    socket.emit('enviar-mensaje', mensaje);
});
btnDesconectar.addEventListener('click', ()=>{
    socket.disconnect();
});

// Chat
btnChat.addEventListener('click', ()=>{
    socket.emit('chat-publico');
    btnEnviarChat.style.display = '';
});
socket.on('ingreso-chat', (data)=>{
    console.log(data);
});
btnEnviarChat.addEventListener('click',()=>{
    const mensaje = txtMensajeChat.value
    txtMensajeChat.value = ""
    console.log(`${socket.id}: ${mensaje}`)
    socket.emit('mensaje-chat', mensaje);
});
socket.on('mensaje-chat', (origen ,mensaje)=>{
    console.log(`${origen}: ${mensaje}`);
});


