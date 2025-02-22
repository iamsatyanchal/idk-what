import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { VideoGrid } from './components/VideoGrid';
import { Controls } from './components/Controls';
import { Chat } from './components/Chat';
import { useStore } from './store/useStore';
import { v4 as uuidv4 } from 'uuid';

const RoomPage = () => {
  const { roomId } = useParams();
  const { setRoomId, currentUser } = useStore();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      const username = prompt('Enter your name to join the room:');
      if (!username) {
        navigate('/');
        return;
      }
      useStore.getState().setCurrentUser({
        id: uuidv4(),
        username
      });
    }

    if (roomId) {
      setRoomId(roomId);
      // Initialize WebRTC and connect to room
      setIsJoining(false);
    }
  }, [roomId, currentUser, navigate, setRoomId]);

  if (isJoining) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24"> {/* Space for Controls */}
        <VideoGrid />
      </div>
      <Controls />
      <Chat />
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Video Chat</h1>
        <div className="space-y-4">
          <button
            onClick={createRoom}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Create New Room
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">or</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">Join Existing Room</h2>
            <input
              type="text"
              placeholder="Enter room ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const roomId = e.currentTarget.value.trim();
                  if (roomId) navigate(`/room/${roomId}`);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;