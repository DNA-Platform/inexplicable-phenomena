import React, { type ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Highlight, themes } from 'prism-react-renderer';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Book } from '@/book/Book';
import { $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $TableOfContents } from '@/book/TableOfContents';
import { text } from '@/tools/html';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import algebraCoverSource from './book/library/algebra/01-the-cover.tsx?raw';
import algebraSynopsisSource from './book/library/algebra/02-the-synopsis.tsx?raw';
import coordinatesSource from './book/library/algebra/03-coordinates.tsx?raw';
import indexLawSource from './book/library/algebra/04-the-index-law.tsx?raw';
import summaryLawSource from './book/library/algebra/05-the-summary-law.tsx?raw';
import measureSource from './book/library/algebra/06-the-measure.tsx?raw';
import manifoldCoverSource from './book/library/the-manifold/01-the-cover.tsx?raw';
import manifoldSynopsisSource from './book/library/the-manifold/02-the-synopsis.tsx?raw';
import foldSource from './book/library/the-manifold/03-the-fold.tsx?raw';
import bookSource from '@/book/Book.tsx?raw';
import chapterSource from '@/book/Chapter.tsx?raw';
import coverSource from '@/book/Cover.tsx?raw';
import synopsisSource from '@/book/Synopsis.tsx?raw';
import tableOfContentsSource from '@/book/TableOfContents.tsx?raw';
import sectionSource from '@/writing/Section.tsx?raw';
import titleSource from '@/writing/Title.tsx?raw';
import {
    DayBackdrop, DayBar, DayChip, DayRule,
    ShelfBoard, Spine, CoverFace, CoverTitle, CoverSubtitle, CoverRule, CoverBlurb, CoverInvitation,
    Page, RunningHead, PageBody, PageTurns, PageTurn, Folio,
    ChapterNumber, ChapterTitle, ChapterSubtitle, Prose, EntryIndex,
    SectionHead, SectionSub, TocPage, TocLine, TocTag,
    CodeDrawer, CodeTabs, CodeTab, CodeBlock,
} from './book/books.styled';

const modelSources: Record<string, string> = {
    'Book.tsx': bookSource,
    'Chapter.tsx': chapterSource,
    'Cover.tsx': coverSource,
    'Synopsis.tsx': synopsisSource,
    'TableOfContents.tsx': tableOfContentsSource,
    'Section.tsx': sectionSource,
    'Title.tsx': titleSource,
};

const writingSources: Record<string, Record<string, string>> = {
    algebra: {
        '01-the-cover.tsx': algebraCoverSource,
        '02-the-synopsis.tsx': algebraSynopsisSource,
        '03-coordinates.tsx': coordinatesSource,
        '04-the-index-law.tsx': indexLawSource,
        '05-the-summary-law.tsx': summaryLawSource,
        '06-the-measure.tsx': measureSource,
    },
    manifold: {
        '01-the-cover.tsx': manifoldCoverSource,
        '02-the-synopsis.tsx': manifoldSynopsisSource,
        '03-the-fold.tsx': foldSource,
    },
};

type Row = {
    index: number;
    heading: string;
    subtitle: string;
    tagline: string;
    summary: string;
    body: string[];
    sections: { head: string; sub: string; paragraphs: string[] }[];
    contents: boolean;
    cover: boolean;
    copy: string;
    words: number;
    source: string;
    Opening: (props: { b: Shelved; r: Row; mode: string; jump: (page: number) => void }) => ReactNode;
};

type Shelved = {
    key: string;
    ink: string;
    tall: number;
    title: string;
    subtitle: string;
    blurb: string;
    rows: Row[];
};

const row = (c: $Chapter, i: number): Row => ({
    index: c.index,
    heading: c.title?.copy ?? (c instanceof $TableOfContents ? 'Table of Contents' : ''),
    subtitle: c.subtitle?.copy ?? '',
    tagline: c.tagline?.copy ?? '',
    summary: c.summary?.parts.slice(1).map(p => p.copy).join(' ') ?? '',
    body: c.parts.filter(s => !s.parenthetical).flatMap(s => s.parts.slice(1).map(p => p.copy)),
    sections: c.parts.filter(s => !s.parenthetical).map(s => {
        const full = text(s.title);
        const colon = full.indexOf(':');
        return {
            head: colon < 0 ? full : full.slice(0, colon).trim(),
            sub: colon < 0 ? '' : full.slice(colon + 1).trim(),
            paragraphs: s.parts.slice(1).map(p => p.copy),
        };
    }),
    contents: c instanceof $TableOfContents,
    cover: i === 0,
    copy: c.copy,
    words: c.words.length,
    source: '',
    Opening: openingFor(c),
});

const shelve = (key: string, ink: string, tall: number, b: $Book): Shelved => {
    const rows = b.chapters.map(row);
    const names = Object.keys(writingSources[key]);
    rows.forEach((r, i) => {
        r.source = r.contents ? 'TableOfContents.tsx' : i === 0 ? names[0] : names[i - 1];
    });
    return {
        key,
        ink,
        tall,
        title: b.title?.copy ?? '',
        subtitle: b.subtitle?.copy ?? '',
        blurb: b.synopsis?.tagline?.copy ?? '',
        rows,
    };
};

