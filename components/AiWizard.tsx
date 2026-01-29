
import React, { useState } from 'react';
import { AiPreferences, generateCreativeNames } from '../services/geminiService';
import { BabyName } from '../types';
import NameCard from './NameCard';
import { GlowingCard } from './ui/glowing-card';

interface AiWizardProps {
  onSelectName: (name: BabyName) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const THEMES = [
  "Natureza & Floral", "Realeza & Nobreza", "Moderno & Minimalista", 
  "Bíblico & Sagrado", "Místico & Élfico", "Forte & Guerreiro",
  "Vintage & Retrô", "Astronomia & Estrelas"
];

const ORIGINS = [
  "Qualquer", "Latim", "Grego", "Hebraico", "Germânico", 
  "Celta", "Japonês", "Italiano", "Francês", "Tupi-Guarani", "Internacional"
];

const AiWizard: React.FC<AiWizardProps> = ({ onSelectName, favorites, onToggleFavorite }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'results'>('form');
  const [preferences, setPreferences] = useState<AiPreferences>({
    gender: 'U',
    theme: '',
    origin: 'Qualquer',
    details: ''
  });
  const [results, setResults] = useState<BabyName[]>([]);

  const handleGenerate = async () => {
    if (!preferences.theme) return;
    setStep('loading');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const names = await generateCreativeNames(preferences);
    setResults(names);
    setStep('results');
  };

  const handleGenderSelect = (gender: 'M' | 'F' | 'U') => {
    setPreferences({ ...preferences, gender });
  };

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in duration-700 pb-32">
        <div className="relative">
          <div className="w-32 h-32 bg-purple-500/20 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden border border-purple-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 via-white to-pink-50 opacity-50"></div>
            <span className="text-4xl animate-bounce relative z-10">✨</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-[moveTop_1.5s_linear_infinite]"></div>
          </div>
        </div>
        <div className="text-center space-y-3 max-w-md px-6">
          <h3 className="text-2xl font-black text-slate-800 tracking-tighter">Consultando as Estrelas...</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Nossa IA está analisando significados, sonoridade e tendências para encontrar nomes perfeitos para o tema <span className="text-purple-600 font-bold">"{preferences.theme}"</span>.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-700 pb-32">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-widest border border-purple-100">
             <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"/> Resultado da IA
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
             Descobrimos estas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 italic">raridades.</span>
           </h2>
           <button 
             onClick={() => setStep('form')}
             className="group flex items-center justify-center gap-2 mx-auto text-slate-400 hover:text-purple-600 text-xs font-black uppercase tracking-widest transition-colors"
           >
             <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
             Criar Nova Busca
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {results.map((name, idx) => (
            <div key={name.id} className="w-full flex justify-center" style={{ animationDelay: `${idx * 150}ms` }}>
              <NameCard 
                data={name} 
                onSelect={onSelectName}
                isFavorite={favorites.includes(name.id)}
                onToggleFavorite={(e) => { e.stopPropagation(); onToggleFavorite(name.id); }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-40">
      <div className="text-center mb-12 space-y-6 px-4">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Estúdio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 italic">Criativo</span>
        </h2>
        <p className="text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Misture ingredientes mágicos como origem, estilo e significado para gerar nomes únicos com Inteligência Artificial.
        </p>
      </div>

      <GlowingCard color="#a855f7" className="border border-white/50 shadow-[0_30px_60px_-15px_rgba(168,85,247,0.15)] bg-white/60 backdrop-blur-xl">
        <div className="p-6 md:p-10 space-y-10">
          
          {/* Section: Gender */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Quem vem aí?</label>
              <span className="flex-1 h-px bg-slate-200"></span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'M', label: 'Menino', color: 'blue', icon: 'M' },
                { id: 'F', label: 'Menina', color: 'rose', icon: 'F' },
                { id: 'U', label: 'Surpresa', color: 'purple', icon: 'U' }
              ].map((g) => {
                const isActive = preferences.gender === g.id;
                const activeClasses = g.id === 'M' ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-blue-100' :
                                      g.id === 'F' ? 'bg-rose-50 border-rose-500 text-rose-600 shadow-rose-100' :
                                      'bg-purple-50 border-purple-500 text-purple-600 shadow-purple-100';
                
                return (
                  <button
                    key={g.id}
                    onClick={() => handleGenderSelect(g.id as any)}
                    className={`relative group flex flex-col items-center justify-center py-6 rounded-2xl border-2 transition-all duration-300 ${
                      isActive 
                        ? `${activeClasses} shadow-lg scale-[1.02]` 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`mb-2 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                       {g.id === 'M' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>}
                       {g.id === 'F' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4a4 4 0 100 8 4 4 0 000-8z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 12v10m-4-4h8"/></svg>}
                       {g.id === 'U' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{g.label}</span>
                    {isActive && <div className={`absolute inset-0 rounded-2xl ring-2 ring-offset-2 ring-${g.color}-400 opacity-20`}></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Theme */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Estilo & Vibe</label>
              <span className="flex-1 h-px bg-slate-200"></span>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {THEMES.map(theme => {
                const isSelected = preferences.theme === theme;
                return (
                  <button
                    key={theme}
                    onClick={() => setPreferences({ ...preferences, theme })}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wide border transition-all duration-200
                      ${isSelected 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-sm'}`}
                  >
                    {theme}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Origem Preferida</label>
              <div className="relative">
                <select 
                  value={preferences.origin}
                  onChange={(e) => setPreferences({...preferences, origin: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 text-sm font-bold appearance-none focus:outline-none focus:border-purple-400 focus:bg-white transition-all cursor-pointer"
                >
                  {ORIGINS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Detalhes Extras</label>
              <input 
                type="text" 
                placeholder="Ex: Curto, Significa Luz..."
                value={preferences.details}
                onChange={(e) => setPreferences({...preferences, details: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 text-sm font-bold focus:outline-none focus:border-purple-400 focus:bg-white transition-all placeholder-slate-300"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleGenerate}
              disabled={!preferences.theme}
              className={`group w-full py-5 rounded-2xl relative overflow-hidden transition-all duration-300
                ${!preferences.theme 
                  ? 'bg-slate-100 cursor-not-allowed opacity-70' 
                  : 'bg-slate-900 shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(168,85,247,0.5)] hover:scale-[1.01] active:scale-[0.98]'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient`} />
              <span className={`relative flex items-center justify-center gap-3 text-xs font-black tracking-[0.3em] uppercase ${!preferences.theme ? 'text-slate-400' : 'text-white'}`}>
                {preferences.theme ? (
                  <>
                    <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    Gerar Magia
                  </>
                ) : (
                  "Selecione um Estilo"
                )}
              </span>
            </button>
          </div>

        </div>
      </GlowingCard>
    </div>
  );
};

export default AiWizard;
