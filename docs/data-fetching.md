# Documentación de Fetching de Datos

Este documento detalla la implementación de la función `fetchFirstGenPokemonList`, responsable de obtener y transformar los datos de la primera generación de Pokémon desde la PokeAPI.

## Archivo

-   `lib/data/pokemon.ts`

## Interfaz `PokemonListItem`

Define la estructura de datos para cada Pokémon en la lista.

```typescript
export interface PokemonListItem {
  id: number;
  name: string;
}
```

## Función `fetchFirstGenPokemonList`

Función asíncrona que realiza las siguientes operaciones:

1.  **Fetching de Datos:** Llama al endpoint de la PokeAPI para obtener los primeros 151 Pokémon.
    -   **URL:** `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
2.  **Transformación:**
    -   Mapea la respuesta JSON.
    -   Extrae el `id` de la URL de cada Pokémon.
    -   Capitaliza el `name` del Pokémon.
3.  **Retorno:** Devuelve una promesa que se resuelve en un array de objetos `PokemonListItem`.

### Ejemplo de Uso

```typescript
import { fetchFirstGenPokemonList } from '@/lib/data/pokemon';

async function getPokemon() {
  const pokemonList = await fetchFirstGenPokemonList();
  console.log(pokemonList);
}
```
