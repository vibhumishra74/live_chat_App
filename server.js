let express = require("express");

let app = express();

let port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let listen = app.listen(port, () => {
  console.log(`app up and running port ${port}`);
});

// socket

let socket = require("socket.io")(listen);
socket.on("connection", (socket) => {
  console.log("connection successfull");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
