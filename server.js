const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin: '*'}
});


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=> console.log("MongoDb error: ", err));


app.get('/', (req, res)=>{
    res.send("chat app backend is running");
});

io.on('connection', (socket)=>{
    console.log('A user connected', socket.id);

    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
