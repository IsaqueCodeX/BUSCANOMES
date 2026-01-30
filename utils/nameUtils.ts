import { BabyName } from '../types';

/**
 * Calcula quantos nomes existem em uma categoria específica
 */
export const getCountByCategory = (
    names: BabyName[],
    categoryId: string
): number => {
    return names.filter(name => name.category === categoryId).length;
};

/**
 * Calcula quantos nomes começam com uma letra específica
 */
export const getCountByLetter = (
    names: BabyName[],
    letter: string
): number => {
    return names.filter(name =>
        name.name.toUpperCase().startsWith(letter.toUpperCase())
    ).length;
};

/**
 * Calcula quantos nomes são de um gênero específico
 */
export const getCountByGender = (
    names: BabyName[],
    gender: 'M' | 'F' | 'U'
): number => {
    return names.filter(name => name.gender === gender).length;
};
