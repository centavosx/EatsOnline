import io from 'socket.io-client'
const socket = io('ws://localhost:8001', {
  transports: ['websocket', 'polling'],
})

export default socket