const shelf: Shelved[] = [
    shelve('algebra', '#5a2320', 540, algebra),
    shelve('manifold', '#274a3a', 450, manifold),
];

function rich(p: string): ReactNode {
    if (!p.includes('$')) return p;
    const bits = p.split(/\$([^$]+)\$/g);
    return bits.map((b, i) => (
        i % 2
            ? <span key={i} className="math" dangerouslySetInnerHTML={{ __html: katex.renderToString(b, { throwOnError: false }) }} />
            : b
    ));
}

// The generalization, proven: every kind of chapter maps to an opening — the
// bookmaker's word for what the reader meets when the book opens to it —
// declared once, dispatched on the class chain. A new kind of chapter is a new
// opening, never a new branch.
type OpeningProps = { b: Shelved; r: Row; mode: string; jump: (page: number) => void };

function ModelOpening({ r }: OpeningProps) {
    return (
        <div>
            <ChapterNumber>{r.index} · the model, unadorned · {r.sections.length || '0'} sections · {r.words} words</ChapterNumber>
            <div style={{ whiteSpace: 'pre-line', marginTop: 14, fontSize: 15 }}>{r.copy}</div>
        </div>
    );
}

function CoverOpening({ r }: OpeningProps) {
    return (
        <div style={{ textAlign: 'center', paddingTop: 70 }}>
            <ChapterTitle style={{ fontSize: 34 }}>{r.heading}</ChapterTitle>
            {r.subtitle && <ChapterSubtitle style={{ fontSize: 17, marginTop: 8 }}>{r.subtitle}</ChapterSubtitle>}
            <div style={{ width: 60, height: 1, background: '#b3a37f', margin: '30px auto' }} />
            {r.body.map((p, k) => <Prose key={k} style={{ fontStyle: 'italic', opacity: 0.78 }}>{p}</Prose>)}
        </div>
    );
}

function ContentsOpening({ b, r, jump }: OpeningProps) {
    return (
        <div className="table-of-contents">
            <ChapterNumber style={{ textAlign: 'center' }}>{r.index} · apparatus</ChapterNumber>
            <TocPage>
                <TocLine className="toc-self" onClick={() => jump(b.rows.indexOf(r))} style={{ fontSize: 21, fontWeight: 600, marginBottom: 18 }}>
                    <span className="toc-title">{r.heading}</span>
                    <span className="toc-leader" />
                    <span className="toc-folio">{r.index}</span>
                </TocLine>
                {b.rows.map((e, j) => (e.Opening !== ChapterOpening ? null : (
                    <div key={j} className="entry-summary">
                        <TocLine onClick={() => jump(j)}>
                            <span className="toc-title">{e.heading}</span>
                            <span className="toc-leader" />
                            <span className="toc-folio">{e.index}</span>
                        </TocLine>
                        {e.tagline && <TocTag>{rich(e.tagline)}</TocTag>}
                    </div>
                )))}
            </TocPage>
        </div>
    );
}

function ChapterOpening({ r, mode }: OpeningProps) {
    if (mode === 'skim') {
        return (
            <div>
                <ChapterNumber>chapter {r.index} · the skim</ChapterNumber>
                <ChapterTitle>{r.heading}</ChapterTitle>
                {r.subtitle && <ChapterSubtitle>{r.subtitle}</ChapterSubtitle>}
                {r.summary && <Prose style={{ marginTop: 16 }}>{rich(r.summary)}</Prose>}
            </div>
        );
    }
    return (
        <div>
            <ChapterNumber>chapter {r.index}</ChapterNumber>
            <ChapterTitle>{r.heading}</ChapterTitle>
            {r.subtitle && <ChapterSubtitle>{r.subtitle}</ChapterSubtitle>}
            {r.sections.map((sec, si) => (
                <div key={si}>
                    {si > 0 && <SectionHead>{sec.head}</SectionHead>}
                    {si > 0 && sec.sub && <SectionSub>{sec.sub}</SectionSub>}
                    {sec.paragraphs.map((p, k) => (
                        <Prose key={k} $drop={si === 0 && k === 0} style={{ marginTop: si === 0 && k === 0 ? 16 : undefined }}>{rich(p)}</Prose>
                    ))}
                </div>
            ))}
        </div>
    );
}

function openingFor(c: $Chapter) {
    return c instanceof $Cover ? CoverOpening :
        c instanceof $TableOfContents ? ContentsOpening :
        ChapterOpening;
}

function rightPage(b: Shelved, r: Row, mode: string, jump: (page: number) => void): ReactNode {
    const Kind = mode === 'model' ? ModelOpening : r.Opening;
    return <Kind b={b} r={r} mode={mode} jump={jump} />;
}

class $TheBooks extends $Chemical {
    opened = '';
    open = false;
    page = 0;
    mode = 'read';
    writing = false;
    tab = '';

