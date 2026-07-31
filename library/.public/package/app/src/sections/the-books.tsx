import React, { type ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Highlight, themes } from 'prism-react-renderer';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Book } from '@/book/Book';
import { $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $TableOfContents } from '@/book/TableOfContents';
import { $Bookmark, Bookmark } from '@/book/Bookmark';
import { text } from '@/tools/html';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import algebraCoverSource from './book/library/algebra/01-the-cover.tsx?raw';
import algebraSynopsisSource from './book/library/algebra/02-the-synopsis.tsx?raw';
import coordinatesSource from './book/library/algebra/03-coordinates.tsx?raw';
import indexLawSource from './book/library/algebra/04-the-index-law.tsx?raw';
import summaryLawSource from './book/library/algebra/05-the-summary-law.tsx?raw';
import measureSource from './book/library/algebra/06-the-measure.tsx?raw';
import referenceChapterSource from './book/library/algebra/07-the-reference.tsx?raw';
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
import referenceSource from '@/ref/Reference.tsx?raw';
import bookmarkSource from '@/book/Bookmark.tsx?raw';
import {
    DayBackdrop, DayBar, DayChip, DayRule,
    ShelfBoard, Spine, CoverFace, CoverTitle, CoverSubtitle, CoverRule, CoverBlurb, CoverInvitation,
    Page, RunningHead, PageBody, PageTurns, PageTurn, Folio,
    ChapterNumber, ChapterTitle, ChapterSubtitle, Prose,
    SectionHead, SectionSub, TocPage, TocLine, TocTag,
    CodeTabs, CodeTab, CodeBlock, Ribbon, DogEar,
    Quote, FootNotes, ModelMeta, ModelSection, ModelAddress, ModelHead, ModelPara,
} from './book/books.styled';

const modelSources: Record<string, string> = {
    'Book.tsx': bookSource,
    'Chapter.tsx': chapterSource,
    'Cover.tsx': coverSource,
    'Synopsis.tsx': synopsisSource,
    'TableOfContents.tsx': tableOfContentsSource,
    'Section.tsx': sectionSource,
    'Title.tsx': titleSource,
    'Reference.tsx': referenceSource,
    'Bookmark.tsx': bookmarkSource,
};

const manuscripts: Record<string, Record<string, string>> = {
    algebra: {
        '01-the-cover.tsx': algebraCoverSource,
        '02-the-synopsis.tsx': algebraSynopsisSource,
        '03-coordinates.tsx': coordinatesSource,
        '04-the-index-law.tsx': indexLawSource,
        '05-the-summary-law.tsx': summaryLawSource,
        '06-the-measure.tsx': measureSource,
        '07-the-reference.tsx': referenceChapterSource,
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
    Opening: (props: OpeningProps) => ReactNode;
};

type Held = {
    key: string;
    ink: string;
    tall: number;
    title: string;
    subtitle: string;
    blurb: string;
    book: $Book;
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

const hold = (key: string, ink: string, tall: number, b: $Book): Held => {
    const rows = b.chapters.map(row);
    const names = Object.keys(manuscripts[key]);
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
        book: b,
        rows,
    };
};

const shelf: Held[] = [
    hold('algebra', '#5a2320', 540, algebra),
    hold('manifold', '#274a3a', 450, manifold),
];

// The typesetting of prose: inline mathematics ($..$), references that travel
// ([text](#index-path)), emphasis (**..**, *..*), and footnotes (^[..]) collected
// to the page foot — markdown's own forms, honored by the page.
function spans(s: string, go: (anchor: string) => void, notes?: string[]): ReactNode[] {
    const out: ReactNode[] = [];
    const re = /\^\[([^\]]+)\]|\[([^\]]+)\]\(#([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let last = 0;
    let m;
    let k = 0;
    while ((m = re.exec(s))) {
        if (m.index > last) out.push(s.slice(last, m.index));
        if (m[1] !== undefined) {
            if (notes) {
                notes.push(m[1]);
                out.push(<sup key={`n${k++}`} className="note-mark">{notes.length}</sup>);
            }
        } else if (m[2] !== undefined) {
            const anchor = m[3];
            out.push(
                <a key={`a${k++}`} className="book-link" href={`#${anchor}`} onClick={(e) => { e.preventDefault(); go(anchor); }}>
                    {m[2]}
                </a>
            );
        } else if (m[4] !== undefined) {
            out.push(<strong key={`b${k++}`}>{m[4]}</strong>);
        } else {
            out.push(<em key={`i${k++}`}>{m[5]}</em>);
        }
        last = re.lastIndex;
    }
    if (last < s.length) out.push(s.slice(last));
    return out;
}

