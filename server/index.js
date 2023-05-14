const express = require('express');
const cors = require('cors');
const SSHClient = require('ssh2').Client;

const app = express();
const server = require('http').createServer(app);
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173' // allow only the React application at this address to access the server
}));
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
});


app.use(express.static('public'));

server.listen(3000, function () {
  console.log('Server listening on port 3000');
});

// server.js
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

// const express = require('express');
// const { Server } = require('ws');
// const { exec } = require('child_process');
// const mongoose = require('mongoose');

// const app = express();

// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

// const nodeSchema = new mongoose.Schema({
//   userAddress: String,
//   nodeIp: String
// });

// const Node = mongoose.model('Node', nodeSchema);

// const server = app.listen(3000, function() {
//   console.log('Listening on port 3000');
// });

// const wss = new Server({ server });

// wss.on('connection', (ws) => {
//   ws.on('error', (error) => {
//     console.error(`WebSocket error: ${error}`);
//   });

//   ws.on('message', (message) => {
//     const { command, userAddress, nodeIp } = JSON.parse(message);

//     if (userAddress) {
//       Node.find({ userAddress }, (err, nodes) => {
//         if (err) {
//           console.error(err);
//         } else {
//           ws.send(JSON.stringify(nodes));
//         }
//       });
//     }

//     if (command && nodeIp) {
//       exec(`ssh user@${nodeIp} ${command}`, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`exec error: ${error}`);
//           ws.send(`Error: ${error}`);
//           return;
//         }

//         if (stderr) {
//           console.error(`stderr: ${stderr}`);
//           ws.send(`Error: ${stderr}`);
//           return;
//         }

//         ws.send(stdout);
//       });
//     }
//   });
// });
