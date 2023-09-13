import { useEffect } from "react";
import io from "socket.io-client";

function FileReceiver() {
  useEffect(() => {
    // Connect to your Socket.IO server (replace 'server-url' with the actual URL)
    const socket = io("server-url");

    // Listen for the 'file' event from the server
    socket.on("file", (data) => {
      // Handle the received file data here as needed
      console.log("Received a file:", data);

      // You can process and use the 'data' for your specific purposes
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}

export default FileReceiver;
