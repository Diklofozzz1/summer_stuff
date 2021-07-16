import io from 'socket.io-client';

const socket = io.connect("http://127.0.0.1:3080", {
    reconnection: false,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    source: true,
    rejectUnauthorized: false,
    forceNew: true,
    timeout: 60000,
    pingTimeout: 60000
});

export default socket;
