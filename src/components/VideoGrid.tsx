import React from 'react';
import { useStore } from '../store/useStore';

export const VideoGrid = () => {
  const { users } = useStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {users.map((user) => (
        <div key={user.id} className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {user.stream ? (
            <video
              autoPlay
              playsInline
              muted={user.id === useStore.getState().currentUser?.id}
              ref={(video) => {
                if (video && user.stream) video.srcObject = user.stream;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg">{user.username}</span>
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
            {user.username}
          </div>
        </div>
      ))}
    </div>
  );
};