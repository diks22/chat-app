//Node server which will handle socket io connection

const io=require('socket.io')(8000)
const users={};
io.on('connection',socket=>{    //jaise he connection aaye toh ek arrow function ko run krdo
    socket.on('new-user-joined',name=>{  //new-user-joined is an event apni marzi se naam rakho,agr yeh event hota h toh name callback run krega
        // console.log("New User",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);  //sab users ko btayega kisne join kiya
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})

// Node server which will handle socket io connections
// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket =>{
//     // If any new user joins, let other users connected to the server know!
//     socket.on('new-user-joined', name =>{ 
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     // If someone sends a message, broadcast it to other people
//     socket.on('send', message =>{
//         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//     });
// });