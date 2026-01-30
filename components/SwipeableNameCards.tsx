import React, { useState, useRef, useEffect } from 'react';
import { BabyName } from '../types';
import NameCard from './NameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SwipeableNameCardsProps {
    names: BabyName[];
    currentIndex: number;
    onIndexChange: (index: number) => void;
    onNameSelect: (name: BabyName) => void;
    favorites: string[];
    onToggleFavorite: (id: string) => void;
}

const SwipeableNameCards: React.FC<SwipeableNameCardsProps> = ({
    names,
    currentIndex,
    onIndexChange,
    onNameSelect,
    favorites,
    onToggleFavorite,
}) => {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Threshold mínimo para considerar um swipe (em pixels)
    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);

        // Calcula o offset para feedback visual
        const offset = currentTouch - touchStart;
        setDragOffset(offset);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            setIsDragging(false);
            setDragOffset(0);
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentIndex < names.length - 1) {
            // Swipe para esquerda - próximo
            onIndexChange(currentIndex + 1);
        } else if (isRightSwipe && currentIndex > 0) {
            // Swipe para direita - anterior
            onIndexChange(currentIndex - 1);
        }

        // Reset
        setIsDragging(false);
        setDragOffset(0);
        setTouchStart(null);
        setTouchEnd(null);
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            onIndexChange(currentIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentIndex < names.length - 1) {
            onIndexChange(currentIndex + 1);
        }
    };

    if (names.length === 0) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-slate-400">
                <p className="text-center">Nenhum nome encontrado</p>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Container de Cards */}
            <div
                ref={containerRef}
                className="relative h-[60vh] touch-pan-y overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                }}
            >
                {/* Card Atual */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{
                        transform: isDragging
                            ? `translateX(${dragOffset}px) scale(${1 - Math.abs(dragOffset) / 1000})`
                            : 'translateX(0) scale(1)',
                    }}
                >
                    <div className="w-full max-w-md px-4">
                        <NameCard
                            data={names[currentIndex]}
                            onSelect={onNameSelect}
                            isFavorite={favorites.includes(names[currentIndex].id)}
                            onToggleFavorite={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(names[currentIndex].id);
                            }}
                        />
                    </div>
                </div>

                {/* Preview do próximo card (direita) */}
                {currentIndex < names.length - 1 && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300"
                        style={{
                            opacity: isDragging && dragOffset < 0 ? Math.abs(dragOffset) / 200 : 0,
                            transform: 'translateX(100%)',
                        }}
                    >
                        <div className="w-full max-w-md px-4">
                            <NameCard
                                data={names[currentIndex + 1]}
                                onSelect={() => { }}
                                isFavorite={favorites.includes(names[currentIndex + 1].id)}
                                onToggleFavorite={() => { }}
                            />
                        </div>
                    </div>
                )}

                {/* Preview do card anterior (esquerda) */}
                {currentIndex > 0 && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300"
                        style={{
                            opacity: isDragging && dragOffset > 0 ? Math.abs(dragOffset) / 200 : 0,
                            transform: 'translateX(-100%)',
                        }}
                    >
                        <div className="w-full max-w-md px-4">
                            <NameCard
                                data={names[currentIndex - 1]}
                                onSelect={() => { }}
                                isFavorite={favorites.includes(names[currentIndex - 1].id)}
                                onToggleFavorite={() => { }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Botões de Navegação (Fallback) */}
            <div className="flex justify-between items-center mt-4 px-4 max-w-md mx-auto">
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className={`p-3 rounded-full transition-all ${currentIndex === 0
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-white text-slate-700 hover:bg-slate-50 active:scale-95 shadow-md'
                        }`}
                    aria-label="Nome anterior"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Indicadores de Paginação (Dots) */}
                <div className="flex items-center gap-2">
                    {names.slice(0, Math.min(names.length, 5)).map((_, idx) => {
                        const actualIndex = currentIndex < 3
                            ? idx
                            : currentIndex > names.length - 3
                                ? names.length - 5 + idx
                                : currentIndex - 2 + idx;

                        if (actualIndex < 0 || actualIndex >= names.length) return null;

                        return (
                            <button
                                key={actualIndex}
                                onClick={() => onIndexChange(actualIndex)}
                                className={`transition-all ${actualIndex === currentIndex
                                        ? 'w-6 h-2 rounded-full bg-gradient-to-r from-[#f7b733] to-[#fc4a1a]'
                                        : 'w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400'
                                    }`}
                                aria-label={`Ir para nome ${actualIndex + 1}`}
                            />
                        );
                    })}
                    {names.length > 5 && (
                        <span className="text-xs text-slate-400 ml-1">
                            {currentIndex + 1}/{names.length}
                        </span>
                    )}
                </div>

                <button
                    onClick={goToNext}
                    disabled={currentIndex === names.length - 1}
                    className={`p-3 rounded-full transition-all ${currentIndex === names.length - 1
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-white text-slate-700 hover:bg-slate-50 active:scale-95 shadow-md'
                        }`}
                    aria-label="Próximo nome"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Contador e Dica de Swipe */}
            <div className="text-center mt-4 space-y-2">
                <p className="text-sm font-bold text-slate-700">
                    {names[currentIndex].name}
                </p>
                <p className="text-xs text-slate-400">
                    👆 Arraste para os lados ou use as setas
                </p>
            </div>
        </div>
    );
};

export default SwipeableNameCards;
