export interface User {
  id: string;
  username: string;
  stream?: MediaStream;
}

export interface Message {
  userId: string;
  username: string;
  message: string;
  timestamp: number;
}

export interface RoomState {
  roomId: string | null;
  users: User[];
  messages: Message[];
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
}