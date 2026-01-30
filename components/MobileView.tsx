import React from 'react';
import { BabyName } from '../types';
import { CATEGORIES } from '../constants';
import SwipeableNameCards from './SwipeableNameCards';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileViewProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    selectedGender: 'M' | 'F' | 'U' | null;
    setSelectedGender: (gender: 'M' | 'F' | 'U' | null) => void;
    visibleNames: BabyName[];
    currentCardIndex: number;
    setCurrentCardIndex: (index: number) => void;
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
    visibleNames,
    currentCardIndex,
    setCurrentCardIndex,
    onNameSelect,
    favorites,
    onToggleFavorite,
    isLoadingAI,
    totalCount,
}) => {
    const goToPrevious = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentCardIndex < visibleNames.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    return (
        <div className="lg:hidden space-y-6 pb-8">
            {/* Search Bar - Simple and Clean */}
            <div className="px-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar nome..."
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 text-base font-medium focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {isLoadingAI && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    )}
                </div>
            </div>

            {/* Gender Filters - Simplified */}
            <div className="flex items-center gap-2 px-4">
                <button
                    onClick={() => {
                        setSelectedGender(null);
                        setSelectedCategory(null);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all uppercase tracking-wider ${!selectedGender && !selectedCategory
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                >
                    Todos
                </button>

                <button
                    onClick={() => setSelectedGender('M')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${selectedGender === 'M'
                            ? 'bg-blue-50 border-blue-500'
                            : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                >
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-blue-100">
                        <img src="/assets/boy.png" alt="Menino" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-xs font-bold uppercase ${selectedGender === 'M' ? 'text-blue-600' : 'text-slate-500'}`}>
                        Menino
                    </span>
                </button>

                <button
                    onClick={() => setSelectedGender('F')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${selectedGender === 'F'
                            ? 'bg-rose-50 border-rose-500'
                            : 'bg-white border-slate-200 hover:border-rose-300'
                        }`}
                >
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-rose-100">
                        <img src="/assets/girl.png" alt="Menina" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-xs font-bold uppercase ${selectedGender === 'F' ? 'text-rose-600' : 'text-slate-500'}`}>
                        Menina
                    </span>
                </button>
            </div>

            {/* Categories - Horizontal Scroll */}
            <div className="px-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border-2 transition-all whitespace-nowrap uppercase ${selectedCategory === cat.id
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: cat.color }}
                            />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Card Area - Gamified Navigation */}
            {visibleNames.length > 0 ? (
                <>
                    <div className="relative px-4">
                        {/* Left Arrow */}
                        <button
                            onClick={goToPrevious}
                            disabled={currentCardIndex === 0}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-20 w-11 h-11 rounded-full transition-all shadow-lg ${currentCardIndex === 0
                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 active:scale-95'
                                }`}
                        >
                            <ChevronLeft className="w-6 h-6 mx-auto" />
                        </button>

                        {/* Card */}
                        <SwipeableNameCards
                            names={visibleNames}
                            currentIndex={currentCardIndex}
                            onIndexChange={setCurrentCardIndex}
                            onNameSelect={onNameSelect}
                            favorites={favorites}
                            onToggleFavorite={onToggleFavorite}
                        />

                        {/* Right Arrow */}
                        <button
                            onClick={goToNext}
                            disabled={currentCardIndex === visibleNames.length - 1}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-20 w-11 h-11 rounded-full transition-all shadow-lg ${currentCardIndex === visibleNames.length - 1
                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 active:scale-95'
                                }`}
                        >
                            <ChevronRight className="w-6 h-6 mx-auto" />
                        </button>
                    </div>

                    {/* Progress Indicator - Clean */}
                    <div className="flex items-center justify-center gap-3 px-4">
                        <div className="flex items-center gap-1.5">
                            {visibleNames.slice(0, Math.min(5, visibleNames.length)).map((_, idx) => {
                                const actualIndex =
                                    currentCardIndex < 2
                                        ? idx
                                        : currentCardIndex > visibleNames.length - 3
                                            ? visibleNames.length - 5 + idx
                                            : currentCardIndex - 2 + idx;

                                if (actualIndex < 0 || actualIndex >= visibleNames.length) return null;

                                return (
                                    <div
                                        key={actualIndex}
                                        className={`h-1.5 rounded-full transition-all ${actualIndex === currentCardIndex
                                                ? 'w-8 bg-gradient-to-r from-orange-400 to-orange-600'
                                                : 'w-1.5 bg-slate-300'
                                            }`}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-slate-700 font-bold text-sm px-3 py-1.5 bg-slate-100 rounded-full">
                            {currentCardIndex + 1}/{totalCount}
                        </span>
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
