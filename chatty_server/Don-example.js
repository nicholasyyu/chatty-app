const socket = new WebSocket("ws://localhost:3001");
let username = "";

function sendMessage(msg) {
	const payload = {username, message: msg};
	socket.send(JSON.stringify(payload));
}

function makeMessage(message) {
	const output = document.querySelector("#output");

	let p = document.createElement("p");
	let username = document.createElement("strong").innerText(message.username);
}

socket.onopen = () => {
	socket.send(JSON.stringify({content: "new connection"}));
};

socket.onmessage = (payload) => {
	const message = JSON.parse(payload.data);

	switch(message.type) {
		case 'emote':
		message.content = `<em>${message.content}</em>`;
		break;
		case 'image':
		message.content = `<img src="${message.content}" />`;
		break;
	}

	makeMessage(message);
};
