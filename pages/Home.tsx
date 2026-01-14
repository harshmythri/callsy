
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="hero-gradient relative pt-16 md:pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full bg-white border border-slate-100 shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Built for Indian MSMEs</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[0.95]">
            Capture every lead <br className="hidden md:block" />
            from <span className="text-blue-700">Google Maps.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-500 mb-12 max-w-3xl leading-relaxed font-semibold">
            Stop losing customers when your mobile is "Busy". Get a dedicated Call Link for your Google Business profile and talk directly from your browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-20">
            <Link to="/login" className="px-12 py-6 bg-blue-700 text-white rounded-[2rem] font-black text-xl hover:bg-blue-800 shadow-2xl shadow-blue-200 transition-all active:scale-95 text-center">
              Get Your Call Link
            </Link>
            <Link to="/pricing" className="px-12 py-6 bg-white border-2 border-slate-200 text-slate-900 rounded-[2rem] font-black text-xl hover:border-slate-300 transition-all text-center">
              View Plan (₹199)
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-10 opacity-30">
            <span className="text-xs font-black uppercase tracking-widest">Used by Clinics</span>
            <span className="text-xs font-black uppercase tracking-widest">Gyms</span>
            <span className="text-xs font-black uppercase tracking-widest">Coaching Centers</span>
            <span className="text-xs font-black uppercase tracking-widest">Service Shops</span>
          </div>
        </div>
        
        {/* Subtle Background Art */}
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-50 -z-0"></div>
      </section>

      {/* 2. Key Problem Solver */}
      <section className="py-24 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] text-white">
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">P2P Secure Signaling</span>
              </div>
              <div className="space-y-4 mb-12">
                <div className="h-3 w-2/3 bg-slate-800 rounded-full"></div>
                <div className="h-3 w-1/2 bg-slate-800 rounded-full"></div>
              </div>
              <div className="bg-blue-600 rounded-2xl p-6 text-center shadow-lg shadow-blue-900/40">
                <span className="font-black text-xl tracking-tight">INCOMING CUSTOMER CALL</span>
              </div>
              <p className="text-center text-[10px] text-slate-500 font-bold mt-8 uppercase tracking-widest">No mobile tower signal needed. Works on Wi-Fi/4G.</p>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
              <p className="text-[10px] font-black text-blue-700 uppercase mb-2">Benefit #1</p>
              <p className="text-sm font-bold text-slate-900">Handle 10+ calls at the same time.</p>
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">Your phone is not <br />built for business.</h2>
            <p className="text-lg text-slate-500 font-semibold mb-10 leading-relaxed">
              When a new customer finds you on Google and tries to call, a "Busy Tone" is a lost sale. Callsy ensures you are always reachable via an internet link.
            </p>
            <div className="space-y-6">
              {[
                { t: "Never Busy", d: "Standard mobiles handle one call. Callsy links handle multiple calls simultaneously." },
                { t: "Keep Your Number Private", d: "No need to share your personal WhatsApp or mobile number with strangers." },
                { t: "Pick up Anywhere", d: "Answer calls on your Laptop, Tablet or Phone—wherever you are online." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg mb-1">{item.t}</h4>
                    <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 3-Step Setup */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-20 tracking-tight">Active in 3 minutes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left relative">
            {/* Step 1 */}
            <div>
              <div className="text-8xl font-black text-slate-200 mb-6 -ml-2 select-none">01</div>
              <h3 className="text-2xl font-black mb-4">Register your ID</h3>
              <p className="text-slate-500 font-semibold text-sm leading-relaxed">Get a unique link like <span className="text-blue-700">callsy.in/my-clinic</span></p>
            </div>
            {/* Step 2 */}
            <div>
              <div className="text-8xl font-black text-slate-200 mb-6 -ml-2 select-none">02</div>
              <h3 className="text-2xl font-black mb-4">Paste on Google</h3>
              <p className="text-slate-500 font-semibold text-sm leading-relaxed">Put the link in your Google Business profile as your "Contact Link".</p>
            </div>
            {/* Step 3 */}
            <div>
              <div className="text-8xl font-black text-slate-200 mb-6 -ml-2 select-none">03</div>
              <h3 className="text-2xl font-black mb-4">Pick Up & Grow</h3>
              <p className="text-slate-500 font-semibold text-sm leading-relaxed">When customers click, your device rings. Talk and convert leads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Pricing */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Professional infrastructure, <br />for the price of a coffee.</h2>
          <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-[3rem] p-12 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] relative">
            <div className="absolute top-0 right-10 bg-blue-700 text-white px-6 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-widest">Single Fixed Plan</div>
            <div className="mb-10">
              <span className="text-6xl font-black text-slate-900">₹199</span>
              <span className="text-slate-400 font-bold ml-2">/month</span>
            </div>
            <ul className="text-left space-y-5 mb-12">
              <li className="flex gap-3 text-sm font-bold text-slate-600">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                Unlimited Incoming Audio
              </li>
              <li className="flex gap-3 text-sm font-bold text-slate-600">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                Professional Business ID
              </li>
              <li className="flex gap-3 text-sm font-bold text-slate-600">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                Open/Close Time Manager
              </li>
            </ul>
            <Link to="/login" className="block w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              Activate My Link
            </Link>
          </div>
          <p className="mt-12 text-xs font-black text-slate-300 uppercase tracking-[0.4em]">Zero Setup Fees &bull; Cancel Anytime &bull; 7-Day Refund</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