function rich(p: string, go: (anchor: string) => void = () => {}, notes?: string[]): ReactNode {
    const bits = p.split(/\$([^$]+)\$/g);
    return bits.map((b, i) => (
        i % 2
            ? <span key={i} className="math" dangerouslySetInnerHTML={{ __html: katex.renderToString(b, { throwOnError: false }) }} />
            : <React.Fragment key={i}>{spans(b, go, notes)}</React.Fragment>
    ));
}

function inked(source: string): ReactNode {
    return (
        <CodeBlock>
            <Highlight code={source.trim()} language="tsx" theme={themes.github}>
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
    );
}

// The generalization, proven: every kind of chapter maps to an opening — the
// bookmaker's word for what the reader meets when the book opens to it —
// declared once, dispatched on the class chain. A new kind of chapter is a new
// opening, never a new branch.
type OpeningProps = { b: Held; r: Row; mode: string; jump: (page: number) => void; go: (anchor: string) => void };

function ModelOpening({ r }: OpeningProps) {
    return (
        <div>
            <ChapterNumber>{r.index} · the model, unadorned</ChapterNumber>
            <ChapterTitle style={{ fontSize: 20 }}>{r.heading || 'apparatus'}</ChapterTitle>
            <ModelMeta>{r.sections.length} sections · {r.words} words</ModelMeta>
            {r.sections.map((sec, si) => (
                <ModelSection key={si}>
                    <ModelAddress>#{r.index}.{si + 1}</ModelAddress>
                    <ModelHead>{sec.head}{sec.sub ? ` — ${sec.sub}` : ''}</ModelHead>
                    {sec.paragraphs.map((p, k) => (
                        <ModelPara key={k}>
                            <ModelAddress className="dim">¶ {si + 1}.{k + 1}</ModelAddress>
                            <span>{p}</span>
                        </ModelPara>
                    ))}
                </ModelSection>
            ))}
            {r.summary && (
                <ModelSection>
                    <ModelAddress>( parenthetical )</ModelAddress>
                    <ModelHead>Summary</ModelHead>
                    <ModelPara><span>{r.summary}</span></ModelPara>
                </ModelSection>
            )}
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

function ContentsOpening({ b, r, jump, go }: OpeningProps) {
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
                        {e.tagline && <TocTag>{rich(e.tagline, go)}</TocTag>}
                    </div>
                )))}
            </TocPage>
        </div>
    );
}

function ChapterOpening({ r, mode, go }: OpeningProps) {
    if (mode === 'skim') {
        return (
            <div>
                <ChapterNumber>chapter {r.index} · the skim</ChapterNumber>
                <ChapterTitle>{r.heading}</ChapterTitle>
                {r.subtitle && <ChapterSubtitle>{r.subtitle}</ChapterSubtitle>}
                {r.summary && <Prose style={{ marginTop: 16 }}>{rich(r.summary, go)}</Prose>}
            </div>
        );
    }
    const notes: string[] = [];
    return (
        <div id={`${r.index}`}>
            <ChapterNumber>chapter {r.index}</ChapterNumber>
            <ChapterTitle>{r.heading}</ChapterTitle>
            {r.subtitle && <ChapterSubtitle>{r.subtitle}</ChapterSubtitle>}
            {r.sections.map((sec, si) => {
                const firstProse = sec.paragraphs.findIndex(q => !q.startsWith('> '));
                return (
                    <div key={si} id={`${r.index}.${si + 1}`}>
                        {si > 0 && <SectionHead>{sec.head}</SectionHead>}
                        {si > 0 && sec.sub && <SectionSub>{sec.sub}</SectionSub>}
                        {sec.paragraphs.map((p, k) => (
                            p.startsWith('> ')
                                ? <Quote key={k}>{rich(p.slice(2), go, notes)}</Quote>
                                : (
                                    <Prose key={k} $drop={si === 0 && k === firstProse} style={{ marginTop: si === 0 && k === firstProse ? 16 : undefined }}>
                                        {rich(p, go, notes)}
                                    </Prose>
                                )
                        ))}
                    </div>
                );
            })}
            {notes.length > 0 && (
                <FootNotes>
                    {notes.map((n, i) => (
                        <div key={i} className="foot-note"><span className="note-index">{i + 1}</span>{rich(n, go)}</div>
                    ))}
                </FootNotes>
            )}
        </div>
    );
}

