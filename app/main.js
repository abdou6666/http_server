const net = require("net");

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('Received data:\n', data.toString());

        const request = data.toString();
        const [requestLine] = request.split('\r\n');
        const [method, url] = requestLine.split(' ');

        console.log(`Method: ${method}, URL: ${url}`);

        const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 13\r\n\r\nHello, World!`;

        socket.write(response);

        socket.end();
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });

    socket.on('close', () => {
        console.log('Connection closed.');
    });

});
server.listen(4221, "localhost");
