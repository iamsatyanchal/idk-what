import { create } from 'zustand';
import { User, Message, RoomState } from '../types';

interface AppState extends RoomState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setRoomId: (roomId: string | null) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  updateUserStream: (userId: string, stream: MediaStream) => void;
  addMessage: (message: Message) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setVideoEnabled: (enabled: boolean) => void;
  setScreenSharing: (enabled: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  roomId: null,
  users: [],
  messages: [],
  isAudioEnabled: true,
  isVideoEnabled: true,
  isScreenSharing: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setRoomId: (roomId) => set({ roomId }),
  
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  
  removeUser: (userId) => set((state) => ({
    users: state.users.filter(user => user.id !== userId)
  })),
  
  updateUserStream: (userId, stream) => set((state) => ({
    users: state.users.map(user => 
      user.id === userId ? { ...user, stream } : user
    )
  })),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  
  setAudioEnabled: (enabled) => set({ isAudioEnabled: enabled }),
  setVideoEnabled: (enabled) => set({ isVideoEnabled: enabled }),
  setScreenSharing: (enabled) => set({ isScreenSharing: enabled })
}));