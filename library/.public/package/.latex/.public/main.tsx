// CREATED 2026-09-08 — Sprint 53 scaffold. THE .latex DEMO, beside .wiki: one book, the Aaronson article Doug supplies, drawn with article/Theme installed. build.mjs (copied from .wiki/.public) lifts the books into this served copy; vite.config.ts aliases @dna-platform/public to ../../dist — a change in src does nothing here until `npm run build` (the trap, 09).
// OWED: the route table once the paper's chapters exist; the integration driver (verify-latex.mjs) that serves the built dir and asserts title, abstract, equation count, theorem labels, references, zero refusal panels, zero console errors.
import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { book } from './aaronson/book';

const Opened = $(book);

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
