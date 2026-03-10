import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import bowl from '../assets/bowl.png';

const LandingHero = ({ setPage }) => {
    return (
        <main className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-20 items-center overflow-x-hidden">
            <div className="space-y-8">
                <div className="inline-block animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <span className="text-xs font-black tracking-[0.2em] text-[#00E676] uppercase">Instant Food Analysis</span>
                </div>

                <h1 className="text-7xl md:text-8xl font-black text-[#1F2937] leading-[0.9] tracking-tighter animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                    Scan Your Food
                </h1>

                <p className="text-lg text-[#6B7280] leading-relaxed max-w-lg font-medium animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                    Identify nutrition instantly from your photos with our advanced AI technology.
                    Transform your diet with just one click. Healthy eating made simple and transparent.
                </p>

                <div className="flex flex-wrap gap-4 pt-4 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                    <button
                        onClick={() => setPage('upload')}
                        className="bg-[#00E676] text-black font-black px-8 py-5 rounded-2xl flex items-center gap-3 shadow-2xl shadow-green-200 hover:scale-105 transition-all group"
                    >
                        <Camera size={24} className="group-hover:rotate-12 transition-transform" />
                        Start Scanning
                    </button>
                </div>

                <div className="flex items-center gap-4 pt-6 animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm hover:scale-110 transition-transform">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-[#9CA3AF]">
                        Joined by 10k+ health enthusiasts
                    </p>
                </div>
            </div>

            <div className="relative animate-slide-in-right-hero" style={{ animationDelay: '0.3s' }}>
                <div className="bg-[#EBFAF2] rounded-[4rem] p-6 lg:p-10 relative overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_rgba(0,230,118,0.15)] transition-shadow duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full"></div>

                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white/50 bg-white">
                        <img src={bowl} alt="Healthy Bowl" className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700" />
                    </div>

                    <div className="absolute bottom-8 left-[-20px] md:left-[-10px] lg:left-4 bg-white p-4 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-50 flex flex-col gap-1 min-w-[220px] animate-bounce-subtle">
                        <div className="flex items-center gap-2 mb-0.5">
                            <CheckCircle2 size={16} className="text-[#00E676]" />
                            <span className="text-[9px] font-black tracking-widest text-[#00E676] uppercase">AI Identified</span>
                        </div>
                        <h3 className="text-lg font-black text-[#1F2937]">Mediterranean Bowl</h3>
                        <p className="text-xs font-bold text-[#9CA3AF]">420 kcal - 15g Protein</p>
                    </div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-50 rounded-full blur-[100px] opacity-30"></div>
            </div>
        </main>
    )
}

export default LandingHero;
