
// This is a service skeleton for Firebase integration.
// In a real environment, process.env.FIREBASE_CONFIG would be used.

export const firebaseConfig = {
  apiKey: "AIzaSy... (mock)",
  authDomain: "callsy-in.firebaseapp.com",
  projectId: "callsy-in",
  storageBucket: "callsy-in.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

/**
 * ARCHITECTURE EXPLANATION:
 * 1. Firestore: Stores persistent business metadata, user roles, and historical call logs.
 * 2. Realtime DB: Used as the low-latency signaling channel for WebRTC.
 *    - /calls/{businessId}: Stores current active call state (offer, answer).
 *    - /presence/{businessId}: Tracks if the business dashboard is currently active (online).
 */

export const getPresencePath = (id: string) => `presence/${id}`;
export const getCallSignalingPath = (id: string) => `calls/${id}`;

// Mocking some service functions for the UI demo
export const mockLogin = async () => {
  return { uid: 'mock-user-123', email: 'owner@example.com', role: 'BUSINESS' };
};
