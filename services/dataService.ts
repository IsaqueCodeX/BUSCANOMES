import { BabyName, Category } from '../types';
import { CATEGORIES } from '../constants'; // Categories remain static for now

export const fetchNames = async (): Promise<BabyName[]> => {
    try {
        const response = await fetch('/data/names.json');
        if (!response.ok) {
            throw new Error('Failed to fetch names');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading names:", error);
        return [];
    }
};

export const fetchCategories = (): Category[] => {
    return CATEGORIES;
};
