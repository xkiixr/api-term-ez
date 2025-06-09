import http from "http";
import { Server } from "socket.io";
import { corsOptions } from "../utils/corsOption";

export const createSocketServer = (app: any) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: corsOptions.origin,
            methods: ["GET", "POST"],
        },
    });
    return { server, io };
};
