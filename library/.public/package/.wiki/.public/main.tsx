import { createRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { book as encyclopedia } from './.encyclopedia/book';
import { book as article } from './.article/book';
import { book as turing } from './alan-turing/book';

const opened = () => {
    if (location.pathname.startsWith('/article')) return article;
    if (location.pathname.startsWith('/turing')) return turing;

    return encyclopedia;
};

const Opened = $(opened());

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(<Opened />);
