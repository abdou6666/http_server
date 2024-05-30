const net = require("net");

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();
        if (request.startsWith('GET / ')) {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        }
        else if (request.includes("/echo/")) {
            const content = request.split("/echo/")[1];

            // console.log(content.length);
            let endpoint = '';
            for (let i = 0; i < content.length; i++) {
                if (content[i] === ' ') {
                    break;
                }
                endpoint += content[i];
            }
            const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${endpoint.length}\r\n\r\n${endpoint}`;
            console.log({ response });
            socket.write(response);
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
