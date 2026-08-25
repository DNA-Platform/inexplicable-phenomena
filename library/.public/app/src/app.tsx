import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Book, $Synopsis, $Cover } from '@dna-platform/lib';
import styled from 'styled-components';
import { $Card, at, fetch } from './catalogue';
import { keep, kept, topOf } from './bookmark';
import { GlobalStyle, faint, rule, ground, mark, measure } from './theme';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const here = (): string => {
    const path = window.location.pathname.slice(base.length);
    return path === '' || path === '/' ? '/' : path.replace(/\/$/, '');
};

const go = (path: string): void => {
    window.history.pushState({}, '', base + (path === '/' ? '/' : path));
    window.dispatchEvent(new PopStateEvent('popstate'));
};

// A BOOK IS CONSULTED WHEN IT CATALOGUES ANYTHING AND READ WHEN IT DOES NOT.
// The test is having a card, never following one: a catalogue must answer this
// with none of the books it holds present.
export const catalogued = (book: $Book): $Synopsis[] =>
    book.chapters.filter((c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis && c.card !== undefined);

// THE MEASURE IS THE THEME'S, not this stylesheet's. It was 42rem here and
// 42rem there, agreeing by coincidence — so narrowing the theme narrowed
// nothing, which is how a duplicated decision announces itself.
const Sheet = styled.div`
    max-width: ${measure};
    margin: 0 auto;
    padding: 4rem 1.5rem 8rem;
`;

const Running = styled.div`
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${faint};
    border-bottom: 1px solid ${rule};
    padding-bottom: 0.6rem;
    margin-bottom: 2.5rem;
    display: flex;
    gap: 0.5rem;
`;

const Step = styled.span`
    cursor: pointer;
    &:hover { color: ${mark}; }
`;

// THE LEADING AND THE RHYTHM ARE THE THEME'S TOO. This application draws the
// chapters itself rather than rendering the book — see the finding in the
// sprint chapter — so the book's own wrapper never runs, and these are the
// values it would have applied. Read rather than repeated, so one object still
// governs them.
const Failure = styled.div`
    color: ${mark};
    background: ${ground};
    border: 1px solid ${rule};
    padding: 1.5rem;
    font-family: ui-monospace, monospace;
    font-size: 0.9rem;
`;

class $App extends $Chemical {
    path = '/';
    book?: $Book = undefined;
    failed = '';
    started = false;

    place = 0;

    open(path: string) {
        this.path = path;
        this.book = undefined;
        this.failed = '';
        fetch(path)
            .then(book => {
                if (this.path !== path) return;
                this.book = book;
                if (catalogued(book).length) { window.scrollTo(0, 0); this.place = 0; }
                else this.arrive();
            })
            .catch(error => { if (this.path === path) this.failed = String(error.message ?? error); });
    }

    // Waiting for the chapter to EXIST rather than for a moment that ought to be
    // late enough. A guess about ordering wins until the day it does not, which
    // is already filed against this branch.
    arrive(tries = 24) {
        const drawn = document.querySelectorAll('[data-chapter]').length;
        const found = this.place ? document.querySelector(`[data-chapter="${this.place}"]`) : undefined;
        if (!drawn || (this.place && !found)) {
            if (tries) requestAnimationFrame(() => this.arrive(tries - 1));
            return;
        }
        if (found) { found.scrollIntoView(); this.place = 0; } else window.scrollTo(0, 0);
        this.passing();
    }

    // THE ADDRESS FOLLOWS THE READER. Whichever chapter stands at the top of the
    // page is the one the fragment names, and it is the place the bookmark keeps.
    passing() {
        const chapters = Array.from(document.querySelectorAll('[data-chapter]'));
        if (!chapters.length) return;
        // A reader at the foot of the page is reading the last chapter, however
        // little of it there was to scroll. A short book can never bring its
        // final chapter to the top of the screen, and the rule has to say so.
        const foot = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        const reached = chapters.filter(c => c.getBoundingClientRect().top <= 80);
        const open = (foot ? chapters[chapters.length - 1] : reached.length ? reached[reached.length - 1] : chapters[0]) as HTMLElement;
        const name = open.id;
        const seen = Number(open.dataset.chapter ?? 0);
        const want = base + this.path + (name ? `#${name}` : '');
        if (window.location.pathname + window.location.hash !== want) window.history.replaceState({}, '', want);
        keep(this.path, seen);
    }

    listen() {
        this.started = true;
        window.addEventListener('popstate', () => this.open(here()));
        window.addEventListener('click', event => {
            const found = (event.target as HTMLElement | null)?.closest?.('a[data-link]') as HTMLAnchorElement | null;
            if (!found || event.defaultPrevented || event.metaKey || event.ctrlKey || event.button !== 0) return;
            const to = found.getAttribute('data-link') ?? '';
            if (!to.startsWith('/')) return;
            event.preventDefault();
            go(to);
        });
        window.addEventListener('scroll', () => this.passing(), { passive: true });
        const start = here();
        const back = topOf(start) === start ? kept(start) : undefined;
        if (back) {
            this.place = back.at;
            go(back.path);
            return;
        }
        this.open(start);
    }

    trail(): ReactNode {
        const card = at(this.path);
        const chain: $Card[] = [];
        for (let up = card; up; up = up.subject === up ? undefined : up.subject) chain.unshift(up);
        return (
            <Running data-trail={chain.length}>
                {chain.map((step, i) => (
                    <Step key={step.path} data-step={step.path} onClick={() => go(step.path)}>
                        {(i ? '/ ' : '') + (step.canonical?.heading ?? step.name)}
                    </Step>
                ))}
            </Running>
        );
    }

    read(book: $Book): ReactNode {
        const Reading = $(book) as any;
        return (
            <div data-reader={catalogued(book).length ? undefined : book.chapters.filter(c => !c.parenthetical).length}>
                <Reading />
            </div>
        );
    }

    view(): ReactNode {
        if (!this.started) this.listen();
        const book = this.book;
        return (
            <Sheet>
                <GlobalStyle />
                {this.trail()}
                {this.failed ? <Failure data-failure>{this.failed}</Failure> : null}
                {book ? this.read(book) : null}
            </Sheet>
        );
    }
}

const App = $($App);

export function Library() {
    return <App />;
}

export { $Cover };
