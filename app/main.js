const net = require("net");

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('Received data:\n', data.toString());

        const request = data.toString();
        const [requestLine] = request.split('\r\n');
        const [method, url] = requestLine.split(' ');

        console.log(`Method: ${method}, URL: ${url}`);

        const response = "HTTP/1.1 200 OK\r\n\r\n";

        socket.write(response);

        socket.end();
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });


});
server.listen(4221, "localhost");
