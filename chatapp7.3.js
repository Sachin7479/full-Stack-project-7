import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function ChatApp() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat', data => {
      setChat(prev => [...prev, data]);
    });
  }, []);

  const send = () => {
    if (name && message) {
      socket.emit('chat', { name, message });
      setMessage('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>Real-Time Chat</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={send}>Send</button>
      <div style={{ marginTop: '20px' }}>
        {chat.map((c, i) => (
          <p key={i}><strong>{c.name}:</strong> {c.message} <em>({c.time})</em></p>
        ))}
      </div>
    </div>
  );
}

export default ChatApp;
