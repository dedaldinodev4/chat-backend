import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'


const server = express();
const httpServer = createServer(server)
const socketServer = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*"
  }
})

server.use(express.json())

export { socketServer, httpServer }