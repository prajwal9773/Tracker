const express = require('express');
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("recieve-location", {id: socket.id, ...data});
    })

    socket.on("disconnected", function(){
        io.emit("user-disconnected", socket.id);
    })
    console.log("a new connection");
})

app.get("/", function(req,res){
    res.render("index");
});

server.listen(3000, ()=>{
    console.log("server is running on port 3000");
});

