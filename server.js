const net = require('net');
const server = net.createServer();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

server.on("connection", (socket) => {
    console.log("new client connection is made", socket.remoteAddress + ":" + socket.remotePort);

    socket.on("data", (data) => {
        console.log(data.toString());
    });

    socket.once("close", (data) => {
        console.log("client connection closed.", data);
    });

    socket.on("error", (err) => {
        console.log("client Error", err);
    });

    socket.write('SERVER: Hello! Connection successfully made.<br>');

    rl.on('line', (input) => {
        socket.write(`SERVER: ${input}`);
    });
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    } else {
        console.log("Server failed.")
    }
});

server.listen(9000, () => {
    console.log('Server on %j', server.address().port);
});