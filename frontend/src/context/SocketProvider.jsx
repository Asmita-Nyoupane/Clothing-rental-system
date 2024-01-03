import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();

  useEffect(() => {
    // Create a single socket connection when the component mounts
    socket.current = io("http://localhost:5001", {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });

    // Cleanup socket on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
