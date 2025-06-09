// socket.ts
import { Server, Socket } from "socket.io";

export default function initSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join:order", (orderId: string) => {
      socket.join(orderId);
      console.log(`Socket ${socket.id} joined room: ${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
