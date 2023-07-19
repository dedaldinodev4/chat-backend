import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'


const server = express();
server.use(express.json())
server.use(cors())
const httpServer = createServer(server)
const socketServer = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
    credentials: true
  }
})



export { socketServer, httpServer }