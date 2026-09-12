import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';

// ONE BOOK AT A TIME: the book a route opens is the only one loaded, so the theme it registers on
// Book is the page's and no other book's registration stands beside it.
const opened = async () => {
    if (location.pathname.startsWith('/article')) return (await import('./.article/book')).book;
    if (location.pathname.startsWith('/turing')) return (await import('./turing/book')).book;

    return (await import('./.encyclopedia/book')).book;
};

const Opened = $(await opened());

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
