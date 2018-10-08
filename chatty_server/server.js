// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//count user numbers with Set()
const userNumberSet = new Set();

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws, req) => {

  console.log('Client connected');
  //unique ID from req.headers
  const idOpen = req.headers['sec-websocket-key'];
  //update current user numbers
  userNumberSet.add(idOpen);
  let counter = userNumberSet.size;
  let sendCounter = {type: "counter", number: counter};
  wss.broadcast(JSON.stringify(sendCounter));

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    //update current user numbers
    userNumberSet.delete(idOpen);
    let counter = userNumberSet.size;
    let sendCounter = {type: "counter", number: counter};
    wss.broadcast(JSON.stringify(sendCounter));
  });

  //recieve data from client.
  ws.on('message', (data) => {

  	let d = JSON.parse(data);

	switch(d.type) {

		case 'postNotification':
		d.type = "incomingNotification";
		wss.broadcast(JSON.stringify(d));
		break;

		case 'postMessage':
		d.type = "incomingMessage";
		wss.broadcast(JSON.stringify(d));
		break;
		
	}
  	
  });

});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
};

