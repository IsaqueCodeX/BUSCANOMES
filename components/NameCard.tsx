
import React from 'react';
import { BabyName } from '../types';
import { GlowingCard } from './ui/glowing-card';
import { shareContent } from '../lib/utils';

interface NameCardProps {
  data: BabyName;
  onSelect: (name: BabyName) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const NameCard: React.FC<NameCardProps> = ({ data, onSelect, isFavorite, onToggleFavorite }) => {
  if (!data) return null;

  const theme = {
    F: {
      bg: 'bg-[#fff5f7]',
      accent: 'text-[#d53f8c]',
      border: 'border-[#fed7e2]',
      iconBg: 'bg-[#fed7e2]',
      gradient: 'from-[#f687b3] to-[#d53f8c]',
      hex: '#d53f8c'
    },
    M: {
      bg: 'bg-[#f0f9ff]',
      accent: 'text-[#3182ce]',
      border: 'border-[#bee3f8]',
      iconBg: 'bg-[#bee3f8]',
      gradient: 'from-[#63b3ed] to-[#3182ce]',
      hex: '#3182ce'
    },
    U: {
      bg: 'bg-[#f7fafc]',
      accent: 'text-[#4a5568]',
      border: 'border-[#e2e8f0]',
      iconBg: 'bg-[#e2e8f0]',
      gradient: 'from-[#718096] to-[#4a5568]',
      hex: '#718096'
    }
  };

  const genderTheme = theme[data.gender] || theme.U;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?name=${data.name}`;
    shareContent({
      title: `Significado do nome ${data.name}`,
      text: `Descubra o significado do nome ${data.name}: ${data.meaning}. Origem: ${data.origin}.`,
      url: url
    });
  };

  return (
    <GlowingCard
      className="flex-shrink-0 w-full max-w-[320px] min-h-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
      color={genderTheme.hex}
      onClick={() => onSelect(data)}
    >
      <div className="flex flex-col h-full">
        {/* Premium Typographic Header */}
        <div className={`h-32 md:h-40 relative flex items-center justify-center overflow-hidden flex-shrink-0 ${genderTheme.bg}`}>
          <div className="absolute top-[-20%] left-[-20%] w-60 h-60 rounded-full bg-white opacity-40 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-20%] w-40 h-40 rounded-full bg-white opacity-30 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl rotate-12 flex items-center justify-center bg-white shadow-xl border-2 ${genderTheme.border} transition-transform duration-700 group-hover:rotate-0`}>
              <span className={`text-3xl md:text-4xl font-black ${genderTheme.accent}`}>
                {data.name.charAt(0)}
              </span>
            </div>
            <div className="mt-3 md:mt-4 flex flex-col items-center">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 opacity-60">
                Origem
              </span>
              <span className="text-[11px] md:text-[12px] font-black text-slate-800 uppercase tracking-widest">
                {data.origin}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex flex-col flex-1 justify-between bg-white overflow-hidden">
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter leading-tight">{data.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${genderTheme.bg.replace('bg-', 'bg-')}`} style={{ backgroundColor: genderTheme.accent.replace('text-', '') }} />
                  <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${genderTheme.accent}`}>
                    {data.gender === 'F' ? 'Menina' : data.gender === 'M' ? 'Menino' : 'Unissex'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 md:gap-2">
                <button
                  onClick={handleShare}
                  className="p-3 md:p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:text-blue-500 transition-all active:scale-90 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                  title="Compartilhar"
                >
                  <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                </button>
                <button
                  onClick={onToggleFavorite}
                  className={`p-3 md:p-2.5 rounded-xl transition-all active:scale-90 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0 flex items-center justify-center ${isFavorite ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-300 hover:text-rose-400'}`}
                  title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill={isFavorite ? "currentColor" : "currentColor"} viewBox="0 0 24 24">
                    {isFavorite ? (
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    ) : (
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 overflow-y-auto no-scrollbar max-h-36 md:max-h-40 pr-2">
              <div>
                <p className="text-[8px] md:text-[9px] uppercase font-black text-slate-300 tracking-[0.2em] mb-1">O Significado</p>
                <p className="text-slate-700 text-xs md:text-[13px] leading-relaxed font-semibold italic">"{data.meaning || 'Significado em atualização...'}"</p>
              </div>

              <div>
                <p className="text-[8px] md:text-[9px] uppercase font-black text-slate-300 tracking-[0.2em] mb-1">Curiosidade</p>
                <p className="text-slate-500 text-[10px] md:text-[11px] leading-relaxed font-medium line-clamp-2">{data.curiosity}</p>
              </div>
            </div>
          </div>

          <button className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] bg-gradient-to-r ${genderTheme.gradient} shadow-lg shadow-slate-100 hover:shadow-2xl hover:scale-[1.02] transition-all uppercase active:scale-95 mt-4`}>
            Descobrir Mais
          </button>
        </div>
      </div>
    </GlowingCard>
  );
};

export default NameCard;
