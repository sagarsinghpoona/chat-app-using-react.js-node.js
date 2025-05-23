import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import http from "http"


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",

        methods:["Get","Put"]

    }
})
io.on("connection",(socket)=>{console.log(socket.id)
    socket.on("joinRoom",(data)=>{
        socket.join(data);
        console.log(`user ID : ${socket.id} join room :`)
    })
    socket.on("send_message",(data)=>{
        console.log(data)
    socket.to(data.room).emit("receive_message",data)

    })

    



    socket.on("disconnect",()=>{
        console.log("user disconected",socket.id)
    })
});



app.use(cors());

server.listen('https://poonachat.vercel.app/',()=>{
    console.log("server is running on port 1000")
})

