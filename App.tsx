
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { BabyName } from './types';
import { CATEGORIES } from './constants';
import { fetchNames } from './services/dataService';
import AnimatedBackground from './components/AnimatedBackground';
import NameCard from './components/NameCard';
import NameDetailsModal from './components/NameDetailsModal';
import AiWizard from './components/AiWizard';
import MobileNavbar from './components/MobileNavbar';
import SEOHead from './components/SEOHead';
import SwipeableNameCards from './components/SwipeableNameCards';
import { getGeminiInsights } from './services/geminiService';
import { Search, Sparkles, AlertCircle, Heart } from 'lucide-react';

const PAGE_SIZE = 6;

const App: React.FC = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<'M' | 'F' | 'U' | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [view, setView] = useState<'browse' | 'generator' | 'favorites' | 'ai-wizard' | 'donation'>('browse');


  const [selectedName, setSelectedName] = useState<BabyName | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Carregamento dos dados
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchNames();
        setNames(data);
      } catch (e) {
        console.error("Failed to load names", e);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  // Load Favorites
  useEffect(() => {
    try {
      const saved = localStorage.getItem('buscanomes_favs');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  }, []);

  // URL State
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    if (nameParam && names.length > 0) {
      const foundLocal = names.find(n => n.name.toLowerCase() === nameParam.toLowerCase());
      if (foundLocal) {
        setSelectedName(foundLocal);
      } else {
        setSearchTerm(nameParam);
      }
    }
  }, [names]);

  useEffect(() => {
    setCurrentPage(1);
    setCurrentCardIndex(0);
    // Only scroll to top if we are not initial load to avoid jarring jumps
    /* window.scrollTo({ top: 0, behavior: 'smooth' }); */
  }, [searchTerm, selectedCategory, selectedGender, selectedLetter, view]);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id)
      ? favorites.filter(fid => fid !== id)
      : [...favorites, id];

    setFavorites(newFavs);
    localStorage.setItem('buscanomes_favs', JSON.stringify(newFavs));
  };

  const nameOfTheDay = useMemo(() => {
    if (names.length === 0) return null;
    const day = new Date().getDate();
    const index = day % names.length;
    return names[index];
  }, [names]);

  // AI Search Debounce
  useEffect(() => {
    const handler = setTimeout(async () => {
      const cleanTerm = searchTerm.trim();
      if (cleanTerm.length > 2 && !isLoadingData) {
        const exists = names.find(n => n.name.toLowerCase() === cleanTerm.toLowerCase());
        if (!exists) {
          setIsLoadingAI(true);
          try {
            const result = await getGeminiInsights(cleanTerm, selectedCategory || 'geral');
            if (result) {
              const newName: BabyName = {
                id: `api-${Date.now()}`,
                name: cleanTerm.charAt(0).toUpperCase() + cleanTerm.slice(1).toLowerCase(),
                meaning: result.meaning,
                origin: result.origin,
                curiosity: result.curiosity,
                category: selectedCategory || 'api',
                gender: result.gender as 'M' | 'F' | 'U',
                famousPersonalities: result.famousPersonalities || [],
                tags: [selectedCategory || 'api'],
              };
              setNames(prev => [newName, ...prev]);
            }
          } catch (err) {
            console.error(err);
          } finally {
            setIsLoadingAI(false);
          }
        }
      }
    }, 1200);

    return () => clearTimeout(handler);
  }, [searchTerm, selectedCategory, names, isLoadingData]);

  const filteredNames = useMemo(() => {
    let list = names || [];

    if (view === 'favorites') {
      list = list.filter(n => favorites.includes(n.id));
    } else {
      list = list.filter(n => {
        const matchesSearch = n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.origin.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !selectedCategory || n.category === selectedCategory;
        const matchesGender = !selectedGender || n.gender === selectedGender;
        const matchesLetter = !selectedLetter || n.name.toUpperCase().startsWith(selectedLetter);

        return matchesSearch && matchesCategory && matchesGender && matchesLetter;
      });
    }

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [names, searchTerm, selectedCategory, selectedGender, selectedLetter, view, favorites]);

  /* Pagination Implementation */
  const totalPages = Math.ceil(filteredNames.length / PAGE_SIZE);

  const visibleNames = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredNames.slice(start, start + PAGE_SIZE);
  }, [filteredNames, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('list-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateRandomName = () => {
    setIsLoadingAI(true);
    // Filter candidates locally
    const candidates = names.filter(n => !selectedGender || n.gender === selectedGender);

    setTimeout(() => {
      // Use local candidate or fallback
      if (candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        const selected = candidates[randomIndex];
        setSelectedName(selected);
      }
      setIsLoadingAI(false);
    }, 600);
  };

  const resetToHome = () => {
    setSearchTerm('');
    setView('browse');
    setSelectedCategory(null);
    setSelectedGender(null);
    setSelectedLetter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-32 lg:pb-12 bg-slate-50 text-slate-900 font-sans selection:bg-brand-gradient selection:text-white">
      <SEOHead title={selectedName ? `${selectedName.name} - Significado` : undefined} />

      {/* Background decoration */}
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-100"
        >
          <source src="/assets/sky.mp4" type="video/mp4" />
        </video>
      </div>

      {selectedName && (
        <NameDetailsModal
          data={selectedName}
          onClose={() => setSelectedName(null)}
          isFavorite={favorites.includes(selectedName.id)}
          onToggleFavorite={() => toggleFavorite(selectedName.id)}
        />
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetToHome}>
            <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center rounded-lg overflow-hidden transition-all group-hover:scale-105">
              <img src="/assets/logoanimado.gif" alt="BuscaNomes" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-none">
              <span className="text-slate-900">BUSCA</span>
              <span style={{ background: 'linear-gradient(to right, #f7b733, #fc4a1a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NOMES</span>
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => { setView('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-xs font-bold tracking-widest transition-all uppercase ${view === 'browse' ? 'text-black' : 'text-slate-400 hover:text-[#fc4a1a]'}`}>Início</button>
            <button onClick={() => { setView('generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-xs font-bold tracking-widest transition-all uppercase ${view === 'generator' ? 'text-[#fc4a1a]' : 'text-slate-400 hover:text-[#fc4a1a]'}`}>Gerador Automático</button>
            <div className="h-4 w-px bg-slate-300 mx-2"></div>
            <button onClick={() => { setView('favorites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-xs font-bold tracking-widest transition-all uppercase flex items-center gap-2 ${view === 'favorites' ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}>
              Favoritos <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px] text-slate-900">{favorites.length}</span>
            </button>
            <div className="h-4 w-px bg-slate-300 mx-2"></div>
            <button
              onClick={() => { setView('donation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-black tracking-widest transition-all uppercase flex items-center gap-2 text-[#fc4a1a] hover:text-[#f7b733] bg-gradient-to-r from-[#fff7e6] to-[#ffe6d9] hover:from-[#ffe6d9] hover:to-[#ffd9cc] px-4 py-2 rounded-full"
            >
              <Heart size={14} className="fill-[#fc4a1a]" />
              Apoie
            </button>
          </nav>

          <div className="lg:hidden">
            {/* Mobile placeholder */}
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto pt-8 px-4 md:px-6 relative z-10">

        {/* VISUALIZAÇÃO: NAVEGAÇÃO */}
        {view === 'browse' || view === 'favorites' ? (
          <>
            {/* SEÇÃO HERO */}
            <div className={`text-center mb-12 max-w-4xl mx-auto animate-fade-in ${view === 'favorites' ? 'bg-dark-gradient rounded-[3rem] p-12 shadow-2xl relative overflow-hidden' : ''}`}>
              {view === 'favorites' && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gradient opacity-10 rounded-full blur-3xl"></div>
                </>
              )}

              <div className="relative z-10">
                <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight ${view === 'favorites' ? 'text-white' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}>
                  {view === 'favorites' ? (
                    <>
                      Seus nomes <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">favoritos.</span>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <Heart size={24} className="text-rose-400 fill-rose-400 animate-pulse" />
                        <span className="text-2xl font-bold text-slate-300">{favorites.length} {favorites.length === 1 ? 'nome salvo' : 'nomes salvos'}</span>
                      </div>
                    </>
                  ) : (
                    <>Encontre o nome <span className="text-brand-gradient bg-white/10 backdrop-blur-sm px-2 rounded-lg">perfeito.</span></>
                  )}
                </h2>

                {view === 'browse' && (
                  <div className="relative group max-w-xl mx-auto">
                    <div className="absolute -inset-0.5 bg-brand-gradient rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl">
                      <Search className="ml-4 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Busque por nome, significado ou origem..."
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 text-lg py-3 px-4 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {isLoadingAI && <div className="mr-4 w-5 h-5 border-2 border-[#fc4a1a] border-t-transparent rounded-full animate-spin"></div>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FILTROS */}
            {view === 'browse' && (
              <div className="sticky top-[73px] z-50 py-2 lg:py-4 mb-4 lg:mb-8 -mx-4 px-4 md:-mx-6 md:px-6 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                  {/* Gender Filters - Always Visible */}
                  <div className="flex items-center gap-2 mb-2 lg:mb-4">
                    <button
                      onClick={() => { setSelectedGender(null); setSelectedCategory(null); }}
                      className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl text-[10px] lg:text-[11px] font-bold border transition-all uppercase tracking-wider whitespace-nowrap ${!selectedGender && !selectedCategory ? 'bg-dark-gradient text-white border-black' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                    >
                      Todos
                    </button>

                    <button
                      onClick={() => setSelectedGender('M')}
                      className={`flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-2 lg:py-2.5 rounded-xl border-2 transition-all ${selectedGender === 'M' ? 'bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                    >
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-100">
                        <img src="/assets/boy.png" alt="Menino" className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[10px] lg:text-[11px] font-bold uppercase tracking-wider ${selectedGender === 'M' ? 'text-blue-600' : 'text-slate-500'}`}>Menino</span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('F')}
                      className={`flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-2 lg:py-2.5 rounded-xl border-2 transition-all ${selectedGender === 'F' ? 'bg-rose-50 border-rose-500 shadow-lg shadow-rose-500/20' : 'bg-white border-slate-200 hover:border-rose-300'}`}
                    >
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden flex-shrink-0 bg-rose-100">
                        <img src="/assets/girl.png" alt="Menina" className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[10px] lg:text-[11px] font-bold uppercase tracking-wider ${selectedGender === 'F' ? 'text-rose-600' : 'text-slate-500'}`}>Menina</span>
                    </button>
                  </div>

                  {/* Category Carousel */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => document.getElementById('cat-scroll')?.scrollBy({ left: -300, behavior: 'smooth' })}
                      className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 shadow-sm flex-shrink-0 transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div id="cat-scroll" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-2 scroll-smooth w-full">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                          className={`flex items-center gap-2 lg:gap-2.5 px-3 lg:px-5 py-2 lg:py-3 rounded-full md:rounded-2xl text-[10px] lg:text-[11px] font-bold border-2 transition-all whitespace-nowrap uppercase tracking-wider
                            ${selectedCategory === cat.id ? 'bg-dark-gradient text-white border-white/20 shadow-xl scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:shadow-md'}`}
                        >
                          <span
                            className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full shadow-sm flex-shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => document.getElementById('cat-scroll')?.scrollBy({ left: 300, behavior: 'smooth' })}
                      className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 shadow-sm flex-shrink-0 transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-7xl mx-auto">
              <div className="space-y-8">

                {/* FEATURED CARD (Mobile Only) */}
                {nameOfTheDay && !isLoadingData && (
                  <div className="lg:hidden bg-dark-gradient text-white rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={100} /></div>
                    <div className="relative z-10">
                      <span className="bg-brand-gradient text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block text-white">Destaque</span>
                      <h3 className="text-3xl font-black mb-2">{nameOfTheDay.name}</h3>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{nameOfTheDay.meaning}</p>
                      <button onClick={() => setSelectedName(nameOfTheDay)} className="w-full py-3 bg-white text-black text-xs font-black uppercase tracking-wider rounded-xl">Detalhes</button>
                    </div>
                  </div>
                )}

                {isLoadingData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-64 bg-white rounded-[2rem] animate-pulse border border-slate-200"></div>
                    ))}
                  </div>
                ) : filteredNames.length > 0 ? (
                  <>
                    {/* Mobile: Swipeable Cards */}
                    <div className="lg:hidden">
                      <SwipeableNameCards
                        names={visibleNames}
                        currentIndex={currentCardIndex}
                        onIndexChange={setCurrentCardIndex}
                        onNameSelect={setSelectedName}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                      />
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden lg:grid grid-cols-2 gap-6">
                      {visibleNames.map(n => (
                        <div key={n.id} className="flex justify-center">
                          <NameCard
                            data={n}
                            onSelect={(data) => setSelectedName(data)}
                            isFavorite={favorites.includes(n.id)}
                            onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(n.id); }}
                          />
                        </div>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="hidden lg:flex justify-center items-center gap-4 pt-12 pb-8">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                          Anterior
                        </button>

                        <span className="text-sm font-bold text-slate-500 bg-white/50 px-4 py-2 rounded-xl border border-white/20">
                          Página {currentPage} de {totalPages}
                        </span>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                          Próxima
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-20">
                    {view === 'favorites' ? (
                      // EMPTY FAVORITES STATE
                      <div className="max-w-2xl mx-auto">
                        <div className="bg-dark-gradient text-white rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gradient opacity-10 rounded-full blur-3xl"></div>
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl"></div>

                          <div className="relative z-10">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-500/20 to-rose-600/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-rose-500/20">
                              <Heart size={48} className="text-rose-400" />
                            </div>

                            <h3 className="text-3xl font-black mb-3 tracking-tight">Nenhum favorito ainda</h3>
                            <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-md mx-auto">
                              Explore nossa coleção de nomes e adicione seus favoritos clicando no ícone de coração. ❤️
                            </p>

                            <button
                              onClick={() => { setView('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg inline-flex items-center gap-2"
                            >
                              <Search size={18} />
                              Explorar Nomes
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // EMPTY SEARCH RESULTS
                      <div className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center shadow-lg">
                        <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                          <AlertCircle size={48} className="text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum nome encontrado</h3>
                        <p className="text-slate-500 text-sm mb-6">Tente ajustar seus filtros ou busca.</p>
                        <button
                          onClick={() => { setSearchTerm(''); setSelectedCategory(null); setSelectedGender(null); setSelectedLetter(null); }}
                          className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                        >
                          Limpar Filtros
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* BARRA LATERAL (Desktop) */}
              <aside className="hidden lg:block relative">
                <div className="sticky top-40 space-y-6">
                  {nameOfTheDay && !isLoadingData && (
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-[#fc4a1a]/5 group hover=-translate-y-1 transition-all duration-500">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#fc4a1a] flex items-center gap-2">
                          <Sparkles size={12} /> Destaque do Dia
                        </span>
                      </div>
                      <div className="text-center mb-6">
                        <h3 className="text-4xl font-black text-slate-900 mb-2 group-hover:text-brand-gradient transition-colors">{nameOfTheDay.name}</h3>
                        <p className="text-xs text-slate-500 font-medium italic">"{nameOfTheDay.meaning}"</p>
                      </div>
                      <button onClick={() => setSelectedName(nameOfTheDay)} className="w-full py-3 bg-dark-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider hover-bg-brand-gradient transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  )}

                  <div className="bg-dark-gradient rounded-[2rem] p-6 text-center text-white shadow-2xl">
                    <h4 className="font-black text-xl mb-2">Base de Dados</h4>
                    <p className="text-slate-400 text-xs mb-6">Total de nomes catalogados</p>
                    <div className="text-4xl font-black text-brand-gradient mb-2">{names.length}</div>
                    <div className="h-1 w-12 bg-white/20 mx-auto rounded-full"></div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          // VISUALIZAÇÃO DO GERADOR
          <div className="max-w-2xl mx-auto py-12 text-center min-h-[60vh] flex flex-col justify-center animate-fade-in">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient"></div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Gerador Aleatório</h2>

              <div className="flex justify-center gap-6 md:gap-12 mb-8 md:mb-12">
                <button
                  onClick={() => setSelectedGender('M')}
                  className={`group flex flex-col items-center gap-2 md:gap-3 transition-all ${selectedGender === 'M' ? 'scale-110' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 overflow-hidden shadow-xl ${selectedGender === 'M' ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-slate-200'}`}>
                    <img src="/assets/boy.png" alt="Menino" className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${selectedGender === 'M' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 text-slate-500'}`}>Menino</span>
                </button>

                <button
                  onClick={() => setSelectedGender('F')}
                  className={`group flex flex-col items-center gap-2 md:gap-3 transition-all ${selectedGender === 'F' ? 'scale-110' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 overflow-hidden shadow-xl ${selectedGender === 'F' ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-slate-200'}`}>
                    <img src="/assets/girl.png" alt="Menina" className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${selectedGender === 'F' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-200 text-slate-500'}`}>Menina</span>
                </button>
              </div>

              <div className="h-32 flex items-center justify-center mb-8">
                {isLoadingAI ? (
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-[#fc4a1a] rounded-full animate-spin"></div>
                ) : (
                  <Sparkles size={64} className="text-slate-200" />
                )}
              </div>

              <button
                onClick={generateRandomName}
                disabled={isLoadingAI}
                className="w-full py-5 bg-dark-gradient text-white rounded-2xl text-sm font-black hover-bg-brand-gradient transition-all shadow-lg active:scale-95 uppercase tracking-widest"
              >
                Sortear Novo Nome
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODAL DE DOAÇÃO */}
      {
        view === 'donation' && (
          <div className="fixed inset-0 z-[70] bg-slate-900/95 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="bg-white rounded-[3rem] max-w-lg w-full p-8 md:p-12 text-center relative animate-fade-in shadow-2xl">
                <button
                  onClick={() => setView('browse')}
                  className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#fff7e6] to-[#ffe6d9] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#fc4a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Apoie o Projeto</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Este é um projeto sem fins lucrativos mantido pela comunidade. Sua oferta voluntária ajuda a cobrir custos de servidor e desenvolvimento.
                </p>

                <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-slate-100 inline-block mb-8">
                  <img src="/assets/qrcode.png" alt="QR Code para Doação" className="w-48 h-48 object-contain" />
                </div>

                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Escaneie o QR Code</p>

                <button
                  onClick={() => setView('browse')}
                  className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Voltar para o Início
                </button>
              </div>
            </div>
          </div>
        )
      }

      <MobileNavbar view={view} setView={setView} onSearchClick={() => { setView('browse'); window.scrollTo(0, 0); document.querySelector('input')?.focus(); }} />

      {/* SEÇÃO PRÉ-FOOTER DE APOIO */}
      <section className="bg-gradient-to-r from-[#fff7e6] to-[#ffe6d9] border-t border-[#f7b733] py-16 relative overflow-hidden mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Gostou do Projeto?</h3>
            <p className="text-slate-600 max-w-lg">
              Ajude a manter o BuscaNomes no ar. Sua contribuição voluntária é essencial para cobrir os custos de servidor e desenvolvimento.
            </p>
          </div>
          <button
            onClick={() => setView('donation')}
            className="px-8 py-4 bg-brand-gradient text-white rounded-xl font-bold shadow-lg shadow-[#fc4a1a]/30 hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center gap-2"
          >
            <Heart size={20} fill="currentColor" />
            Quero Apoiar
          </button>
        </div>

        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      </section>

      {/* RODAPÉ PROFISSIONAL */}
      <footer className="text-slate-400 py-16 pb-32 lg:pb-16 relative z-40" style={{ background: 'linear-gradient(to right, #0F2027, #0a1612, #000000)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Coluna 1: Marca */}
            <div className="md:col-span-1 text-center md:text-left">
              <div
                className="w-32 md:w-48 mx-auto md:mx-0 mb-6 cursor-pointer hover:scale-105 transition-all"
                onClick={resetToHome}
              >
                <img src="/assets/logoanimado.gif" alt="BuscaNomes" className="w-full h-auto object-contain" />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Descubra o nome perfeito para o seu bebê com a ajuda da nossa inteligência artificial e banco de dados completo.
              </p>
            </div>

            {/* Column 2: Links (Placeholder) */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navegação</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => { setView('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#fc4a1a] transition-colors text-left">Início</button></li>
                <li><button onClick={() => { setView('generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#fc4a1a] transition-colors text-left">Gerador de Nomes</button></li>
                <li><button onClick={() => { setView('favorites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#fc4a1a] transition-colors text-left">Meus Favoritos</button></li>
                <li><button onClick={() => { setView('donation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#fc4a1a] transition-colors text-left">Apoiar Projeto</button></li>
              </ul>
            </div>

            {/* Column 3: Legal/Info (Placeholder) */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Sobre</h4>
              <ul className="space-y-3 text-sm">
                <li><span className="opacity-50 cursor-not-allowed">Política de Privacidade</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Termos de Uso</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Sobre Nós</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Contato</span></li>
              </ul>
            </div>

            {/* Column 4: Socials & Credits */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Desenvolvedor</h4>
              <p className="text-white font-bold mb-4">Isaque Santos Dev</p>

              <div className="flex justify-center md:justify-start gap-4 mb-6">
                <a href="https://isaquesantosdev.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover-bg-brand-gradient hover:text-white transition-all text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </a>
                <a href="https://github.com/IsaqueCodeX" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/isaque-santos-720b8b15a" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-sm hover:bg-[#0077b5] hover:text-white transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>

          <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-[#fff7e6] to-[#ffe6d9] rounded-2xl border border-[#f7b733] mb-8">
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Este é um projeto sem fins lucrativos. Sua oferta voluntária ajuda a manter o servidor online.
            </p>
            <button
              onClick={() => { setView('donation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3 bg-white text-[#fc4a1a] font-black uppercase tracking-widest text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-[#f7b733]"
            >
              Quero Ajudar
            </button>
          </div>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-50">© 2026 BuscaNomes - Versão 1.5</p>
        </div>
      </footer>
    </div >
  );
};

export default App;