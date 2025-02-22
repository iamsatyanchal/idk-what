import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Music, Users, MessageCircle } from 'lucide-react';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/playlist', icon: Music, label: 'Playlist' },
    { path: '/room', icon: Users, label: 'Room' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center p-2 ${
              location.pathname === path
                ? 'text-purple-600'
                : 'text-gray-600'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};