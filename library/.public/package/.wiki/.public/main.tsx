import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { book as encyclopedia } from './.encyclopedia/book';
import { book as article } from './.article/book';

const Opened = $(location.pathname.startsWith('/article') ? article : encyclopedia);

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
