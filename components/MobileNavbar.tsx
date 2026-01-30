
import React from 'react';
import { Home, Sparkles, Heart, Search } from 'lucide-react';

interface MobileNavbarProps {
    view: 'browse' | 'generator' | 'favorites' | 'ai-wizard' | 'donation';
    setView: (view: 'browse' | 'generator' | 'favorites' | 'ai-wizard' | 'donation') => void;
    onSearchClick: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ view, setView, onSearchClick }) => {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[70]">
            <div className="bg-slate-900/98 backdrop-blur-2xl border-t border-white/10 shadow-2xl px-4 py-2 flex items-center justify-between" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>

                <button
                    onClick={() => setView('browse')}
                    className={`flex flex-col items-center gap-0.5 transition-all min-w-[44px] min-h-[44px] justify-center ${view === 'browse' ? 'text-amber-500 scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Home size={18} strokeWidth={view === 'browse' ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Início</span>
                </button>

                <button
                    onClick={onSearchClick}
                    className="flex flex-col items-center gap-0.5 transition-all text-slate-500 hover:text-slate-300 min-w-[44px] min-h-[44px] justify-center"
                >
                    <Search size={18} strokeWidth={2} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Buscar</span>
                </button>

                <div className="relative -top-4">
                    <button
                        onClick={() => setView('generator')}
                        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-3 border-slate-900 transition-all active:scale-95 ${view === 'generator' ? 'bg-brand-gradient text-white shadow-[#fc4a1a]/50 scale-105' : 'bg-slate-800 text-slate-400'}`}
                    >
                        <Sparkles size={18} className={view === 'generator' ? 'animate-pulse' : ''} />
                    </button>
                </div>



                <button
                    onClick={() => setView('favorites')}
                    className={`flex flex-col items-center gap-0.5 transition-all min-w-[44px] min-h-[44px] justify-center ${view === 'favorites' ? 'text-rose-500 scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Heart size={18} strokeWidth={view === 'favorites' ? 2.5 : 2} fill={view === 'favorites' ? "currentColor" : "none"} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Salvos</span>
                </button>

            </div>
        </div>
    );
};

export default MobileNavbar;
