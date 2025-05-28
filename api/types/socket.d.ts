import "socket.io";

declare module "socket.io" {
  interface Server {
    // Add custom events or types here if needed
  }

  interface Socket {
    // Add custom socket data if needed (e.g., userId)
  }
}
