'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PokemonListItem } from '@/lib/data/pokemon';

interface CompareContextType {
  selectedPokemon: PokemonListItem[];
  addToCompare: (pokemon: PokemonListItem) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isSelected: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonListItem[]>([]);

  const addToCompare = (pokemon: PokemonListItem) => {
    if (selectedPokemon.length < 3 && !selectedPokemon.find(p => p.id === pokemon.id)) {
      setSelectedPokemon([...selectedPokemon, pokemon]);
    }
  };

  const removeFromCompare = (id: number) => {
    setSelectedPokemon(selectedPokemon.filter(p => p.id !== id));
  };

  const clearCompare = () => {
    setSelectedPokemon([]);
  };

  const isSelected = (id: number) => {
    return selectedPokemon.some(p => p.id === id);
  };

  return (
    <CompareContext.Provider value={{ selectedPokemon, addToCompare, removeFromCompare, clearCompare, isSelected }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
