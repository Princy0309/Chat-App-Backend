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
app.use(express.static('Public'));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=> console.log("MongoDb error: ", err));


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/Public/login.html');
});

let onlineUsers = 0;


io.on('connection', async (socket)=>{

    onlineUsers++;
    io.emit('updateUsercount', onlineUsers);
    console.log(`User connected (${socket.id}). Total online: ${onlineUsers}`);
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
        onlineUsers = Math.max(0, onlineUsers - 1);
        io.emit('updateUserCount', onlineUsers);
        console.log(`User disconnected (${socket.id}). Total online: ${onlineUsers}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
