const WebSocket = require('ws');
const fs = require('fs');

const url = 'localhost:42069/socket'; // Replace with your WebSocket server URL
const outputFilePath = 'received-file.txt'; // Specify the path where you want to save the received file

const socket = new WebSocket(url);

socket.on('open', () => {
  console.log('Connected to WebSocket server');

  // Send a message to the server to request the file
  const requestMessage = JSON.stringify({ type: 'file_request' });
  socket.send(requestMessage);
});

socket.on('message', (data) => {
  try {
    const message = JSON.parse(data);

    // Check if the server is sending the file
    if (message.type === 'file') {
      const fileData = Buffer.from(message.data, 'base64');

      // Save the received file to the specified path
      fs.writeFileSync(outputFilePath, fileData);
      console.log(`Received file saved as ${outputFilePath}`);

      // Close the WebSocket connection
      socket.close();
    } else {
      console.log('Received a message from the server:', message);
    }
  } catch (error) {
    console.error('Error parsing WebSocket message:', error);
  }
});

socket.on('close', (code, reason) => {
  console.log(`WebSocket connection closed with code ${code}: ${reason}`);
});

socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});
