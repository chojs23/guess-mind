import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";
const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => {
  res.render("home");
});

const handleListening = () => {
  console.log(`✅ Server running : http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", (socket) => {
  //클라이언트 연결되면 connection event 발생
  socket.broadcast.emit("hello"); //emit - >소켓에게 event 발생 , broadcast 자기 제외한 모든 소켓에게
  socket.on("hi", () => console.log("client said hello"));
});
