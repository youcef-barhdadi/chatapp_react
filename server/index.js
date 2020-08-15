const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./route');
const { addUser, getUser, getusersInRoom, removeUser } = require('./user.js');
const { use } = require('./route');

const app = express();
const PORT = process.env.PORT ||  5000;


const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('we have new Connection');

    socket.on('join', ({name, room}, callback) =>{
        console.log(name, room);
        const {user, error} = addUser({id :socket.id ,name : name , room : room});
            console.log("user " , user);
        if (!user)
        {
            callback();
            return null;
        }

        socket.emit('message', {user : 'addmin', text:  ` ${user.name} welcom to the room ${user.room} `});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text : `${user.name} has joind`});
        socket.join(user.room);

      
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log( user);
        io.to(user.room).emit('message', {user:user, text :message});

        callback();
    });


    socket.on('disconnect', () =>{
        console.log('User Had left');
    });
    
})


app.use(router);

server.listen(PORT,  () => console.log(`Server hass strated on port ${PORT}`));