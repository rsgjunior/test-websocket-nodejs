import { WebSocketServer } from 'ws';
import { Buffer } from 'node:buffer';

const server = new WebSocketServer({
    port: 8080,
});

console.log('WebSocket server started!');

server.on('connection', (socket, request, client) => {
    console.log('new connection on the socket ', request.socket.remoteAddress);

    socket.isAlive = true;

    socket.on('message', (msg) => {
        console.log(`new message from ${client}`);

        const msgString = msg instanceof Buffer ? msg.toString() : msg;

        const data = JSON.stringify({
            user: 'Fulano',
            msg: msgString,
            date: (new Date()).toISOString(),
        });

        server.clients.forEach(c => c.send(data));
    });

    socket.on('close', () => {
        console.log('connection closed!');
    });

    socket.on('pong', () => {
        console.log(`connection still alive with client ${client}`);
        socket.isAlive = true;
    });
});

const intervalObj = setInterval(() => {
    console.log('pinging connected sockets %d %s', server.clients.length, Date.now());

    server.clients.forEach(c => {
        if (c.isAlive === false) {
            console.log(`connection NOT ALIVE with client ${client} will terminate`);
            return c.terminate();
        }

        c.isAlive = false;
        c.ping();
    });
}, 10000);

server.on('close', () => clearInterval(intervalObj));