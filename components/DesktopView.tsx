import React, { useMemo } from 'react';
import { BabyName } from '../types';
import { Sparkles } from 'lucide-react';
import NameCard from './NameCard';
import { getCountByLetter } from '../utils/nameUtils';

interface DesktopViewProps {
    names: BabyName[];
    favorites: string[];
    onToggleFavorite: (id: string) => void;
    onSelectName: (name: BabyName) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    nameOfTheDay: BabyName | null;
    isLoadingData: boolean;
    totalCount: number;
    allFilteredNames: BabyName[];
    selectedLetter: string | null;
    setSelectedLetter: (letter: string | null) => void;
}

const DesktopView: React.FC<DesktopViewProps> = ({
    names,
    favorites,
    onToggleFavorite,
    onSelectName,
    currentPage,
    totalPages,
    onPageChange,
    nameOfTheDay,
    isLoadingData,
    totalCount,
    allFilteredNames,
    selectedLetter,
    setSelectedLetter
}) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Calcular contagens para letras
    const letterCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        alphabet.forEach(letter => {
            counts[letter] = getCountByLetter(allFilteredNames, letter);
        });
        return counts;
    }, [allFilteredNames, alphabet]);

    return (
        <div className="hidden lg:block">
            {/* Alphabet Filter - Desktop */}
            <div className="max-w-7xl mx-auto mb-6">
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {alphabet.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => setSelectedLetter(letter)}
                            className={`flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-all ${selectedLetter === letter
                                ? 'bg-slate-900 text-white border-2 border-slate-900 scale-110 shadow-lg'
                                : letterCounts[letter] > 0
                                    ? 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
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

            {/* CONTENT GRID - Aligned with categories bar */}
            <div className="grid grid-cols-[1fr_280px] gap-12 max-w-7xl mx-auto mt-12">
                <div className="space-y-8">

                    {isLoadingData ? (
                        <div className="grid grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-64 bg-white rounded-[2rem] animate-pulse border border-slate-200"></div>
                            ))}
                        </div>
                    ) : names.length > 0 ? (
                        <>
                            {/* Desktop: 6-card grid (2 rows × 3 columns) - all same size */}
                            <div className="grid grid-cols-3 gap-6 items-start">
                                {names.map((n, idx) => (
                                    <div
                                        key={n.id}
                                        className="flex justify-center"
                                    >
                                        <NameCard
                                            data={n}
                                            onSelect={(data) => onSelectName(data)}
                                            isFavorite={favorites.includes(n.id)}
                                            onToggleFavorite={(e) => { e.stopPropagation(); onToggleFavorite(n.id); }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 pt-12 pb-8">
                                    <button
                                        onClick={() => onPageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                    >
                                        Anterior
                                    </button>

                                    <span className="text-sm font-bold text-slate-500 bg-white/50 px-4 py-2 rounded-xl border border-white/20">
                                        Página {currentPage} de {totalPages}
                                    </span>

                                    <button
                                        onClick={() => onPageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                    >
                                        Próxima
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                            <Sparkles size={48} className="mb-4 opacity-50" />
                            <p className="font-semibold text-lg">Nenhum nome encontrado</p>
                        </div>
                    )}

                </div>

                {/* Desktop: Right Sidebar - More compact */}
                <div className="space-y-6">
                    {/* Name of the Day Card */}
                    {nameOfTheDay && !isLoadingData && (
                        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-[#fc4a1a]/5 group hover:-translate-y-1 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#fc4a1a] flex items-center gap-2">
                                    <Sparkles size={12} /> Destaque do Dia
                                </span>
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="text-4xl font-black text-slate-900 mb-2 group-hover:text-brand-gradient transition-colors">{nameOfTheDay.name}</h3>
                                <p className="text-xs text-slate-500 font-medium italic">"{nameOfTheDay.meaning}"</p>
                            </div>
                            <button onClick={() => onSelectName(nameOfTheDay)} className="w-full py-3 bg-dark-gradient text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-brand-gradient transition-colors">
                                Ver Detalhes
                            </button>
                        </div>
                    )}

                    {/* Stats Card */}
                    <div className="bg-dark-gradient rounded-[2rem] p-6 text-center text-white shadow-2xl">
                        <h4 className="font-black text-xl mb-2">Base de Dados</h4>
                        <p className="text-slate-400 text-xs mb-6">Total de nomes catalogados</p>
                        <div className="text-4xl font-black text-brand-gradient mb-2">{totalCount}</div>
                        <div className="h-1 w-12 bg-white/20 mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopView;
