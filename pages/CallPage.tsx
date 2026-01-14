
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CallSession, QualityMetrics } from '../services/webrtc';

const CallPage: React.FC = () => {
  const { businessId } = useParams();
  const [callStatus, setCallStatus] = useState<'IDLE' | 'RINGING' | 'CONNECTED'>('IDLE');
  const [businessName] = useState('Prime Dental Care');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [quality, setQuality] = useState<QualityMetrics['score']>('EXCELLENT');
  
  const sessionRef = useRef<CallSession | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const statsIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Simulated presence check for the specific business ID
    const checkAvailability = () => {
      // Mock logic: Sunday is closed, otherwise 9-8
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      if (day === 0) setIsAvailable(false); // Sunday
      else if (hour < 9 || hour >= 20) setIsAvailable(false); // 9am-8pm
      else setIsAvailable(true);
      
      setIsLoading(false);
    };

    setTimeout(checkAvailability, 1000);
    document.title = `Call ${businessName} - Callsy Voice Link`;
    return () => {
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
      sessionRef.current?.close();
    };
  }, [businessName]);

  const startStatsPolling = () => {
    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    statsIntervalRef.current = window.setInterval(async () => {
      if (sessionRef.current && callStatus === 'CONNECTED') {
        const stats = await sessionRef.current.getQualityStats();
        setQuality(stats.score);
      }
    }, 2000);
  };

  const handleStartCall = async () => {
    setCallStatus('RINGING');
    try {
      const session = new CallSession((remoteStream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = remoteStream;
          setCallStatus('CONNECTED');
          startStatsPolling();
        }
      });
      
      sessionRef.current = session;
      await session.startLocalStream();
      
      // Simulate connection delay for UI feedback
      setTimeout(() => {
        setCallStatus('CONNECTED');
        startStatsPolling();
      }, 4000);
      
    } catch (err) {
      alert("Microphone access is mandatory for internet voice calls.");
      setCallStatus('IDLE');
    }
  };

  const handleEndCall = () => {
    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    sessionRef.current?.close();
    setCallStatus('IDLE');
  };

  const getQualityColor = () => {
    switch(quality) {
      case 'EXCELLENT': return 'text-green-500';
      case 'GOOD': return 'text-yellow-500';
      case 'POOR': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <audio ref={audioRef} autoPlay />
      
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-700 to-blue-400"></div>
        
        <div className="p-12">
          <div className="mb-12">
            <div className="w-20 h-20 bg-blue-50 border-2 border-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-50">
              <svg className="w-10 h-10 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight mb-2 tracking-tight">{businessName}</h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">Secure Infrastructure Voice Link</p>
          </div>

          {isAvailable ? (
            <div className="space-y-8">
              {callStatus === 'IDLE' ? (
                <>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">No SIM Card Required</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      One-tap browser connection. Zero call charges. High-definition P2P audio.
                    </p>
                  </div>
                  <button 
                    onClick={handleStartCall}
                    className="w-full py-6 bg-blue-700 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-4 group"
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    Start Internet Call
                  </button>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Business is Online</span>
                  </div>
                </>
              ) : (
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl animate-in fade-in zoom-in duration-300">
                  <div className="mb-10 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                       {callStatus === 'CONNECTED' ? (
                         <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-1.5 items-end h-10">
                              {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s`, height: `${40 + Math.random() * 60}%` }}></div>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
                               <svg className={`w-3 h-3 ${getQualityColor()}`} fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M2 22h20V2L2 22z" fillOpacity="0.3"/>
                                  <path d="M2 22h10V12L2 22z" fillOpacity={quality === 'POOR' ? '1' : '0'}/>
                                  <path d="M2 22h15V7L2 22z" fillOpacity={quality === 'GOOD' ? '1' : '0'}/>
                                  <path d="M2 22h20V2L2 22z" fillOpacity={quality === 'EXCELLENT' ? '1' : '0'}/>
                               </svg>
                               <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{quality} Link</span>
                            </div>
                         </div>
                       ) : (
                         <>
                           <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                           <div className="relative w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center">
                              <svg className="w-10 h-10 text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                           </div>
                         </>
                       )}
                    </div>
                    <p className="text-xl font-black tracking-tight uppercase">
                      {callStatus === 'RINGING' ? 'Connecting Link' : 'Secure Audio Active'}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em] font-bold">End-to-End Encrypted Session</p>
                  </div>
                  <button 
                    onClick={handleEndCall}
                    className="w-full py-5 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl active:scale-95"
                  >
                    Disconnect Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200">
              <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Office is Closed</h2>
              <p className="text-slate-500 text-xs leading-relaxed mb-8 font-medium">
                Business hours: 9:00 AM - 8:00 PM. <br/>Infrastructure is currently suspended.
              </p>
              <Link to="/" className="text-xs font-bold text-blue-700 uppercase tracking-widest border-b border-blue-100 pb-1">Learn about Callsy</Link>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-50">
             <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Encrypted via Callsy P2P Infrastructure</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-6 opacity-30">
        <span className="text-[10px] font-bold uppercase tracking-widest">Opus Codec</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">WebRTC 2.0</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">No Log Policy</span>
      </div>
    </div>
  );
};

export default CallPage;
