import React from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Player = () => {
  const { currentRoom } = useStore();
  const track = currentRoom?.currentTrack;

  if (!track) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="w-12 h-12 rounded-lg"
        />
        <div className="flex-1">
          <h3 className="font-semibold truncate">{track.title}</h3>
          <p className="text-sm text-gray-600 truncate">{track.artist}</p>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-6 mt-4">
        <button className="text-gray-600">
          <SkipBack size={24} />
        </button>
        <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white">
          {currentRoom?.isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} />
          )}
        </button>
        <button className="text-gray-600">
          <SkipForward size={24} />
        </button>
      </div>
      
      <div className="mt-2">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-purple-600 rounded-full"
            style={{ width: '45%' }}
          />
        </div>
      </div>
    </div>
  );
};