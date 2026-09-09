// The .latex demo beside .wiki: one book, LatexTheme installed. Reads dist, not src — a change in src does nothing here until npm run build.
// KATEX SHIPS ITS OWN SHEET AND FONTS, and a paper that sets mathematics loads them the way it
// loads a face. Without it katex's MathML fallback — which that sheet hides — stands BESIDE the
// html katex also emits, so every formula on this page was drawn TWICE, and the glyphs there was
// no font for came out as boxes.
// LATEX.CSS IS THE DOCUMENT, taken as a real dependency the way this package already takes
// @tailwindcss/typography and wikimedia's palette rather than copying values out of them. Doug:
// "Find the best stylesheet package that you can to get the whole latex document feel." It is
// classless, so every element our kinds already write — p, h2, table, pre, blockquote, figure — is
// dressed by it without a class, and it brings the REAL Latin Modern webfonts, which no amount of
// naming a font family we do not have could do.
//
// TWO THINGS IT IS NOT, read out of its own 785 lines rather than assumed: it does NOT number
// sections (it numbers theorems, definitions, figures, tables and sidenotes), and it is a WEB
// ARTICLE — body at 80ch on 1.8 leading at 16px — not a page. The sheet, the desk, the strip and
// the point sizes stay ours; what comes from here is the document's feel and its face.
import 'latex.css/style.min.css';
import 'katex/dist/katex.min.css';
import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { book } from './aaronson/book';

const Opened = $(book);

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
