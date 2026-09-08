// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. Every promise the assignment OWES, as a todo, so the suite counts what is not yet true. Each becomes a real promise in its own file as its unit lands, and its todo is deleted here — this file is done when it is empty.
import { describe, it } from 'vitest';

describe('Sprint 53 — the annotative theme (R1–R11)', () => {
    it.todo('R2 — no bond constructor constructs a theme: the perf gate\'s construction count drops by the writing count, text hash identical');
    it.todo('R3 — the base theme is the sheet: /, /article, /turing read as GitHub markdown with NOTHING registered');
    it.todo('R4 — every kind writes its element: <p>, <h2>, <ul>, <article> counts on /turing equal the model\'s');
    it.todo('R5 — the encyclopedia is one theme subclass: /turing under $(Wikipedia, Theme)(EncyclopediaTheme) is text-identical to today (57,137 chars) and visually the same, driven');
    it.todo('R6 — $Book holds no block slices and draws flat; the Colophon anchor is gone from /turing\'s contents');
    it.todo('R7 — one ancestor walk: $Bookmark.chapter() and reflection.indent use reflection.nearest');
    it.todo('R8 — $composesWhatItHolds struck; 09\'s 326 console errors per load on /article go to 0');
    it.todo('R9 — a <Title> in a <Section> stands (title.test.tsx goes green)');
    it.todo('R10 — four doors: `.`, `./book`, `./article`, `./encyclopedia`; the demos import from the right one');
});

describe('Math, Equation, Code in the base (the sprint after)', () => {
    it.todo('$Math draws inline TeX once per copy through tex.inline, and a stop inside it ends no sentence');
    it.todo('$Equation draws display TeX and is numbered by its index among its chapter\'s equations — a reading');
    it.todo('$Code draws through a highlighting box with $language, and parts() is never called in the default draw (PS3)');
    it.todo('basic math works with NO theme registered');
});

describe('/article — the LaTeX article as a book type', () => {
    it.todo('an $Article is a Part: a book holding an article part and a margin part enumerates chapters two levels down (Sprint 51 U5)');
    it.todo('a $Theorem is numbered by a reading, its label its heading');
    it.todo('$(Book, Theme)(LatexTheme) installs the look: serif face, numbered headings, centred title block — driven on .latex');
});

describe('/encyclopedia — Wikipedia as a book type', () => {
    it.todo('an $Infobox draws its lines with labels from attr(label), every field optional (Sprint 51 R9)');
    it.todo('a $Hatnote stands before its section\'s prose');
    it.todo('the subject chain above Turing: the subject book of the article, and of that, up to the book that is its own subject');
});

describe('the demos as gates (PS5, PS6)', () => {
    it.todo('.wiki: a suite drives the served portal, article and turing pages — text, contents, infobox rows, elements, refusals, console errors');
    it.todo('.latex: a suite drives the served Aaronson article — title, abstract, equations, theorems, references; it feels native');
});
