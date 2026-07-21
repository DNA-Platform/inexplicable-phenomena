import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The public view onto the repository — built to GitHub Pages. It depends on
// @dna-platform/lib (the library core, in ./package) to render the library.
export default defineConfig({
    plugins: [react()],
    base: '/inexplicable-phenomena/',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
