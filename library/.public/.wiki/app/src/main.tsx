import { Suspense, lazy, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import { $ } from '@dna-platform/chemistry';
import { Ref } from '@dna-platform/lib';
import { books } from './library/books';
import { cards } from './library/cards';

const Shell = () => (
    <div>
        <nav>
            <Ref path="/">The Library</Ref>
            {' · '}
            <Ref path="https://en.wikipedia.org/wiki/Main_Page">Wikipedia</Ref>
        </nav>
        <Outlet />
    </div>
);

const Home = () => (
    <main>
        <h1>The Library</h1>
        <p>the books the library holds</p>
        <ul>
            {cards.map(one => (
                <li key={one.route}>
                    <Ref path={one.route}>{one.title}</Ref>
                </li>
            ))}
        </ul>
    </main>
);

const Reading = () => {
    const { route } = useParams();
    const held = route ? books['/' + route] : undefined;
    const Page = useMemo(() => held === undefined ? undefined : lazy(async () => {
        const { book } = await held();
        const Book = $(book);
        return { default: () => <Book /> };
    }), [route]);
    if (!Page) return <main>nothing stands at this route</main>;
    return <Suspense fallback={<main>opening…</main>}><Page /></Suspense>;
};

const root = document.getElementById('root');
if (!root) throw new Error('no #root element');
createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Shell />}>
                <Route index element={<Home />} />
                <Route path=":route" element={<Reading />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
