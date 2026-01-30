import React from 'react';
import { BabyName } from '../types';
import { shareContent } from '../lib/utils';
import { Heart, Share2, Sparkles, Info } from 'lucide-react';

interface MobileNameCardProps {
    data: BabyName;
    onSelect: (name: BabyName) => void;
    isFavorite: boolean;
    onToggleFavorite: (e: React.MouseEvent) => void;
}

const MobileNameCard: React.FC<MobileNameCardProps> = ({ data, onSelect, isFavorite, onToggleFavorite }) => {
    if (!data) return null;

    const theme = {
        F: {
            bg: 'bg-rose-50',
            text: 'text-rose-600',
            border: 'border-rose-100',
            icon: 'bg-rose-100',
            gradient: 'from-rose-400 to-rose-600',
            badge: 'bg-rose-100 text-rose-700'
        },
        M: {
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-100',
            icon: 'bg-blue-100',
            gradient: 'from-blue-400 to-blue-600',
            badge: 'bg-blue-100 text-blue-700'
        },
        U: {
            bg: 'bg-slate-50',
            text: 'text-slate-600',
            border: 'border-slate-100',
            icon: 'bg-slate-100',
            gradient: 'from-slate-400 to-slate-600',
            badge: 'bg-slate-100 text-slate-700'
        }
    };

    const t = theme[data.gender] || theme.U;

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
        <div
            onClick={() => onSelect(data)}
            className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative group active:scale-[0.98] transition-all duration-300"
        >
            {/* Header Color Strip */}
            <div className={`h-2 w-full bg-gradient-to-r ${t.gradient}`} />

            <div className="p-6 flex flex-col items-center text-center space-y-4">
                {/* Header Info */}
                <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-1">
                        <Sparkles size={10} /> ORIGEM
                    </span>
                    <p className="text-sm font-black text-slate-800 uppercase tracking-wide">
                        {data.origin}
                    </p>
                </div>

                {/* Name & Gender */}
                <div className="py-2">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                        {data.name}
                    </h2>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${t.badge}`}>
                        {data.gender === 'M' ? 'Menino' : data.gender === 'F' ? 'Menina' : 'Unissex'}
                    </span>
                </div>

                {/* Meaning Section */}
                <div className={`w-full p-4 rounded-2xl ${t.bg} border ${t.border}`}>
                    <h3 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${t.text} flex items-center justify-center gap-1`}>
                        <Info size={10} /> Significado
                    </h3>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
                        "{!data.meaning || data.meaning === 'Significado pendente de atualização.' ? 'Significado sendo atualizado...' : data.meaning}"
                    </p>
                </div>

                {/* Curiosity (Optional) */}
                {data.curiosity && (
                    <div className="text-xs text-slate-500 line-clamp-2 px-2">
                        {data.curiosity}
                    </div>
                )}

                {/* Actions */}
                <div className="w-full flex items-center gap-3 pt-2">
                    <button
                        onClick={onToggleFavorite}
                        className={`p-3 rounded-2xl transition-all ${isFavorite ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                    </button>

                    <button
                        className={`flex-1 py-3.5 rounded-2xl text-white font-bold text-sm uppercase tracking-wider bg-gradient-to-r ${t.gradient} shadow-lg shadow-blue-500/20 active:shadow-sm transition-all`}
                    >
                        Detalhes
                    </button>

                    <button
                        onClick={handleShare}
                        className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileNameCard;
