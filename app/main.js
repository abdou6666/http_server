const net = require("net");

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();
        if (request.startsWith('GET / ')) {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else if (request.includes("/user-agent")) {

            const splited = request.split('\n\r');
            console.log(request);
            let index = splited[0].indexOf('User-Agent:');
            let agent = '';
            for (let i = index; i < i < splited[0].length; i++) {
                if (splited[0][i] === '\r') {
                    break;
                }
                agent += splited[0][i];

            }
            let contentLength = agent.length - 12;
            const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${contentLength}\r\n\r\n${agent}`;


            socket.write(response);
        } else if (request.includes("/echo/")) {
            const content = request.split("/echo/")[1];
            let endpoint = '';
            for (let i = 0; i < content.length; i++) {
                if (content[i] === ' ') {
                    break;
                }
                endpoint += content[i];
            }
            const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${endpoint.length}\r\n\r\n${endpoint}`;
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
