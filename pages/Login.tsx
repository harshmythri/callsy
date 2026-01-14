
import React from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-700 rounded-lg mb-4 shadow-lg shadow-blue-100">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Access Control Panel</h2>
          <p className="text-slate-500 text-sm mt-2">Sign in to manage your business communication.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin(UserRole.BUSINESS)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Sign in with Google
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Enterprise Access</span></div>
          </div>

          <button 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Admin Infrastructure Login
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          By signing in, you agree to Callsy's terms of business service.
        </p>
      </div>
    </div>
  );
};

export default Login;
