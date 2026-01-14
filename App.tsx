import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
      <div className="min-h-screen flex flex-col bg-white">
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-[100]">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Callsy</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            <Link to="/infrastructure" className="text-sm font-semibold text-slate-500 hover:text-blue-700 transition-colors">Infrastructure</Link>
            <Link to="/pricing" className="text-sm font-semibold text-slate-500 hover:text-blue-700 transition-colors">Pricing</Link>
            {!user ? (
              <Link to="/login" className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95">
                Business Login
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                {user.role === UserRole.BUSINESS && (
                  <Link to="/dashboard" className="text-sm font-bold text-blue-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></span>
                    Manage Shop
                  </Link>
                )}
                <button 
                  onClick={() => { setUser(null); closeMenu(); }}
                  className="text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden p-2 text-slate-600 z-[110]">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>

          <div className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-32 px-10`}>
            <div className="flex flex-col gap-10">
              <Link to="/infrastructure" onClick={closeMenu} className="text-3xl font-black text-slate-900">Infrastructure</Link>
              <Link to="/pricing" onClick={closeMenu} className="text-3xl font-black text-slate-900">Pricing</Link>
              {!user ? (
                <Link to="/login" onClick={closeMenu} className="w-full py-6 bg-blue-700 text-white text-center font-black rounded-2xl text-xl shadow-2xl shadow-blue-200">
                  Business Login
                </Link>
              ) : (
                <Link to="/dashboard" onClick={closeMenu} className="text-2xl font-black text-blue-700">Client Panel</Link>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={(role) => setUser({ role })} />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/dashboard" element={user?.role === UserRole.BUSINESS ? <BusinessDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin8886" element={<AdminDashboard />} />
            <Route path="/call/:businessId" element={<CallPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-100 py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">C</span>
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900">Callsy</span>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                India's leading call link infrastructure for Google Business. Never miss a customer lead again.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Product</h4>
                <ul className="space-y-3 text-sm font-semibold text-slate-500">
                  <li><Link to="/pricing" className="hover:text-blue-700">Pricing</Link></li>
                  <li><Link to="/infrastructure" className="hover:text-blue-700">Technology</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Legal</h4>
                <ul className="space-y-3 text-sm font-semibold text-slate-500">
                  <li><a href="#" className="hover:text-blue-700">Privacy</a></li>
                  <li><a href="#" className="hover:text-blue-700">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-50 text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] text-center">
            &copy; {new Date().getFullYear()} Callsy.in. Secure B2B Communications.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;