
import { BabyName, Category } from './types';

export const CATEGORIES: Category[] = [
  // ORIGEM (Linguística)
  { id: 'latim', label: 'Latim', icon: '', color: '#8B4513' },
  { id: 'hebraico', label: 'Hebraico', icon: '', color: '#4169E1' },
  { id: 'grego', label: 'Grego', icon: '', color: '#DAA520' },
  { id: 'germanico', label: 'Germânico', icon: '', color: '#708090' },
  { id: 'celta', label: 'Celta', icon: '', color: '#228B22' },
  { id: 'brasileiro', label: 'Brasileiro', icon: '', color: '#FFD700' },
  { id: 'frances', label: 'Francês', icon: '', color: '#0055A4' },
  { id: 'italiano', label: 'Italiano', icon: '', color: '#009246' },
  { id: 'ingles', label: 'Inglês', icon: '', color: '#C8102E' },
  { id: 'espanhol', label: 'Espanhol', icon: '', color: '#FFC400' },
  { id: 'arabe', label: 'Árabe', icon: '', color: '#007A3D' },
  { id: 'japones', label: 'Japonês', icon: '', color: '#BC002D' },

  // CULTURA POP
  { id: 'herois', label: 'Heróis & Vilões', icon: '', color: '#DC143C' },
  { id: 'celebridades', label: 'Celebridades', icon: '', color: '#FF69B4' },
  { id: 'anos2000', label: 'Anos 2000', icon: '', color: '#FF1493' },
  { id: 'series', label: 'Séries e TV', icon: '', color: '#8A2BE2' },
  { id: 'rock', label: 'Rock & Música', icon: '', color: '#1C1C1C' },
  { id: 'anime', label: 'Anime', icon: '', color: '#FF6347' },
  { id: 'disney', label: 'Disney', icon: '', color: '#4169E1' },

  // ESPORTES
  { id: 'futebol', label: 'Futebol', icon: '', color: '#32CD32' },
  { id: 'nba', label: 'Basquete', icon: '', color: '#FF8C00' },
  { id: 'olimpicos', label: 'Atletas Olímpicos', icon: '', color: '#FFD700' },

  // HISTÓRIA & MITOLOGIA
  { id: 'mitologia', label: 'Mitologia', icon: '', color: '#4682B4' },
  { id: 'vikings', label: 'Vikings', icon: '', color: '#8B4513' },
  { id: 'realeza', label: 'Realeza', icon: '', color: '#9370DB' },
  { id: 'historicos', label: 'Figuras Históricas', icon: '', color: '#A0522D' },

  // ESTILO DE VIDA
  { id: 'biblicos', label: 'Bíblicos', icon: '', color: '#8B4513' },
  { id: 'natureza', label: 'Natureza', icon: '', color: '#3CB371' },
  { id: 'curtos', label: 'Curtos (Minimal)', icon: '', color: '#20B2AA' },
  { id: 'vintage', label: 'Vintage (Retrô)', icon: '', color: '#CD853F' },
  { id: 'internacionais', label: 'Internacionais', icon: '', color: '#4682B4' },
  { id: 'astrologia', label: 'Astrologia', icon: '', color: '#9932CC' },
];

export const INITIAL_CACHE: BabyName[] = [];
