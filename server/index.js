const express = require('express');
const cors = require('cors');
const SSHClient = require('ssh2').Client;
const db = require('./db');

const app = express();
const server = require('http').createServer(app);
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' 
}));
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.get('/ssh-nodes/:blockchain/:ethAddress', async (req, res) => {
    try {
        const nodes = await db.getNodesByBlockchainAndEthAddress(req.params.blockchain, req.params.ethAddress);
        res.json(nodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// db.saveNode({
//     ethAddress: '0x173920A5F6a57715B3242BE61F10b482C0A50A8A',
//     ipAddress: '10.32.1.122',
//     port: '23',
//     blockchain: 'Ethereum',
// }).then(() => console.log('SSH node saved'));

server.listen(3000, function () {
    console.log('Server listening on port 3000');
});

io.on('connection', function(socket){
    const conn = new SSHClient();
    conn.on('ready', function() {
        console.log('SSH Connection :: ready');
        conn.shell(function(err, stream) {
            if (err) return socket.emit('data', err.message);
            socket.on('data', function(data) {
                stream.write(data);
            });
            stream.on('data', function(d) {
                socket.emit('data', d.toString('binary'));
            }).on('close', function() {
                conn.end();
            });
        });
    }).on('error', function(err) {
        socket.emit('data', "\r\n*** SSH CONNECTION ERROR: " + err.message + " ***\r\n");
    }).connect({
        host: '10.32.1.122',
        port: '23',
        username: 'banana',
        password: 'BPI-M2-zero'
    });
});