    turn(p: number) {
        const held = shelf.find(b => b.key === this.opened);
        if (!held) return;
        this.page = Math.max(0, Math.min(held.rows.length - 1, p));
        this.tab = held.rows[this.page].source;
    }

    close() {
        this.writing = false;
        this.tab = '';
        setTimeout(() => {
            this.opened = '';
            this.open = false;
            this.page = 0;
            this.mode = 'read';
        }, 0);
    }

    view(): ReactNode {
        const held = shelf.find(b => b.key === this.opened);
        const current = held?.rows[this.page];
        return (
            <DayBackdrop>
                <DayBar>
                    <DayChip as="a" href="/page">← the page</DayChip>
                    <DayRule />
                    {!held && <span style={{ opacity: 0.55, fontSize: 13, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>the shelf — pull a book</span>}
                    {held && !this.open && (
                        <DayChip onClick={() => this.close()}>← the shelf</DayChip>
                    )}
                    {held && this.open && (
                        <>
                            <DayChip onClick={() => this.close()}>← the shelf</DayChip>
                            <DayRule />
                            <DayChip $active={this.mode === 'read'} onClick={() => { this.mode = 'read'; this.turn(this.page); }}>read</DayChip>
                            <DayChip $active={this.mode === 'skim'} onClick={() => { this.mode = 'skim'; this.tab = 'Chapter.tsx'; }}>skim</DayChip>
                            <DayChip $active={this.mode === 'model'} onClick={() => { this.mode = 'model'; this.tab = 'Book.tsx'; }}>the model</DayChip>
                            <DayRule />
                            <DayChip $active={this.writing} onClick={() => { this.writing = !this.writing; }}>the writing</DayChip>
                        </>
                    )}
                </DayBar>
                {!held && (
                    <ShelfBoard className="shelf">
                        {shelf.map(b => (
                            <Spine key={b.key} className="shelf-card" data-book={b.key} $ink={b.ink} $tall={b.tall} onClick={() => { this.opened = b.key; }}>
                                {b.title}
                            </Spine>
                        ))}
                    </ShelfBoard>
                )}
                {held && !this.open && (
                    <CoverFace $ink={held.ink} data-cover onClick={() => { this.open = true; this.turn(0); }}>
                        <CoverTitle>{held.title}</CoverTitle>
                        {held.subtitle && <CoverSubtitle>{held.subtitle}</CoverSubtitle>}
                        <CoverRule />
                        <CoverBlurb>{held.blurb}</CoverBlurb>
                        <CoverInvitation>open the book →</CoverInvitation>
                    </CoverFace>
                )}
                {held && this.open && current && (
                    <Page className="book-page">
                        <RunningHead
                            style={{ cursor: 'pointer' }}
                            title={current.contents ? 'to the cover' : 'to the contents'}
                            onClick={() => this.turn(current.contents ? 0 : held.rows.findIndex(r => r.contents))}
                        >
                            {held.title}
                        </RunningHead>
                        <PageBody className="page-body">{rightPage(held, current, this.mode, (p) => this.turn(p))}</PageBody>
                        <PageTurns>
                            <PageTurn disabled={this.page === 0} onClick={() => { this.page = Math.max(0, this.page - 1); }}>
                                ← previous
                            </PageTurn>
                            <Folio>{current.index}</Folio>
                            <PageTurn disabled={this.page === held.rows.length - 1} onClick={() => { this.page = Math.min(held.rows.length - 1, this.page + 1); }}>
                                next →
                            </PageTurn>
                        </PageTurns>
                    </Page>
                )}
                {held && this.open && this.writing && (() => {
                    const sources = { ...modelSources, ...writingSources[held.key] };
                    const names = Object.keys(sources);
                    const writingNames = Object.keys(writingSources[held.key]);
                    const tab = names.includes(this.tab) ? this.tab : writingNames[Math.min(this.page, writingNames.length - 1)] ?? names[0];
                    return (
                        <CodeDrawer className="writing-drawer">
                            <CodeTabs>
                                {names.map(name => (
                                    <CodeTab key={name} $active={tab === name} onClick={() => { this.tab = name; }}>
                                        {name}
                                    </CodeTab>
                                ))}
                            </CodeTabs>
                            <CodeBlock>
                                <Highlight code={sources[tab].trim()} language="tsx" theme={themes.github}>
                                    {({ tokens, getLineProps, getTokenProps }) => (
                                        <pre>
                                            {tokens.map((line, i) => (
                                                <div key={i} {...getLineProps({ line })}>
                                                    <span className="line-number">{i + 1}</span>
                                                    {line.map((token, j) => (
                                                        <span key={j} {...getTokenProps({ token })} />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            </CodeBlock>
                        </CodeDrawer>
                    );
                })()}
            </DayBackdrop>
        );
    }
}

const TheBooks = $($TheBooks);

export function TheBooksDemo() {
    return <TheBooks />;
}

export const sectionData = {
    id: 'books',
    cases: 1,
    Component: TheBooksDemo,
    fullPage: true,
};
