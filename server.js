const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server)

const PORT = 5000; 

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function(socket) {
    socket.on("newuser", function(username) {
        socket.broadcast.emit("update", username + "joined the conversation")
    });
    socket.on("exituser", function(username) {
        socket.broadcast.emit("update", username + "left the conversation")
    });
    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });
});

// Start the server on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});