import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";

import postRoutes from "./routes/google.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", postRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server Running on Port ${PORT}`)
);

const io = new Server(server, {
  pingTimeout : 600000,
  cors : {
    origin : "http://localhost:3000"
  }
});
const connectedClients = {};

io.on("connection", (socket) => {
  console.log('A client has connected with socket id: ', socket.id);

  connectedClients[socket.id] = socket;

  socket.on("my-event", (data) => {
    console.log("Received data:", data);
    io.emit("my-event-response", "Received data successfully");
  });

  socket.on("disconnect", () => {
    console.log("A client has disconnected");
  });
});
