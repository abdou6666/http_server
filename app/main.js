const net = require("net");

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();
        if (request.startsWith('GET / ')) {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        }
        else if (request.includes("/echo/")) {
            const content = request.split("/echo/")[1];
            socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`);
        }
        else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        socket.end();
    });

    socket.on("close", () => {
        socket.end();
        server.close();
    });
});
server.listen(4221, "localhost");