function openingFor(c: $Chapter) {
    return c instanceof $Cover ? CoverOpening :
        c instanceof $TableOfContents ? ContentsOpening :
        ChapterOpening;
}

function rightPage(b: Held, r: Row, mode: string, jump: (page: number) => void, go: (anchor: string) => void): ReactNode {
    const Kind = mode === 'model' ? ModelOpening : r.Opening;
    return <Kind b={b} r={r} mode={mode} jump={jump} go={go} />;
}

class $TheBooks extends $Chemical {
    opened = '';
    open = false;
    page = 1;
    mode = 'read';
    over = false;
    tab = '';
    marked = '';
    ribbon = '';

    turn(p: number) {
        const held = shelf.find(b => b.key === this.opened);
        if (!held) return;
        this.over = false;
        this.page = Math.max(1, Math.min(held.rows.length - 1, p));
        this.tab = held.rows[this.page].source;
    }

    go(anchor: string) {
        const held = shelf.find(b => b.key === this.opened);
        if (!held) return;
        const chapter = Number(anchor.split('.')[0]);
        const p = held.rows.findIndex(r => r.index === chapter);
        if (p < 0) return;
        this.mode = 'read';
        this.turn(p);
        setTimeout(() => { document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
    }

    leave(r: Row) {
        this.marked = `#${r.index}`;
        this.ribbon = r.heading;
    }

    follow() {
        const held = shelf.find(b => b.key === this.opened);
        if (!held || !this.marked) return;
        const bookmark: $Bookmark = $(<Bookmark for={this.marked}>{this.ribbon || 'the ribbon'}</Bookmark>, held.book);
        const part = bookmark.lookup();
        if (!(part instanceof $Chapter)) return;
        this.mode = 'read';
        this.turn(held.rows.findIndex(r => r.index === part.index));
    }

    close() {
        this.over = false;
        this.tab = '';
        this.marked = '';
        this.ribbon = '';
        setTimeout(() => {
            this.opened = '';
            this.open = false;
            this.page = 1;
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
                            <DayChip $active={this.mode === 'skim'} onClick={() => { this.mode = 'skim'; }}>skim</DayChip>
                            <DayChip $active={this.mode === 'model'} onClick={() => { this.mode = 'model'; }}>the model</DayChip>
                            <DayChip $active={this.mode === 'manuscript'} onClick={() => { this.mode = 'manuscript'; this.tab = ''; }}>the manuscript</DayChip>
                            {current && current.Opening === ChapterOpening && this.mode !== 'manuscript' && (
                                <>
                                    <DayRule />
                                    <DayChip
                                        data-leave
                                        $active={this.marked === `#${current.index}`}
                                        onClick={() => this.leave(current)}
                                    >
                                        {this.marked === `#${current.index}` ? 'the ribbon lies here' : 'leave the ribbon'}
                                    </DayChip>
                                </>
                            )}
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
                    <CoverFace $ink={held.ink} data-cover onClick={() => { this.open = true; this.turn(1); }}>
                        <CoverTitle>{held.title}</CoverTitle>
                        {held.subtitle && <CoverSubtitle>{held.subtitle}</CoverSubtitle>}
                        <CoverRule />
                        <CoverBlurb>{held.blurb}</CoverBlurb>
                        <CoverInvitation>open the book →</CoverInvitation>
                    </CoverFace>
                )}
                {held && this.open && current && this.mode === 'manuscript' && (() => {
                    const files = [...Object.keys(manuscripts[held.key]), ...Object.keys(modelSources)];
                    const at = files.indexOf(this.tab);
                    return (
                        <Page className="book-page manuscript-book" style={{ background: '#fbf5e6' }}>
                            {this.marked && (
                                <Ribbon data-ribbon $ink={held.ink} title={`the bookmark — ${this.ribbon}`} onClick={() => this.follow()} />
                            )}
                            <RunningHead
                                style={{ cursor: 'pointer' }}
                                title={at < 0 ? 'to the reading' : 'to the manuscript contents'}
                                onClick={() => { if (at < 0) { this.mode = 'read'; this.turn(this.page); } else this.tab = ''; }}
                            >
                                {at < 0 ? `${held.title} — the manuscript` : files[at]}
                            </RunningHead>
                            {at < 0 && (
                                <PageBody className="page-body">
                                    <ChapterNumber style={{ textAlign: 'center' }}>the book of code</ChapterNumber>
                                    <TocPage>
                                        {files.map((f, j) => (
                                            <TocLine key={f} onClick={() => { this.tab = f; }}>
                                                <span className="toc-title">{f}</span>
                                                <span className="toc-leader" />
                                                <span className="toc-folio">{j + 1}</span>
                                            </TocLine>
                                        ))}
                                    </TocPage>
                                </PageBody>
                            )}
                            {at >= 0 && (
                                <PageBody className="page-body manuscript">
                                    {inked(manuscripts[held.key][files[at]] ?? modelSources[files[at]])}
                                </PageBody>
                            )}
                            <PageTurns>
                                <PageTurn disabled={at < 0} onClick={() => { if (at <= 0) this.tab = ''; else this.tab = files[at - 1]; }}>
                                    ← previous
                                </PageTurn>
                                <Folio>{at < 0 ? '·' : at + 1}</Folio>
                                <PageTurn disabled={at >= files.length - 1} onClick={() => { this.tab = at < 0 ? files[0] : files[at + 1]; }}>
                                    next →
                                </PageTurn>
                            </PageTurns>
                            <DogEar data-dogear title="turn back to the reading" onClick={() => { this.mode = 'read'; this.turn(this.page); }} />
                        </Page>
                    );
                })()}
                {held && this.open && current && this.mode !== 'manuscript' && (() => {
                    const sources = { ...modelSources, ...manuscripts[held.key] };
                    const names = [current.source, ...Object.keys(modelSources).filter(n => n !== current.source)];
                    const leaf = names.includes(this.tab) ? this.tab : current.source;
                    return (
                        <Page className={this.over ? 'book-page verso' : 'book-page'} style={this.over ? { background: '#fbf5e6' } : undefined}>
                            {this.marked && (
                                <Ribbon
                                    data-ribbon
                                    $ink={held.ink}
                                    title={`the bookmark — ${this.ribbon}`}
                                    onClick={() => this.follow()}
                                />
                            )}
                            <RunningHead
                                style={{ cursor: 'pointer' }}
                                title={this.over ? 'turn back to the page' : current.contents ? 'to the cover' : 'to the contents'}
                                onClick={() => {
                                    if (this.over) this.over = false;
                                    else if (current.contents) this.open = false;
                                    else this.turn(held.rows.findIndex(r => r.contents));
                                }}
                            >
                                {this.over ? `${leaf} — the manuscript` : held.title}
                            </RunningHead>
                            {!this.over && <PageBody className="page-body">{rightPage(held, current, this.mode, (p) => this.turn(p), (a) => this.go(a))}</PageBody>}
                            {this.over && (
                                <PageBody className="page-body manuscript">
                                    <CodeTabs>
                                        {names.map(name => (
                                            <CodeTab key={name} $active={leaf === name} onClick={() => { this.tab = name; }}>
                                                {name}
                                            </CodeTab>
                                        ))}
                                    </CodeTabs>
                                    {inked(sources[leaf])}
                                </PageBody>
                            )}
                            <PageTurns>
                                <PageTurn onClick={() => { if (this.page <= 1) this.open = false; else this.turn(this.page - 1); }}>
                                    {this.page <= 1 ? '← the cover' : '← previous'}
                                </PageTurn>
                                <Folio>{current.index}</Folio>
                                <PageTurn disabled={this.page === held.rows.length - 1} onClick={() => this.turn(this.page + 1)}>
                                    next →
                                </PageTurn>
                            </PageTurns>
                            <DogEar
                                data-dogear
                                title={this.over ? 'turn back to the page' : 'turn the page over — the manuscript'}
                                onClick={() => { if (this.over) { this.over = false; } else { this.over = true; this.tab = current.source; } }}
                            />
                        </Page>
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
