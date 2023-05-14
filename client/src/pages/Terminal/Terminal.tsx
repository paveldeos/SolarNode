import {useEffect, useRef} from "react";
import 'xterm/css/xterm.css';
import {io, Socket} from 'socket.io-client';
import {Terminal as Xterm} from 'xterm';
import './terminal.scss'
import Layout from "../../components/Layout/Layout.tsx";

const Terminal: React.FC = () => {
    const termRef = useRef<Xterm | null>(null);
    const terminalContainerRef = useRef<HTMLDivElement | null>(null);
    const cellWidth = 9; // Adjust based on your font size
    const cellHeight = 17;

    useEffect(() => {
        if (!termRef.current) {
            const term = new Xterm()
            termRef.current = term;
            term.open(document.getElementById('terminal') as HTMLElement);
            const socket: Socket = io('http://localhost:3000');
            term.onData((data: string) => socket.emit('data', data));
            socket.on('data', (data: string) => {
                term.write(data);
            });

            const resizeObserver = new ResizeObserver(() => {
                const containerWidth = terminalContainerRef.current?.getBoundingClientRect().width || 0;
                const containerHeight = terminalContainerRef.current?.getBoundingClientRect().height || 0;
                const newCols = Math.floor(containerWidth / cellWidth);
                const newRows = Math.floor(containerHeight / cellHeight);
                term.resize(newCols, newRows);
            });

            resizeObserver.observe(terminalContainerRef.current as Element);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [cellHeight, cellWidth]);

    return (
        <Layout>
            <div>
                <h2 className={'terminal_title'}>Command Line</h2>
                <div id="terminal" ref={terminalContainerRef}></div>
            </div>
        </Layout>
    );
};

export default Terminal;
