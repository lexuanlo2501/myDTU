class SocketService{
    connection(socket){
        socket.on('disconnect',()=>{
            console.log(`A user disconnected with id : ${socket.id}`);
        })

    socket.on('chat message',msg=>{
        console.log(`msg is : ${msg}`);
        _io.emit('chat message',msg)
    })
    }
}

module.exports = new SocketServices();