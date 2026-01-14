
import React from 'react';

const Infrastructure: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-20">
          <p className="text-blue-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Engineering Manifesto</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            P2P Voice Grid <br/>Architecture
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl">
            Technical breakdown of how Callsy routes browser-based voice traffic without traditional telecom towers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">1. Signaling Flow</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Callsy utilizes a dual-engine signaling stack. Metadata and call presence are handled via Firebase Realtime Database (RTDB), ensuring sub-50ms synchronization between the caller and business dashboard.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                ICE Candidate Exchange (STUN/TURN)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                SDP Offer/Answer Negotiation
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                DTLS/SRTP Encryption Layer
              </div>
            </div>
          </div>
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-bold mb-6">2. WebRTC Integration</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Direct Peer-to-Peer audio streaming. Once a connection is established, audio packets (Opus codec) travel directly between the two browsers. No server ever touches your voice data.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-blue-500 font-bold">01</span>
                <div>
                  <h4 className="text-sm font-bold">Opus Codec</h4>
                  <p className="text-xs text-slate-500">Variable bitrate optimization for 4G/5G networks.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-blue-500 font-bold">02</span>
                <div>
                  <h4 className="text-sm font-bold">E2E Encryption</h4>
                  <p className="text-xs text-slate-500">Secure SRTP transmission by default.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Security & Presence Logic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Presence Tracking</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We use Firebase heartbeat listeners to detect if a business is truly online. The 'Call Now' button only activates when a business dashboard is active and authenticated.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Auth Isolation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Firestore Rules strictly separate Admin, Business, and Caller roles. Call IDs are cryptographically tied to the provisioning record.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Rate Limiting</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                DDoS protection at the signaling layer prevents call spam. Each session is ephemeral and destroyed upon disconnect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
