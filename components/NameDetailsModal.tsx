
import React from 'react';
import { BabyName } from '../types';
import { shareContent } from '../lib/utils';

interface NameDetailsModalProps {
  data: BabyName;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const NameDetailsModal: React.FC<NameDetailsModalProps> = ({ data, onClose, isFavorite, onToggleFavorite }) => {
  if (!data) return null;

  const genderColor = data.gender === 'F' ? 'text-rose-500' : data.gender === 'M' ? 'text-blue-500' : 'text-slate-500';
  const bgGradient = data.gender === 'F' ? 'from-rose-50 to-white' : data.gender === 'M' ? 'from-blue-50 to-white' : 'from-slate-50 to-white';

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?name=${data.name}`;
    shareContent({
      title: `Significado do nome ${data.name}`,
      text: `Descubra o significado do nome ${data.name}: ${data.meaning}. Origem: ${data.origin}. Veja mais detalhes no BuscaNomes!`,
      url: url
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className={`relative w-full max-w-md bg-gradient-to-b ${bgGradient} rounded-[2.5rem] shadow-2xl overflow-hidden transform transition-all scale-100`}>
        {/* Header */}
        <div className="relative h-32 bg-white/50 flex items-center justify-center border-b border-slate-100">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white text-slate-400 hover:text-slate-800 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{data.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`text-xs font-black uppercase tracking-widest ${genderColor}`}>
                 {data.gender === 'F' ? 'Feminino' : data.gender === 'M' ? 'Masculino' : 'Unissex'}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{data.origin}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Significado Profundo</h3>
             <p className="text-slate-700 font-medium text-lg leading-relaxed italic">"{data.meaning}"</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Curiosidade Histórica</h3>
             <p className="text-slate-600 text-sm leading-relaxed">{data.curiosity}</p>
          </div>

          {data.famousPersonalities && data.famousPersonalities.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-3 ml-2">Personalidades</h3>
              <div className="flex flex-wrap gap-2">
                {data.famousPersonalities.map((p, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-slate-50 flex gap-4">
          <button 
            onClick={onToggleFavorite}
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2
              ${isFavorite ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke={isFavorite ? "none" : "currentColor"} viewBox="0 0 24 24">
               {isFavorite ? (
                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               )}
            </svg>
            {isFavorite ? 'Salvo' : 'Salvar'}
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameDetailsModal;
