import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Send } from 'lucide-react';

export const Chat = () => {
  const { messages, addMessage } = useStore();
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      addMessage({
        userId: 'current-user',
        username: 'You',
        message: newMessage,
        timestamp: Date.now()
      });
      setNewMessage('');
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-16 w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              msg.userId === 'current-user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="text-sm text-gray-600 mb-1">{msg.username}</div>
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                msg.userId === 'current-user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="p-2 bg-purple-600 text-white rounded-full"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};