import React, { useRef, useState, useEffect } from 'react';
import { BabyName } from '../types';
import MobileNameCard from './MobileNameCard';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    // Reset drag state when index changes
    useEffect(() => {
        setDragOffset(0);
        setIsDragging(false);
    }, [currentIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        setDragOffset(diff);
    };

    const handleTouchEnd = () => {
        if (!startX) return;
        const threshold = 100; // Minimum swipe distance

        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0 && currentIndex > 0) {
                onIndexChange(currentIndex - 1);
            } else if (dragOffset < 0 && currentIndex < names.length - 1) {
                onIndexChange(currentIndex + 1);
            }
        }

        setStartX(null);
        setIsDragging(false);
        setDragOffset(0);
    };

    if (names.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl shadow-sm border border-slate-100 min-h-[300px]">
                <p className="text-slate-500 font-medium">Não há nomes para exibir</p>
                <p className="text-slate-400 text-sm mt-2">Tente mudar os filtros</p>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Container de Cards */}
            <div
                ref={containerRef}
                className="relative min-h-[460px] touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                }}
            >
                {/* Card Atual */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-sm px-1 transition-transform duration-300"
                        style={{
                            transform: isDragging
                                ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`
                                : 'translateX(0) rotate(0)',
                            opacity: isDragging ? 1 - Math.abs(dragOffset) / 500 : 1
                        }}
                    >
                        <MobileNameCard
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
            </div>
        </div>
    );
};

export default SwipeableNameCards;
