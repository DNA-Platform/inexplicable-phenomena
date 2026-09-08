// The .latex demo beside .wiki: one book, LatexTheme installed. Reads dist, not src — a change in src does nothing here until npm run build.
import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { book } from './aaronson/book';

const Opened = $(book);

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
