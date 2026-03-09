import React from 'react';

const Navigation = ({ setPage }) => {
    return (
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setPage('landing')}
            >
                <span className="text-[28px] font-black text-[#1B2533] tracking-[-0.03em]">
                    NutriScan <span className="text-[#00E676]">AI</span>
                </span>
            </div>
        </nav>
    );
};

export default Navigation;
