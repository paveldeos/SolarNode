const term = new Terminal();
const socket = io();

term.open(document.getElementById('terminal'));
term.write('Welcome to the web terminal!\r\n');

term.onData(data => {
    socket.emit('command', data);
});

socket.on('output', (data) => {
    term.write(data);
});
