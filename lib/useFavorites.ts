'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'eventbar_favorites';

export interface Favorite {
    drinkId: string;
    drinkName: string;
    mixerIds: string[];
    timestamp: string;
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
    }, []);

    const saveFavorites = (newFavorites: Favorite[]) => {
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    };

    const addFavorite = (favorite: Omit<Favorite, 'timestamp'>) => {
        const newFavorite: Favorite = {
            ...favorite,
            timestamp: new Date().toISOString(),
        };
        const updated = [newFavorite, ...favorites.filter(f => f.drinkId !== favorite.drinkId)];
        saveFavorites(updated.slice(0, 10)); // Keep only 10 most recent
    };

    const removeFavorite = (drinkId: string) => {
        saveFavorites(favorites.filter(f => f.drinkId !== drinkId));
    };

    const isFavorite = (drinkId: string) => {
        return favorites.some(f => f.drinkId === drinkId);
    };

    const clearFavorites = () => {
        saveFavorites([]);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
    };
}
