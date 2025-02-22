import React from 'react';
import { Mic, MicOff, Video, VideoOff, Monitor, MessageCircle, Phone } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Controls = () => {
  const {
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    setAudioEnabled,
    setVideoEnabled,
    setScreenSharing
  } = useStore();

  const toggleAudio = () => setAudioEnabled(!isAudioEnabled);
  const toggleVideo = () => setVideoEnabled(!isVideoEnabled);
  
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        // Handle screen sharing stream
        setScreenSharing(true);
      } catch (err) {
        console.error('Error sharing screen:', err);
      }
    } else {
      setScreenSharing(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full ${
            isAudioEnabled ? 'bg-purple-600 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        
        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full ${
            isVideoEnabled ? 'bg-purple-600 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        
        <button
          onClick={toggleScreenShare}
          className={`p-4 rounded-full ${
            isScreenSharing ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <Monitor size={24} />
        </button>
        
        <button className="p-4 rounded-full bg-gray-200 text-gray-700">
          <MessageCircle size={24} />
        </button>
        
        <button className="p-4 rounded-full bg-red-500 text-white">
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
};