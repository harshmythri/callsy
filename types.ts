
export enum UserRole {
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS',
  CALLER = 'CALLER'
}

export interface BusinessProfile {
  id: string; // The Callsy ID (e.g., 'clinic-302')
  name: string;
  category: string;
  ownerEmail: string;
  isOpen: boolean;
  workingHours: {
    start: string; // HH:mm
    end: string;   // HH:mm
  };
  isActive: boolean;
  createdAt: number;
}

export interface CallLog {
  id: string;
  businessId: string;
  timestamp: number;
  duration: number; // seconds
  status: 'COMPLETED' | 'MISSED' | 'REJECTED';
}

export interface WebRTCState {
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  iceCandidates: RTCIceCandidateInit[];
  status: 'IDLE' | 'CALLING' | 'CONNECTED' | 'DISCONNECTED';
}
