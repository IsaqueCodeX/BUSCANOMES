import React, { useMemo } from 'react';
import { BabyName } from '../types';
import { CATEGORIES } from '../constants';
import { Search, Heart } from 'lucide-react';
import { getCountByCategory, getCountByLetter, getCountByGender } from '../utils/nameUtils';

interface MobileViewProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    selectedGender: 'M' | 'F' | 'U' | null;
    setSelectedGender: (gender: 'M' | 'F' | 'U' | null) => void;
    selectedLetter: string | null;
    setSelectedLetter: (letter: string | null) => void;
    visibleNames: BabyName[];
    allFilteredNames: BabyName[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onNameSelect: (name: BabyName) => void;
    favorites: string[];
    onToggleFavorite: (id: string) => void;
    isLoadingAI: boolean;
    totalCount: number;
}

const MobileView: React.FC<MobileViewProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    selectedLetter,
    setSelectedLetter,
    visibleNames,
    allFilteredNames,
    currentPage,
    totalPages,
    onPageChange,
    onNameSelect,
    favorites,
    onToggleFavorite,
    isLoadingAI,
    totalCount,
}) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const [isSearching, setIsSearching] = React.useState(false);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Fechar teclado
            searchInputRef.current?.blur();

            // Efeito visual de pesquisa
            setIsSearching(true);
            setTimeout(() => setIsSearching(false), 600);
        }
    };

    // Calcular contagens para categorias
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        CATEGORIES.forEach(cat => {
            counts[cat.id] = getCountByCategory(allFilteredNames, cat.id);
        });
        return counts;
    }, [allFilteredNames]);

    // Calcular contagens para letras
    const letterCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        alphabet.forEach(letter => {
            counts[letter] = getCountByLetter(allFilteredNames, letter);
        });
        return counts;
    }, [allFilteredNames, alphabet]);

    // Calcular contagens para gêneros
    const genderCounts = useMemo(() => ({
        M: getCountByGender(allFilteredNames, 'M'),
        F: getCountByGender(allFilteredNames, 'F'),
    }), [allFilteredNames]);

    return (
        <div className="lg:hidden space-y-3 pb-24">
            {/* Search Bar - Simple and Clean */}
            <div className="px-4">
                <div className={`relative transition-all duration-300 ${isSearching ? 'scale-[0.98]' : 'scale-100'}`}>
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${isSearching ? 'text-orange-500 scale-110' : 'text-slate-400'}`} />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Buscar nome..."
                        className={`w-full bg-white border-2 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 text-base font-medium focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all duration-300 ${isSearching ? 'border-orange-400 ring-2 ring-orange-100' : 'border-slate-200'}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        enterKeyHint="search"
                    />
                    {isLoadingAI && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    )}
                </div>
            </div>

            {/* Gender Filters - Smaller */}
            <div className="flex items-center gap-2 px-4">
                <button
                    onClick={() => {
                        setSelectedGender(null);
                        setSelectedCategory(null);
                        setSelectedLetter(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all uppercase tracking-wider min-h-[44px] ${!selectedGender && !selectedCategory && !selectedLetter
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                >
                    Todos
                </button>

                <button
                    onClick={() => setSelectedGender('M')}
                    className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl border-2 transition-all min-h-[44px] min-w-[44px] ${selectedGender === 'M'
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                >
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-blue-100">
                        <img src="/assets/boy.png" alt="Menino" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full ${selectedGender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        {genderCounts.M}
                    </span>
                </button>

                <button
                    onClick={() => setSelectedGender('F')}
                    className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl border-2 transition-all min-h-[44px] min-w-[44px] ${selectedGender === 'F'
                        ? 'bg-rose-50 border-rose-500'
                        : 'bg-white border-slate-200 hover:border-rose-300'
                        }`}
                >
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-rose-100">
                        <img src="/assets/girl.png" alt="Menina" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full ${selectedGender === 'F' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                        {genderCounts.F}
                    </span>
                </button>
            </div>

            {/* Letter Filter - New */}
            <div className="px-4">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2">
                    {alphabet.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                            className={`flex-shrink-0 w-9 h-9 rounded-lg text-xs font-bold transition-all ${selectedLetter === letter
                                ? 'bg-slate-900 text-white border-2 border-slate-900 scale-110'
                                : letterCounts[letter] > 0
                                    ? 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'
                                    : 'bg-slate-50 text-slate-300 border-2 border-slate-100 cursor-not-allowed opacity-50'
                                }`}
                            disabled={letterCounts[letter] === 0}
                        >
                            {letter}
                            {letterCounts[letter] > 0 && (
                                <div className={`text-[8px] font-bold ${selectedLetter === letter ? 'text-orange-300' : 'text-slate-400'}`}>
                                    {letterCounts[letter]}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories - Thinner */}
            <div className="px-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold border-2 transition-all whitespace-nowrap uppercase ${selectedCategory === cat.id
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: cat.color }}
                            />
                            {cat.label}
                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {categoryCounts[cat.id]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scroll Down Indicator */}
            {visibleNames.length > 0 && (
                <div className="flex justify-center pb-2 animate-bounce">
                    <div className="text-slate-400 text-xs font-bold flex flex-col items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="uppercase tracking-wider">Role para ver</span>
                    </div>
                </div>
            )}

            {/* 4-Card Stacked Display */}
            {visibleNames.length > 0 ? (
                <>
                    {/* Scroll anchor for pagination */}
                    <div id="mobile-cards-top" className="scroll-mt-20" />
                    <div className="px-4 space-y-3">
                        {visibleNames.map((name, index) => (
                            <div
                                key={name.id}
                                className={`bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm hover:shadow-md transition-all ${index === 0 ? 'first-card' : ''}`}
                            >
                                {/* Card Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                ✨ Origem
                                            </span>
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: CATEGORIES.find(c => c.id === name.category)?.color || '#ccc' }}
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                                            {name.origin}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleFavorite(name.id);
                                        }}
                                        className="p-2 rounded-full hover:bg-slate-50 transition-colors"
                                    >
                                        <Heart
                                            size={20}
                                            className={`transition-colors ${favorites.includes(name.id)
                                                ? 'text-rose-500 fill-rose-500'
                                                : 'text-slate-300 hover:text-rose-400'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Name */}
                                <h3 className="text-3xl font-black text-slate-900 mb-2">
                                    {name.name}
                                </h3>

                                {/* Gender Badge */}
                                <div className="mb-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${name.gender === 'M'
                                        ? 'bg-blue-100 text-blue-600'
                                        : name.gender === 'F'
                                            ? 'bg-rose-100 text-rose-600'
                                            : 'bg-purple-100 text-purple-600'
                                        }`}>
                                        {name.gender === 'M' ? 'Menino' : name.gender === 'F' ? 'Menina' : 'Unissex'}
                                    </span>
                                </div>

                                {/* Meaning */}
                                <div className="bg-blue-50 rounded-xl p-4 mb-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                                        ⚡ Significado
                                    </p>
                                    <p className="text-sm text-slate-700 font-medium italic">
                                        "{name.meaning}"
                                    </p>
                                </div>

                                {/* Curiosity */}
                                <div className="mb-4">
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {name.curiosity}
                                    </p>
                                </div>

                                {/* Discover More Button */}
                                <button
                                    onClick={() => onNameSelect(name)}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm active:scale-98"
                                >
                                    DESCOBRIR MAIS
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-4">
                        <button
                            onClick={() => {
                                onPageChange(currentPage - 1);
                                // Scroll to top of cards
                                setTimeout(() => {
                                    document.getElementById('mobile-cards-top')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }, 100);
                            }}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 1
                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 active:scale-95'
                                }`}
                        >
                            Anterior
                        </button>

                        <span className="text-slate-700 font-bold text-sm px-3 py-2 bg-slate-100 rounded-full">
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            onClick={() => {
                                onPageChange(currentPage + 1);
                                // Scroll to top of cards
                                setTimeout(() => {
                                    document.getElementById('mobile-cards-top')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }, 100);
                            }}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === totalPages
                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 active:scale-95'
                                }`}
                        >
                            Próxima
                        </button>
                    </div>
                </>
            ) : (
                <div className="mx-4 bg-white rounded-2xl border-2 border-slate-200 p-8 text-center">
                    <p className="text-slate-600 font-semibold">Nenhum nome encontrado</p>
                    <p className="text-slate-400 text-sm mt-2">Tente ajustar seus filtros</p>
                </div>
            )}
        </div>
    );
};

export default MobileView;
