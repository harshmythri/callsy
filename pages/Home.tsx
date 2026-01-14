
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 1. Hero Section: Direct & Simple */}
      <section className="bg-white pt-12 md:pt-24 pb-16 px-6 text-center max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-blue-800 text-[11px] font-bold uppercase tracking-widest">Available now in India</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Get more customers from <br />
            <span className="text-blue-700">Google Business.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Stop losing customers because your mobile is "Busy". <br className="hidden md:block" /> 
            Give them a 1-click call link. Simple, fast, and professional.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/login" className="px-10 py-5 bg-blue-700 text-white rounded-2xl font-bold text-xl hover:bg-blue-800 shadow-2xl shadow-blue-200 transition-all active:scale-95 text-center">
              Create Your Call Link
            </Link>
            <Link to="/pricing" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-bold text-xl hover:border-slate-300 transition-all text-center">
              See Pricing (₹199)
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
            <div className="font-black text-xl tracking-tighter">CLINICS</div>
            <div className="font-black text-xl tracking-tighter">GYMS</div>
            <div className="font-black text-xl tracking-tighter">ACADEMIES</div>
            <div className="font-black text-xl tracking-tighter">SHOPS</div>
          </div>
        </div>
      </section>

      {/* 2. The Problem vs Solution (Visual) */}
      <section className="bg-slate-50 py-20 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">Why do you need Callsy?</h2>
              <p className="text-slate-600 mb-8 font-medium">When customers search for you on Google, they want to talk NOW. If your phone is busy, they call your competitor.</p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-5 bg-white rounded-2xl border-l-4 border-red-500 shadow-sm">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold">!</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Old Way: Phone is Busy</h4>
                    <p className="text-sm text-slate-500">You are talking to one customer. The next customer hears a "Busy Tone" and hangs up.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white rounded-2xl border-l-4 border-green-500 shadow-sm">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Callsy Way: Never Busy</h4>
                    <p className="text-sm text-slate-500">Multiple people can call your link at the same time. You never miss a single lead.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
               <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl text-white transform md:rotate-2">
                  <div className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Incoming Inquiry</span>
                    <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Live Link</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                    <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                  </div>
                  <div className="py-6 px-4 bg-blue-700 rounded-2xl text-center font-bold text-lg animate-pulse">
                    PICK UP CALL
                  </div>
                  <p className="mt-6 text-[10px] text-center text-slate-500 uppercase tracking-widest">No SIM card or mobile signal needed.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Easy Steps for Shop Owners */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-16">Setup is very easy</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-left">
            <div className="group">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all">1</div>
              <h3 className="text-xl font-bold mb-4">Get Your Link</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Choose your business name to get a link like <span className="font-bold text-slate-900">callsy.in/my-shop</span></p>
            </div>
            
            <div className="group">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all">2</div>
              <h3 className="text-xl font-bold mb-4">Add to Google</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Paste this link on your Google Maps profile as your "Website" or "Contact Link".</p>
            </div>

            <div className="group">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all">3</div>
              <h3 className="text-xl font-bold mb-4">Talk to Customers</h3>
              <p className="text-slate-500 text-sm leading-relaxed">When a customer clicks the link on their phone, your laptop or mobile rings. Simply talk!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing Anchor */}
      <section className="bg-slate-900 py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-6">Built for Indian Business.</h2>
          <p className="text-slate-400 mb-12 text-lg max-w-xl mx-auto">We don't do free trials. We provide high-quality call systems for owners who value their time.</p>
          
          <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] p-10 text-slate-900 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Fixed Monthly Cost</div>
            <div className="mb-8">
               <span className="text-5xl font-black">₹199</span>
               <span className="text-slate-400 font-bold ml-2">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center gap-3 font-bold text-sm">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Unlimited Incoming Calls
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Unique Business ID
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Open & Close Timings
              </li>
            </ul>
            <Link to="/login" className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Quick Questions (FAQ) */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Common Questions</h2>
          <div className="space-y-8 text-left">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Do I need a new SIM card?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">No. Callsy works on the internet. You don't need a SIM card or a new phone number. It works in your browser like a website.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Can I use it on my phone?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Yes. Just open your Callsy dashboard on your phone browser (Chrome or Safari). You can pick up calls from anywhere.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">How do customers call me?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Customers simply click your link on Google or your website. They don't need to download any app or pay any charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="bg-blue-700 py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-black mb-8 leading-tight">Ready to stop missing customers?</h2>
        <Link to="/login" className="inline-block px-12 py-5 bg-white text-blue-700 rounded-2xl font-bold text-xl hover:bg-slate-50 shadow-2xl shadow-blue-900 transition-all active:scale-95">
          Activate Your Link Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
