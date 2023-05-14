import React, {useEffect, useRef} from "react";
import {Terminal} from "xterm";
import {FitAddon} from 'xterm-addon-fit';
import "xterm/css/xterm.css";

interface ITerminalProps {
    // Define any props you want to use
}

const TerminalComponent: React.FC<ITerminalProps> = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminal: Terminal = new Terminal({
        fontFamily: "Courier New",
        fontSize: 14,
        theme: {
            background: "#000000",
            foreground: "#ffffff",
        },
    });
    const fitAddon: FitAddon = new FitAddon();

    useEffect(() => {
        if (terminalRef.current) {
            terminal.loadAddon(fitAddon);
            terminal.open(terminalRef.current);
            fitAddon.fit();

            const socket = new WebSocket("ws://localhost:3000");

            socket.onerror = (error) => {
                console.error(`WebSocket error: ${error}`);
            };

            socket.onopen = () => {
                terminal.onData((data) => {
                    const message = JSON.stringify({
                        command: data,
                        userAddress: '0x286801EBc5Bc627a3bccb16b88Ab372c35f94563', // Replace with the actual Ethereum address of the user
                        nodeIp: '10.32.1.122', // Replace with the IP of the node you want to send the command to
                    });
                    socket.send(message);
                });

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (Array.isArray(data)) {
                        data.forEach(node => {
                            terminal.write(`Connected to node at ${node.nodeIp}\r\n`);
                        });
                    } else {
                        terminal.write(data);
                    }
                };
            };

            // Close the WebSocket when the component is unmounted
            return () => {
                terminal.dispose();
                socket.close();
            };
        }
    }, []);

    return <div ref={terminalRef}></div>;
};

export default TerminalComponent;
