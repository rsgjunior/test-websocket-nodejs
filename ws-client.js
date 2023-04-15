const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (event) => {
    console.log('CLIENT connection opened to the socket');
    socket.send('Hello Server!');
};

socket.onmessage = async (event) => {
    console.log('CLIENT message received from the server: ', event);

    const data = JSON.parse(await event.data);

    inserirMsgNaTela(data);
};

socket.onclose = (event) => {
    console.log('CLIENT closed connection with server');
};
