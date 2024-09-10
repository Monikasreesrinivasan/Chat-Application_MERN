

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json()); // to accept json data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // Update this with your React app URL
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`User joined: ${userData._id}`);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));




  socket.on("new message", (newMessageReceived) => {
    console.log("New message received:", newMessageReceived);
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
      console.log(`Message emitted to user: ${user._id}`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

/*const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors"); // Import cors


const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(cors()); 

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
//const { chats } = require("./data/data");
//app.use("/api/chat", chatRoutes); 

/*const express = require('express');
const dotenv = require("dotenv");

const connectDB = require("./config/db");



const userRoutes = require('./routes/userRoutes');
const {notFound,errorHandler } =require("./middleware/errorMiddleware")
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept json data

app.get("/", (req,res) =>{
    res.send("API is Running Successfully........");
});

app.use('/api/user',userRoutes);
app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 5000;


const server = app.listen(5000, console.log(`Server Started on PORT ${PORT}`));
const io = require('socket.io')(server,{
    pingTimeout : 60000,
    cors:{
        origin: "http://localhost:3000",
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io");
    socket.off("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });
    
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on('new message',(newMessageReceived)=>{
    var chat = newMessageReceived.chat;

    if(!chat.users)return console.log("chat.users not defined");

    chat.users.forEach(user=>{
        if(user._id == newMessageReceived.sender) return;
        socket.in(user._id).emit("message recieved", newMessageReceived);
    })
  });
    
  
});

*/