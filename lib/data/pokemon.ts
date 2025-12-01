'use server';

/**
 * @interface PokemonListItem
 * @description Represents a single Pokémon in the list.
 */
export interface PokemonListItem {
  id: number;
  name: string;
}

interface PokeAPIResponse {
  results: {
    name: string;
    url: string;
  }[];
}

/**
 * @function fetchFirstGenPokemonList
 * @description Fetches the first 151 Pokémon from the PokeAPI and transforms the data.
 * @returns {Promise<PokemonListItem[]>} A promise that resolves to an array of Pokémon.
 */
export async function fetchFirstGenPokemonList(): Promise<PokemonListItem[]> {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }
    const data: PokeAPIResponse = await response.json();

    const pokemonList: PokemonListItem[] = data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2], 10);
      const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      
      return { id, name };
    });

    return pokemonList;
  } catch (error) {
    console.error('Error fetching first generation Pokémon:', error);
    return []; // Return an empty array or handle the error as appropriate
  }
}

/**
 * @interface PokemonDetail
 * @description Represents the detailed information of a single Pokémon.
 */
export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  stats: {
    name: string;
    base_stat: number;
  }[];
  height: number; // in decimetres
  weight: number; // in hectograms
}

/**
 * @function fetchPokemonDetails
 * @description Fetches the detailed information for a single Pokémon.
 * @param {string} name - The name of the Pokémon to fetch.
 * @returns {Promise<PokemonDetail | null>} A promise that resolves to the Pokémon details or null if not found.
 */
export async function fetchPokemonDetails(name: string): Promise<PokemonDetail | null> {
  if (!name || typeof name !== 'string') {
    console.error('fetchPokemonDetails called with invalid name:', name);
    return null;
  }
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Not found
      }
      throw new Error(`Failed to fetch Pokémon details for ${name}`);
    }
    const data = await response.json();

    const pokemonDetail: PokemonDetail = {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      imageUrl: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((typeInfo: any) => typeInfo.type.name),
      stats: data.stats.map((statInfo: any) => ({
        name: statInfo.stat.name,
        base_stat: statInfo.base_stat,
      })),
      height: data.height,
      weight: data.weight,
    };

    return pokemonDetail;
  } catch (error) {
    console.error(`Error fetching Pokémon details for ${name}:`, error);
    return null;
  }
}
