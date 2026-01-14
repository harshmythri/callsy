
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">One Plan. Complete Infrastructure.</h1>
        <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto font-medium">
          We don't offer free plans because professional businesses require professional reliability. 
          ₹199 covers the cost of global P2P signaling and 99.9% uptime.
        </p>

        <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 bg-blue-700 text-white px-8 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">Standard B2B</div>
          
          <div className="mb-10">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Callsy Starter</h3>
            <p className="text-slate-500 font-medium">Unlimited incoming calls from Google.</p>
          </div>

          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-6xl font-black text-slate-900">₹199</span>
            <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">/month</span>
          </div>

          <div className="space-y-6 mb-12">
            {[
              "Unique @callsy Business ID",
              "Unlimited Incoming P2P Audio Calls",
              "Dynamic Working Hours Management",
              "Instant Browser-to-Browser Connectivity",
              "SEO-Optimized Public Call Page",
              "No SIM Card or Phone Number Required"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-700 font-bold text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Link to="/login" className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-xl">
            Start Paid Subscription
          </Link>
          
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refund Policy</p>
              <p className="text-xs font-bold text-slate-900">7-Day Guarantee</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billing</p>
              <p className="text-xs font-bold text-slate-900">Cancel Anytime</p>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto text-left space-y-8">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Why No Free Plan?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              VoIP and WebRTC signaling require high-availability servers. Free services often compromise on audio quality or data privacy. Callsy is a paid-only product to ensure your business calls are never dropped or snooped upon.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">What It Replaces</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              It replaces the need for secondary SIM cards, expensive desk phones, and complex IVR systems. Just one link for all your incoming leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
