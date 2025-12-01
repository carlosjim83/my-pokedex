## 🤖 AGENTS.md

### 📜 Purpose

This document outlines the high-level software agents, components, data fetching strategies, and project policies used in the **Next.js Pokédex Application**. The goal is to clearly define data flow, responsibilities, and procedural rules for documentation and version control.

---

### 1. Data Source Agent

#### 1.1. PokeAPI Connector (`/lib/poke-api.ts`)

| Role | Responsibility | Details |
| :--- | :--- | :--- |
| **Data Connector** | Handles all external HTTP requests to the `pokeapi.co` endpoints. | Responsible for building correct URLs, handling query parameters, and basic error checking on the fetch operation. |
| **Output** | Raw JSON data from the PokeAPI. | |
| **Next.js Strategy**| Primarily used by **Server Components** (App Router) or **`getStaticProps` / `getServerSideProps`** (Pages Router) to ensure fetching happens on the server. | |

#### 1.2. Data Transformer (`/lib/transformers.ts`)

| Role | Responsibility | Details |
| :--- | :--- | :--- |
| **Processor/Mapper**| Takes the raw, often complex, PokeAPI JSON and transforms it into a clean, simplified data structure (`PokemonSummary`, `PokemonDetail`) for consumption by UI components. | Flattens nested data (e.g., extracting just the English flavor text, mapping stats into a simple object, calculating total stats). |
| **Output** | Typed TypeScript objects ready for rendering. | Enhances maintainability by abstracting complex API responses. |

---

### 2. View Agents (Server & Client Components)

These agents are responsible for assembling data and presenting the UI to the user.

#### 2.1. Server-Side Data Agent (Page/Layout)

| Component | Responsibility | Details |
| :--- | :--- | :--- |
| **`app/page.tsx`** (List View) | Fetches the initial list of Pokémon IDs and summary data. | Uses **SSG** (Static Site Generation) via the PokeAPI Connector to provide a fast, pre-rendered list. |
| **`app/pokemon/[slug]/page.tsx`** (Detail View)| Fetches comprehensive data for a single Pokémon. | Uses **Dynamic SSG** (`generateStaticParams`) to pre-render the most important Pokémon pages, ensuring fast page loads for individual entries. |

#### 2.2. Client-Side Interaction Agent (`/components/SearchFilter.tsx`)

| Component | Responsibility | Details |
| :--- | :--- | :--- |
| **Search/Filter Bar** | Handles all user interactions related to filtering and searching the Pokédex list. | Manages local state for search query and selected types. |
| **Data Flow** | It receives the **full initial list** as a prop from its parent Server Component and performs client-side filtering (e.g., based on name or number) for instant results. | **Note:** For type filtering, it might trigger a client-side data fetch if the full type data is not pre-fetched. |
| **Output** | Updates the visible list of `PokemonCard` components based on user input. |

#### 2.3. Display Agents (`/components/PokemonCard.tsx`, `/components/StatBars.tsx`)

| Component | Responsibility | Details |
| :--- | :--- | :--- |
| **`PokemonCard`** | Displays the minimal summary of a Pokémon (Name, ID, Image, Types). | Optimized using `next/image` for performance. |
| **`StatBars`** | Visualizes the base stats (HP, Attack, etc.) on the detail page. | Focuses solely on rendering UI elements based on simple props. |

---

### 3. Data Flow Summary

| Action | Agent(s) Involved | Data Fetching Strategy | Location |
| :--- | :--- | :--- | :--- |
| **Initial List Load** | PokeAPI Connector, Data Transformer, List View Agent | **SSG** (Static Site Generation) | Server (during build) |
| **Pokémon Detail Load** | PokeAPI Connector, Data Transformer, Detail View Agent | **SSG/ISR** (Incremental Static Regeneration) | Server (during build or on request) |
| **Search/Filter** | Client-Side Interaction Agent | **Client-Side Filtering** on pre-fetched data | Browser |

---

### 4. Project Policies (Documentation & Versioning) 📢

| Policy | Description | Required Files |
| :--- | :--- | :--- |
| **Documentation Rule** | **Todo el contenido generado o las guías de implementación proporcionadas por el asistente (código, explicaciones, estructuras) se documentarán en la carpeta `docs/` en archivos Markdown.** | `docs/*.md` |
| **Version Increment** | Por cada cambio funcional o *bug fix* en el código de la aplicación, **se aumentará la versión en el archivo `package.json`** siguiendo el versionado semántico (MAJOR.MINOR.PATCH). | `package.json` |
| **Changelog Rule** | Cada incremento de versión y los cambios relevantes (nuevas características, correcciones, mejoras de rendimiento) se registrarán de forma clara y concisa en el archivo **`CHANGELOG.md`**. | `CHANGELOG.md` |