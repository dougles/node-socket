const net = require('net');
const readline = require('readline');

const clientName = process.argv[2] || ('guest' + Date.now());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const client = net.createConnection({port: 9000}, () => {
    console.log(clientName + ': I connected to the server.');
    client.write(clientName + ': Hello this is client!');
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log(clientName + ': I disconnected from the server.');
})

rl.on('line', (input) => {
    if (input === 'exit') {
        client.end();
    } else {
        client.write(`${clientName}: ${input}`);
    }
});