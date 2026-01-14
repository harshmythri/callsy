
import React, { useState, useEffect, useRef } from 'react';
import { CallSession, QualityMetrics } from '../services/webrtc';

const BusinessDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [businessId] = useState('prime-dental-782');
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [callActive, setCallActive] = useState<boolean>(false);
  const [quality, setQuality] = useState<QualityMetrics['score']>('EXCELLENT');
  
  // Working Hours State
  const [hours, setHours] = useState([
    { day: 'Mon - Fri', start: '09:00', end: '20:00', enabled: true },
    { day: 'Saturday', start: '10:00', end: '16:00', enabled: true },
    { day: 'Sunday', start: '00:00', end: '00:00', enabled: false },
  ]);

  const sessionRef = useRef<CallSession | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const statsIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Simulated presence listener
    const timer = setTimeout(() => {
      if (isOnline) setIncomingCall(true);
    }, 15000);
    return () => {
      clearTimeout(timer);
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
      sessionRef.current?.close();
    };
  }, [isOnline]);

  const startStatsPolling = () => {
    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    statsIntervalRef.current = window.setInterval(async () => {
      if (sessionRef.current && callActive) {
        const stats = await sessionRef.current.getQualityStats();
        setQuality(stats.score);
      }
    }, 2000);
  };

  const handleAcceptCall = async () => {
    setIncomingCall(false);
    setCallActive(true);
    
    try {
      const session = new CallSession((remoteStream) => {
        if (audioRef.current) audioRef.current.srcObject = remoteStream;
      });
      sessionRef.current = session;
      await session.startLocalStream();
      startStatsPolling();
    } catch (err) {
      alert("Microphone required to receive calls.");
      setCallActive(false);
    }
  };

  const handleRejectCall = () => {
    setIncomingCall(false);
  };

  const handleEndCall = () => {
    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    sessionRef.current?.close();
    setCallActive(false);
  };

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].enabled = !newHours[index].enabled;
    setHours(newHours);
  };

  const getQualityColor = () => {
    switch(quality) {
      case 'EXCELLENT': return 'text-green-500';
      case 'GOOD': return 'text-yellow-500';
      case 'POOR': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 relative text-left">
      <audio ref={audioRef} autoPlay />
      
      {/* Incoming Call Overlay */}
      {incomingCall && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[3rem] shadow-2xl p-10 text-center border border-slate-200">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
              <div className="relative w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-200">
                <svg className="w-10 h-10 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Incoming Call</h3>
            <p className="text-slate-500 text-sm mb-10 font-medium">Customer inquiry via callsy.in/{businessId}</p>
            <div className="flex gap-4">
              <button onClick={handleRejectCall} className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100">Reject</button>
              <button onClick={handleAcceptCall} className="flex-1 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 shadow-xl active:scale-95">Accept</button>
            </div>
          </div>
        </div>
      )}

      {/* Active Call Status Bar */}
      {callActive && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-6 border border-slate-800 whitespace-nowrap">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-sm font-bold uppercase tracking-widest">Live Link Session</span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${getQualityColor()}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 22h20V2L2 22z" fillOpacity="0.3"/>
              <path d="M2 22h10V12L2 22z" fillOpacity={quality === 'POOR' ? '1' : '0'}/>
              <path d="M2 22h15V7L2 22z" fillOpacity={quality === 'GOOD' ? '1' : '0'}/>
              <path d="M2 22h20V2L2 22z" fillOpacity={quality === 'EXCELLENT' ? '1' : '0'}/>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{quality}</span>
          </div>
          <button onClick={handleEndCall} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">End Session</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Prime Dental Care</h1>
          <p className="text-slate-500 flex items-center gap-2 mt-1 text-sm font-medium">
            Infrastructure ID: <span className="font-mono text-slate-900 font-bold">{businessId}</span>
            <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-slate-300'}`}></span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest ${isOnline ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{isOnline ? 'Infrastructure Live' : 'Maintenance Mode'}</span>
          <button onClick={() => setIsOnline(!isOnline)} className={`w-14 h-8 rounded-full transition-all relative ${isOnline ? 'bg-blue-700' : 'bg-slate-200'}`}>
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${isOnline ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Public Connection Link</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-xl">Direct this link to your Google Maps 'Website' or 'Call' button for frictionless internet calling.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <span className="text-slate-400 text-xs font-medium mr-1 select-none">callsy.in/call/</span>
              <span className="text-blue-700 font-bold text-sm font-mono">{businessId}</span>
            </div>
            <button onClick={() => navigator.clipboard.writeText(`https://callsy.in/call/${businessId}`)} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg">Copy Link</button>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Inbound Metrics</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-end"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Successful Connections</span><span className="text-3xl font-bold text-slate-900">142</span></div>
            <div className="flex justify-between items-end"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Missed Inquiries</span><span className="text-3xl font-bold text-red-600">3</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
