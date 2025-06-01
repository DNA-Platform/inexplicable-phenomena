/**
 * Build Catalogue - Scans library directory and generates catalogue structure
 * 
 * Environment Variables (from .env):
 * - LIBRARY="./library" - Root library directory containing content
 * - LIBRARY_SOURCE="./library/.catalogue" - React app source directory  
 * - LIBRARY_BUILD="./library/.public" - Build output directory
 * 
 * Main Tasks:
 * 1. Scan LIBRARY directory for all .tsx files (excluding dot-prefixed folders)
 * 2. Clean and normalize file paths using path algorithm
 * 3. Generate nested Catalogue structure matching folder hierarchy
 * 4. Output LibraryCatalogue.ts with typed structure and dynamic imports
 * 5. Output routes.ts with flat route mapping for React Router
 * 
 * Path Cleaning Algorithm:
 * 1. Split file path by "/" using cross-platform helper (handles Windows "\")
 * 2. For each path segment, apply regex /[a-zA-Z0-9].*$/ to match from first 
 *    alphanumeric character to end, removing prefixes:
 *    - "1 - page.tsx" becomes "page.tsx"
 *    - ".cover" becomes "cover" 
 *    - "3-advanced-topics.tsx" becomes "advanced-topics.tsx"
 * 3. Reassemble the cleaned path segments with "/"
 * 4. Remove {projectroot}/library prefix to get app-relative path
 * 5. Remove .tsx extension for final route path
 * 
 * Example transformations:
 * Input:  {projectroot}/library/articles/.cover/1 - amazing-content.tsx
 * Step 1: ["library", "articles", ".cover", "1 - amazing-content.tsx"]
 * Step 2: ["library", "articles", "cover", "amazing-content.tsx"]
 * Step 3: "library/articles/cover/amazing-content.tsx"  
 * Step 4: "/articles/cover/amazing-content.tsx"
 * Step 5: "/articles/cover/amazing-content"
 * 
 * Generated Files:
 * 
 * 1. LIBRARY_SOURCE/LibraryCatalogue.ts:
 *    - Nested TypeScript interfaces matching folder structure
 *    - Default export of catalogue instance with references and subCatalogues
 *    - Dynamic imports for lazy loading: () => import('../../articles/test.tsx')
 *    - Type-safe access: catalogue.articles.cover['amazing-content']
 * 
 * 2. LIBRARY_SOURCE/routes.ts:
 *    - Flat array of route objects: { path: string, loadComponent: () => Promise<any> }
 *    - Used by React Router for route generation
 *    - Paths match the cleaned algorithm output exactly
 * 
 * Dependencies:
 * - glob: Find .tsx files recursively
 * - path: Cross-platform path operations
 * - fs-extra: File system operations with promises
 * - dotenv: Load environment variables
 * 
 * Cross-platform considerations:
 * - Use path.sep for platform-specific separators
 * - Normalize all paths to forward slashes for web URLs
 * - Handle Windows drive letters in absolute paths
 */

/**
 * Reference Tree Organization:
 * 
 * The scanner builds a hierarchical tree structure using these classes:
 * 
 * LibraryReference:
 * - Concrete class for individual content references (NOT subclassed)
 * - Properties: path (string), loadComponent (() => Promise<LibraryReferent>)
 * - Represents a single .tsx file in the library
 * 
 * Catalogue:
 * - Base class for folder collections (GETS SUBCLASSED by builder)
 * - Base properties: folder (string), references (LibraryReference[] in alphabetical order)
 * - Builder creates strongly-typed subclasses with named properties
 * 
 * Tree Building Process:
 * 1. For each discovered .tsx file, create a LibraryReference with cleaned path
 * 2. Group references by their parent directory structure
 * 3. For each unique directory path, generate a strongly-typed Catalogue subclass:
 *    - /articles → ArticlesCatalogue extends Catalogue
 *    - /articles/science → ArticlesScienceCatalogue extends Catalogue  
 *    - /notes/personal → NotesPersonalCatalogue extends Catalogue
 * 4. Each subclass gets strongly-typed properties for:
 *    - Individual files as LibraryReference properties
 *    - Subfolders as child Catalogue properties
 * 5. Plus the base references array for iteration
 * 
 * Example Generated Structure:
 * 
 * class ArticlesCatalogue extends Catalogue {
 *   folder = "articles";
 *   
 *   // Strongly-typed file properties (LibraryReference leaves)
 *   intro: LibraryReference;     // articles/intro.tsx
 *   advanced: LibraryReference;  // articles/advanced.tsx
 *   
 *   // Strongly-typed subfolder properties (Catalogue branches)
 *   science: ArticlesScienceCatalogue;  // articles/science/ folder
 *   history: ArticlesHistoryCatalogue;  // articles/history/ folder
 *   
 *   // Base array for iteration
 *   references = [this.intro, this.advanced]; // alphabetical order
 * }
 * 
 * class ArticlesScienceCatalogue extends Catalogue {
 *   folder = "articles/science";
 *   
 *   // File leaves
 *   physics: LibraryReference;   // articles/science/physics.tsx
 *   chemistry: LibraryReference; // articles/science/chemistry.tsx
 *   
 *   // Base array
 *   references = [this.chemistry, this.physics]; // alphabetical
 * }
 * 
 * Root LibraryCatalogue:
 * - Top-level catalogue with properties for each root folder
 * - articles: ArticlesCatalogue, notes: NotesCatalogue, etc.
 * - Enables both type-safe access AND iteration:
 *   * libraryCatalogue.articles.science.physics.loadComponent() // Type-safe
 *   * libraryCatalogue.articles.references.forEach(...) // Iteration
 * 
 * Benefits:
 * - Catalogue tree structure with LibraryReference leaves
 * - Type-safe navigation to any file: catalogue.articles.science.physics
 * - Iteration support: catalogue.articles.references
 * - Alphabetical ordering for consistent navigation
 * - Lazy loading through LibraryReference.loadComponent()
 */