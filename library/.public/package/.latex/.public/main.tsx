// The .latex demo beside .wiki: one book, LatexTheme installed. Reads dist, not src — a change in src does nothing here until npm run build.
// KATEX SHIPS ITS OWN SHEET AND FONTS, and a paper that sets mathematics loads them the way it
// loads a face. Without it katex's MathML fallback — which that sheet hides — stands BESIDE the
// html katex also emits, so every formula on this page was drawn TWICE, and the glyphs there was
// no font for came out as boxes.
import 'katex/dist/katex.min.css';
import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { book } from './aaronson/book';

const Opened = $(book);

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
