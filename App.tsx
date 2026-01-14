
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BusinessDashboard from './pages/BusinessDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CallPage from './pages/CallPage';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Infrastructure from './pages/Infrastructure';
import { UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Corporate Header */}
        <nav className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-[100]">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 z-[110]">
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Callsy</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/infrastructure" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Infrastructure</Link>
            <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Pricing</Link>
            {!user ? (
              <Link to="/login" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all shadow-sm">
                Business Login
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                {user.role === UserRole.BUSINESS && (
                  <Link to="/dashboard" className="text-sm font-bold text-blue-700 underline decoration-2 underline-offset-4">
                    Client Panel
                  </Link>
                )}
                <button 
                  onClick={() => { setUser(null); closeMenu(); }}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors z-[110]"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>

          {/* Mobile Overlay Menu */}
          <div className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-24 px-8`}>
            <div className="flex flex-col gap-8">
              <Link to="/infrastructure" onClick={closeMenu} className="text-2xl font-bold text-slate-900">Infrastructure</Link>
              <Link to="/pricing" onClick={closeMenu} className="text-2xl font-bold text-slate-900">Pricing</Link>
              <div className="h-px bg-slate-100 my-2"></div>
              {!user ? (
                <Link to="/login" onClick={closeMenu} className="w-full py-5 bg-slate-900 text-white text-center font-bold rounded-2xl text-lg shadow-xl">
                  Business Login
                </Link>
              ) : (
                <>
                  {user.role === UserRole.BUSINESS && (
                    <Link to="/dashboard" onClick={closeMenu} className="text-xl font-bold text-blue-700">Client Panel</Link>
                  )}
                  <button 
                    onClick={() => { setUser(null); closeMenu(); }}
                    className="text-xl font-bold text-slate-500 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
            <div className="mt-auto pb-12">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 italic">B2B Voice Infrastructure</p>
              <div className="flex gap-4 opacity-50 grayscale scale-90 origin-left">
                 <div className="font-black text-lg">CLINICS</div>
                 <div className="font-black text-lg">RETAIL</div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={(role) => setUser({ role })} />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route 
              path="/dashboard" 
              element={user?.role === UserRole.BUSINESS ? <BusinessDashboard /> : <Navigate to="/login" />} 
            />
            {/* Hidden admin route */}
            <Route 
              path="/admin8886" 
              element={<AdminDashboard />} 
            />
            <Route path="/call/:businessId" element={<CallPage />} />
            <Route path="/admin" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">C</span>
                </div>
                <span className="text-white font-bold">Callsy</span>
              </div>
              <p className="text-sm leading-relaxed">
                Critical communication infrastructure for modern Indian businesses. Built for scale, trust, and zero-latency performance.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Infrastructure</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link to="/infrastructure" className="hover:text-white transition-colors">WebRTC Signaling</Link></li>
                <li><Link to="/infrastructure" className="hover:text-white transition-colors">Global Edge Presence</Link></li>
                <li><Link to="/infrastructure" className="hover:text-white transition-colors">SLA Commitments</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Corporate</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy (7 Days)</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-[10px] text-center uppercase tracking-[0.4em] opacity-50 font-bold">
            &copy; {new Date().getFullYear()} Callsy.in. High-Availability Business Voice Infrastructure.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
