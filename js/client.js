// const socket = io("http://localhost:8000");
const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById('send-container');
const msginput = document.getElementById('messageinp')
const msgcontainer=document.querySelector(".container") //msges aayenge toh container ke andar daalne hai

var audio = new Audio('msg.mp3');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');
// header('Access-Control-Allow-Headers: Content-Type,X-Auth-Token,Origin,Authorization');
const append=(message,position)=>{
    const messagelement=document.createElement('div');
    messagelement.innerText=message;
    messagelement.classList.add('message');
    messagelement.classList.add(position);
    msgcontainer.append(messagelement);
    if(position=='left'){
        audio.play();
    }
   
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);//index.js wala callback run krega

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`,'right')
})

form.addEventListener('submit',(e)=>{ //agr koi submit kre toh yeh kro
    e.preventDefault(); //isse page reload nahi hoga
    const message= msginput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    msginput.value=''
    
})//msg type krke bhejne ke baad typing area se chala jaye
// const socket = io('http://localhost:8000');

// // Get DOM elements in respective Js variables
// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp')
// const messageContainer = document.querySelector(".container")

// // Function which will append event info to the contaner
// const append = (message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
// }
//     // If the form gets submitted, send server the message
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`, 'right');
//     socket.emit('send', message);
//     messageInput.value = ''
// })

// const name = prompt("Enter your name to join");
// socket.emit('new-user-joined', name);

// socket.on('user-joined', name =>{
//     append(`${name} joined the chat`, 'right')
// })

// // If server sends a message, receive it
// socket.on('receive', data =>{
//     append(`${data.name}: ${data.message}`, 'left')
// })
