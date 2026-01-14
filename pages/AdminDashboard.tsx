
import React, { useState, useEffect } from 'react';

interface BusinessRecord {
  id: string;
  email: string;
  status: 'ACTIVE' | 'SUSPENDED';
  billing: 'PAID' | 'EXPIRED';
  presence: 'ONLINE' | 'OFFLINE';
}

const AdminDashboard: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businesses, setBusinesses] = useState<BusinessRecord[]>([
    { id: 'prime-dental-782', email: 'dr.sharma@gmail.com', status: 'ACTIVE', billing: 'PAID', presence: 'ONLINE' },
    { id: 'city-gym-990', email: 'owner@citygym.in', status: 'ACTIVE', billing: 'PAID', presence: 'OFFLINE' },
    { id: 'metro-bakery-441', email: 'sales@metro.co', status: 'SUSPENDED', billing: 'EXPIRED', presence: 'OFFLINE' },
    { id: 'zen-coaching-121', email: 'admin@zen.edu', status: 'ACTIVE', billing: 'PAID', presence: 'ONLINE' },
  ]);
  
  // Provisioning Modal State
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [newBizEmail, setNewBizEmail] = useState('');
  const [newBizName, setNewBizName] = useState('');
  const [newBizCustomId, setNewBizCustomId] = useState('');
  const [provisionSuccessId, setProvisionSuccessId] = useState<string | null>(null);
  const [provisionError, setProvisionError] = useState<string | null>(null);

  // Audit Modal State
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessRecord | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // SIMULATED REAL-TIME PRESENCE
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setBusinesses(prev => prev.map(b => {
        if (Math.random() > 0.95) {
          return { ...b, presence: b.presence === 'ONLINE' ? 'OFFLINE' : 'ONLINE' };
        }
        return b;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Harsh@123') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied. Unauthorized entry.');
    }
  };

  const sanitizeId = (input: string) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const provisionBusiness = () => {
    setProvisionError(null);

    if (!newBizName.trim() || !newBizEmail.trim()) {
      setProvisionError('Business Name and Owner Email are required.');
      return;
    }

    let finalId = '';
    
    // STRICT CHECK: Custom ID logic
    if (newBizCustomId.trim()) {
      finalId = sanitizeId(newBizCustomId);
      if (finalId.length < 1) {
        setProvisionError('Invalid Custom ID. Use alphanumeric characters.');
        return;
      }
      
      // Check if manually entered ID exists in registry
      const exists = businesses.some(b => b.id === finalId);
      if (exists) {
        setProvisionError(`ID Conflict: "${finalId}" is already assigned to another infrastructure record.`);
        return;
      }
    } else {
      // STRICT CHECK: Auto-generation uniqueness guarantee
      const baseSlug = sanitizeId(newBizName);
      let attempts = 0;
      let uniqueFound = false;

      while (!uniqueFound && attempts < 15) {
        const randomSuffix = Math.floor(100 + Math.random() * 899);
        const candidateId = baseSlug ? `${baseSlug}-${randomSuffix}` : `biz-${randomSuffix}`;
        
        if (!businesses.some(b => b.id === candidateId)) {
          finalId = candidateId;
          uniqueFound = true;
        }
        attempts++;
      }

      if (!uniqueFound) {
        setProvisionError('Infrastructure Failure: Could not generate a unique ID. Try a custom ID.');
        return;
      }
    }

    const newEntry: BusinessRecord = {
      id: finalId,
      email: newBizEmail,
      status: 'ACTIVE',
      billing: 'PAID',
      presence: 'OFFLINE'
    };

    setBusinesses([newEntry, ...businesses]);
    setProvisionSuccessId(finalId);
    setNewBizEmail('');
    setNewBizName('');
    setNewBizCustomId('');
  };

  const resetProvisionModal = () => {
    setShowProvisionModal(false);
    setProvisionSuccessId(null);
    setProvisionError(null);
  };

  const openAudit = (biz: BusinessRecord) => {
    setSelectedBusiness({ ...biz });
    setIsAuditModalOpen(true);
  };

  const updateBusinessRecord = () => {
    if (!selectedBusiness) return;
    setBusinesses(prev => prev.map(b => b.id === selectedBusiness.id ? selectedBusiness : b));
    setIsAuditModalOpen(false);
  };

  const liveSessionsCount = businesses.filter(b => b.presence === 'ONLINE').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-100 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Infrastructure Gate</h1>
            <p className="text-slate-500 text-sm">Corporate Admin Auth Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Required"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              Authorize Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-10 text-left">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Infrastructure Control</h1>
            <p className="text-slate-500 text-sm font-medium">Provisioning & Registry Management</p>
          </div>
          <button 
            onClick={() => setShowProvisionModal(true)}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all active:scale-95"
          >
            Provision New Business ID
          </button>
        </div>

        {/* Audit Management Modal */}
        {isAuditModalOpen && selectedBusiness && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6 text-left">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Registry Audit</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">{selectedBusiness.id}</p>
                </div>
                <button onClick={() => setIsAuditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Operational State</p>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedBusiness({...selectedBusiness, status: 'ACTIVE'})}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${selectedBusiness.status === 'ACTIVE' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-white text-slate-400 border border-slate-200'}`}
                      >
                        Active
                      </button>
                      <button 
                        onClick={() => setSelectedBusiness({...selectedBusiness, status: 'SUSPENDED'})}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${selectedBusiness.status === 'SUSPENDED' ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'bg-white text-slate-400 border border-slate-200'}`}
                      >
                        Suspended
                      </button>
                   </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Billing Status</p>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedBusiness({...selectedBusiness, billing: 'PAID'})}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${selectedBusiness.billing === 'PAID' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 border border-slate-200'}`}
                      >
                        Paid
                      </button>
                      <button 
                        onClick={() => setSelectedBusiness({...selectedBusiness, billing: 'EXPIRED'})}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${selectedBusiness.billing === 'EXPIRED' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-400 border border-slate-200'}`}
                      >
                        Expired
                      </button>
                   </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button onClick={() => setIsAuditModalOpen(false)} className="flex-1 py-3 text-slate-500 text-sm font-bold hover:bg-slate-50 rounded-xl">Discard</button>
                  <button onClick={updateBusinessRecord} className="flex-1 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-slate-800 active:scale-95">Update Registry</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Provisioning Modal */}
        {showProvisionModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 text-left">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 border border-slate-200 relative overflow-hidden">
              {!provisionSuccessId ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Provision Infrastructure</h2>
                    <button onClick={resetProvisionModal} className="text-slate-400 hover:text-slate-600 p-1">
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  {provisionError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 items-center text-red-700 animate-shake">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs font-bold">{provisionError}</p>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Business Name</label>
                      <input 
                        type="text" 
                        value={newBizName}
                        onChange={(e) => setNewBizName(e.target.value)}
                        placeholder="e.g. Prime Wellness"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Owner Email</label>
                      <input 
                        type="email" 
                        value={newBizEmail}
                        onChange={(e) => setNewBizEmail(e.target.value)}
                        placeholder="owner@domain.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Custom Call ID (Optional)</label>
                      <div className="flex items-center">
                        <span className="bg-slate-100 border border-r-0 border-slate-200 px-3 py-3 rounded-l-xl text-slate-400 text-sm font-medium">callsy.in/</span>
                        <input 
                          type="text" 
                          value={newBizCustomId}
                          onChange={(e) => {
                            setNewBizCustomId(e.target.value);
                            setProvisionError(null);
                          }}
                          placeholder="unique-id-123"
                          className={`flex-grow px-4 py-3 bg-slate-50 border rounded-r-xl outline-none focus:border-blue-500 transition-colors ${provisionError?.includes('Conflict') ? 'border-red-500' : 'border-slate-200'}`}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Strictly unique per registry record.</p>
                    </div>
                    
                    <div className="flex gap-4 mt-10">
                      <button onClick={resetProvisionModal} className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">Cancel</button>
                      <button onClick={provisionBusiness} className="flex-1 py-4 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 shadow-xl shadow-blue-100 transition-all active:scale-95">Activate Registry</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Provisioning Complete</h2>
                  <p className="text-slate-500 text-sm mb-8">Unique Business ID assigned and active.</p>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Public Call Link</p>
                    <div className="flex gap-2">
                      <input readOnly value={`callsy.in/#/call/${provisionSuccessId}`} className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-2 font-mono text-sm text-blue-700 font-bold" />
                      <button onClick={() => navigator.clipboard.writeText(`https://callsy.in/#/call/${provisionSuccessId}`)} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">Copy</button>
                    </div>
                  </div>
                  
                  <button onClick={resetProvisionModal} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Return to Registry</button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Businesses', value: businesses.length.toString(), trend: '+12%' },
            { label: 'Live Sessions', value: liveSessionsCount.toString(), trend: 'Real-time' },
            { label: 'Revenue (MTD)', value: `₹${(businesses.length * 199).toLocaleString()}`, trend: 'Gross' },
            { label: 'Call Volume', value: '8.4k', trend: '24h' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${stat.trend.includes('+') || i === 1 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 gap-4">
            <h2 className="font-bold text-slate-900 text-lg">Infrastructure Registry</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="text" placeholder="Filter ID..." className="text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 w-full md:w-64" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                  <th className="px-8 py-5">Call ID Path</th>
                  <th className="px-8 py-5">Session Status</th>
                  <th className="px-8 py-5">State</th>
                  <th className="px-8 py-5">Billing</th>
                  <th className="px-8 py-5 text-right">Ops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {businesses.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-mono">
                       <span className="text-slate-400 text-[10px]">callsy.in/call/</span>
                       <span className="font-bold text-blue-700">{row.id}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${row.presence === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                         <span className={`text-[10px] font-bold uppercase tracking-wider ${row.presence === 'ONLINE' ? 'text-green-600' : 'text-slate-400'}`}>
                           {row.presence}
                         </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${row.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${row.billing === 'PAID' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                         <span className="font-semibold text-slate-900">{row.billing}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => openAudit(row)} className="text-slate-900 font-bold hover:text-blue-700 transition-all px-4 py-2 hover:bg-blue-50 rounded-lg">Audit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
