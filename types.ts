
export interface BabyName {
  id: string;
  name: string;
  meaning: string;
  origin: string;
  curiosity: string;
  category: string;
  gender: 'M' | 'F' | 'U';
  famousPersonalities?: string[];
  tags: string[];
  imageUrl?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface NameResponse {
  meaning: string;
  origin: string;
  curiosity: string;
  famousPersonalities?: string[];
}
