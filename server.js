const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');

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

io.on('connection', async (socket)=>{
    console.log('A user connected', socket.id);
    
    const messages = await Message.find()
    .populate('sender', 'username')
    .sort({createdAt: 1});
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', async(data) => {
        const message = await Message.create({
            sender: data.userId,
            text: data.text
        });
        const populatedMessage = await message.populate('sender', 'username');

        io.emit('newMessage', populatedMessage);
    })

    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
