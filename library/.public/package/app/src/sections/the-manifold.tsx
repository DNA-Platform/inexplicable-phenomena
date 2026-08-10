import React, { type ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Highlight, themes } from 'prism-react-renderer';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Book } from '@/book/Book';
import { $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $TableOfContents } from '@/book/TableOfContents';
import { type $Reference$ } from '@/reference/Reference';
import { $Footer } from '@/document/Footer';
import { text } from '@/utilities/html';
import { manifold } from './book/library/the-manifold/book';
import { $RibbonMark, RibbonMark, $Return, Return } from './book/library/the-manifold/marks';
import manifoldCoverSource from './book/library/the-manifold/01-the-cover.tsx?raw';
import manifoldSynopsisSource from './book/library/the-manifold/02-the-synopsis.tsx?raw';
import foldSource from './book/library/the-manifold/03-the-fold.tsx?raw';
import chartSource from './book/library/the-manifold/04-the-chart.tsx?raw';
import curvatureSource from './book/library/the-manifold/05-curvature.tsx?raw';
import geodesicSource from './book/library/the-manifold/06-the-geodesic.tsx?raw';
import manifoldReferenceSource from './book/library/the-manifold/07-the-reference.tsx?raw';
import theAtlasSource from './book/library/the-manifold/08-the-atlas.tsx?raw';
import marksSource from './book/library/the-manifold/marks.tsx?raw';
import bookSource from '@/book/Book.tsx?raw';
import chapterSource from '@/book/Chapter.tsx?raw';
import coverSource from '@/book/Cover.tsx?raw';
import synopsisSource from '@/book/Synopsis.tsx?raw';
import tableOfContentsSource from '@/book/TableOfContents.tsx?raw';
import rowSource from '@/book/Row.tsx?raw';
import sectionSource from '@/writing/Section.tsx?raw';
import titleSource from '@/writing/Title.tsx?raw';
import referenceSource from '@/reference/Reference.tsx?raw';
import referentSource from '@/reference/Referent.tsx?raw';
import catalogueSource from '@/reference/Catalogue.tsx?raw';
import locationSource from '@/reference/Location.tsx?raw';
import pathSource from '@/reference/Path.tsx?raw';
import linkSource from '@/reference/Link.tsx?raw';
import bookmarkSource from '@/book/Bookmark.tsx?raw';
import documentSource from '@/document/Document.tsx?raw';
import footerSource from '@/document/Footer.tsx?raw';
import footnoteSource from '@/document/Footnote.tsx?raw';
import denoteSource from '@/document/Denote.tsx?raw';
import bibliographySource from '@/document/Bibliography.tsx?raw';
import citationSource from '@/document/Citation.tsx?raw';
import citeSource from '@/document/Cite.tsx?raw';
import legendSource from '@/document/Legend.tsx?raw';
import keySource from '@/document/Key.tsx?raw';
import {
    DayBackdrop, DayBar, DayChip, DayRule,
    ShelfBoard, Spine, CoverFace, CoverTitle, CoverSubtitle, CoverRule, CoverBlurb, CoverInvitation, CoverImprint,
    Page, RunningHead, PageBody, PageTurns, PageTurn, Folio,
    ChapterNumber, ChapterTitle, ChapterSubtitle, Prose,
    SectionHead, SectionSub, TocPage, TocLine, TocTag,
    CodeTabs, CodeTab, CodeBlock, DogEar,
    Quote, FootNotes, ModelMeta, ModelSection, ModelAddress, ModelHead, ModelPara,
} from './book/manifold.styled';

const modelSources: Record<string, string> = {
    'Book.tsx': bookSource,
    'Chapter.tsx': chapterSource,
    'Cover.tsx': coverSource,
    'Synopsis.tsx': synopsisSource,
    'TableOfContents.tsx': tableOfContentsSource,
    'Row.tsx': rowSource,
    'Document.tsx': documentSource,
    'Footer.tsx': footerSource,
    'Footnote.tsx': footnoteSource,
    'Denote.tsx': denoteSource,
    'Bibliography.tsx': bibliographySource,
    'Citation.tsx': citationSource,
    'Cite.tsx': citeSource,
    'Legend.tsx': legendSource,
    'Key.tsx': keySource,
    'Section.tsx': sectionSource,
    'Title.tsx': titleSource,
    'Reference.tsx': referenceSource,
    'Referent.tsx': referentSource,
    'Catalogue.tsx': catalogueSource,
    'Location.tsx': locationSource,
    'Path.tsx': pathSource,
    'Bookmark.tsx': bookmarkSource,
    'Link.tsx': linkSource,
};

const manuscripts: Record<string, Record<string, string>> = {
    manifold: {
        '01-the-cover.tsx': manifoldCoverSource,
        '02-the-synopsis.tsx': manifoldSynopsisSource,
        '03-the-fold.tsx': foldSource,
        '04-the-chart.tsx': chartSource,
        '05-curvature.tsx': curvatureSource,
        '06-the-geodesic.tsx': geodesicSource,
        '07-the-reference.tsx': manifoldReferenceSource,
        '08-the-atlas.tsx': theAtlasSource,
        'marks.tsx': marksSource,
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
    notes: { key: string; note: string; number: number }[];
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

const row = (c: $Chapter, i: number): Row => {
    const footer = c.footer;
    const prose = c.parts().filter(s => !s.parenthetical && !(s instanceof $Footer));
    return {
        index: c.index,
        heading: c.title?.copy ?? (c instanceof $TableOfContents ? 'Table of Contents' : ''),
        subtitle: c.subtitle?.copy ?? '',
        tagline: c.tagline?.copy ?? '',
        summary: c.summary?.parts().slice(1).map(p => p.copy).join(' ') ?? '',
        body: prose.flatMap(s => s.parts().slice(1).map(p => p.copy)),
        sections: prose.map(s => {
            const full = text(s.title);
            const colon = full.indexOf(':');
            return {
                head: colon < 0 ? full : full.slice(0, colon).trim(),
                sub: colon < 0 ? '' : full.slice(colon + 1).trim(),
                paragraphs: s.parts().slice(1).map(p => p.copy),
            };
        }),
        notes: footer
            ? footer.footnotes.map(e => ({ key: e.$for, note: e.copy, number: e.number })).sort((a, b) => a.number - b.number)
            : [],
        contents: c instanceof $TableOfContents,
        cover: i === 0,
        copy: c.copy,
        words: c.words.length,
        source: '',
        Opening: openingFor(c),
    };
};

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

const held: Held = hold('manifold', '#274a3a', 560, manifold);

function light(id: string, block: ScrollLogicalPosition = 'center') {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block });
    el.classList.add('lit');
    setTimeout(() => el.classList.remove('lit'), 2400);
}

function spans(s: string, follow: (address: string) => void, notes?: { key: string; note: string; number: number }[]): ReactNode[] {
    const out: ReactNode[] = [];
    const re = /\^\[([^\]]+)\]|\[([^\]]+)\]\(#([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let last = 0;
    let m;
    let k = 0;
    while ((m = re.exec(s))) {
        if (m.index > last) out.push(s.slice(last, m.index));
        if (m[1] !== undefined) {
            const filed = notes?.find(n => n.key === m![1]);
            if (filed) {
                out.push(
                    <sup key={`n${k++}`} id={`mark-${filed.key}`} className="note-mark" onClick={() => light(`note-${filed.key}`)}>
                        {filed.number}
                    </sup>
                );
            }
        } else if (m[2] !== undefined) {
            const anchor = m[3];
            out.push(
                <a key={`a${k++}`} className="book-link" href={`#${anchor}`} onClick={(e) => { e.preventDefault(); follow(anchor); }}>
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

function rich(p: string, follow: (address: string) => void = () => {}, notes?: { key: string; note: string; number: number }[]): ReactNode {
    const bits = p.split(/\$([^$]+)\$/g);
    return bits.map((b, i) => (
        i % 2
            ? <span key={i} className="math" dangerouslySetInnerHTML={{ __html: katex.renderToString(b, { throwOnError: false }) }} />
            : <React.Fragment key={i}>{spans(b, follow, notes)}</React.Fragment>
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

type OpeningProps = { b: Held; r: Row; mode: string; jump: (page: number) => void; follow: (address: string) => void; press: (address: string, label: string) => void };

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
            {r.notes.length > 0 && (
                <ModelSection>
                    <ModelAddress>( footer )</ModelAddress>
                    <ModelHead>Notes</ModelHead>
                    {r.notes.map(n => (
                        <ModelPara key={n.key}>
                            <ModelAddress className="dim">{n.number} · {n.key}</ModelAddress>
                            <span>{n.note}</span>
                        </ModelPara>
                    ))}
                </ModelSection>
            )}
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

function ContentsOpening({ b, r, jump, follow }: OpeningProps) {
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
                        {e.tagline && <TocTag>{rich(e.tagline, follow)}</TocTag>}
                    </div>
                )))}
            </TocPage>
        </div>
    );
}

function ChapterOpening({ r, mode, follow, press }: OpeningProps) {
    if (mode === 'skim') {
        return (
            <div>
                <ChapterNumber>chapter {r.index} · the skim</ChapterNumber>
                <ChapterTitle>{r.heading}</ChapterTitle>
                {r.subtitle && <ChapterSubtitle>{r.subtitle}</ChapterSubtitle>}
                {r.summary && <Prose style={{ marginTop: 16 }}>{rich(r.summary, follow)}</Prose>}
            </div>
        );
    }
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
                                ? (
                                    <Quote key={k} id={`${r.index}.${si + 1}.${k + 1}`} onDoubleClick={() => press(`${r.index}.${si + 1}.${k + 1}`, `${r.heading} · ¶ ${si + 1}.${k + 1}`)}>
                                        {rich(p.slice(2), follow, r.notes)}
                                    </Quote>
                                )
                                : (
                                    <Prose key={k} id={`${r.index}.${si + 1}.${k + 1}`} $drop={si === 0 && k === firstProse} style={{ marginTop: si === 0 && k === firstProse ? 16 : undefined }} onDoubleClick={() => press(`${r.index}.${si + 1}.${k + 1}`, `${r.heading} · ¶ ${si + 1}.${k + 1}`)}>
                                        {rich(p, follow, r.notes)}
                                    </Prose>
                                )
                        ))}
                    </div>
                );
            })}
            {r.notes.length > 0 && (
                <FootNotes>
                    {r.notes.map(n => (
                        <div key={n.key} id={`note-${n.key}`} className="foot-note">
                            <span className="note-index" onClick={() => light(`mark-${n.key}`)}>{n.number}</span>
                            {rich(n.note, follow)}
                        </div>
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

function rightPage(b: Held, r: Row, mode: string, jump: (page: number) => void, follow: (address: string) => void, press: (address: string, label: string) => void): ReactNode {
    const Kind = mode === 'model' ? ModelOpening : r.Opening;
    return <Kind b={b} r={r} mode={mode} jump={jump} follow={follow} press={press} />;
}

class $TheManifold extends $Chemical {
    open = false;
    page = 1;
    mode = 'read';
    $shelf?: () => void = undefined;
    over = false;
    tab = '';
    ribbons: $RibbonMark[] = [];
    trail: $Return | null = null;

    turn(p: number) {
        this.over = false;
        this.page = Math.max(1, Math.min(held.rows.length - 1, p));
        this.tab = held.rows[this.page].source;
        this.head();
    }

    head() {
        setTimeout(() => document.querySelector('.page-body')?.scrollTo({ top: 0 }), 0);
    }

    leave(r: Row) {
        this.press(`${r.index}`, r.heading);
    }

    press(spot: string, label: string) {
        const kept = this.ribbons.filter(m => m.$spot !== spot);
        if (kept.length < this.ribbons.length) {
            kept.forEach((m, i) => { m.index = i; });
            this.ribbons = kept;
            return;
        }
        const mark: $RibbonMark = $(<RibbonMark spot={spot}>{label}</RibbonMark>);
        mark.index = this.ribbons.length;
        this.ribbons = [...this.ribbons, mark];
    }

    reference(spot: string): $Reference$<any> | undefined {
        const keys = spot.split('.').filter(Boolean).map(Number);
        if (!keys.length) return undefined;
        let built: $Reference$<any> = held.book.at(keys[0]);
        for (const key of keys.slice(1)) {
            const mid = built.valid() ? built.read() as { at?: (index: number) => $Reference$<any> } : undefined;
            if (!mid?.at) return undefined;
            built = built.then(mid.at(key));
        }
        return built;
    }

    follow(spot: string) {
        const path = spot.replace(/^#/, '');
        const reference = this.reference(path);
        if (!reference || !reference.valid()) return;
        const p = held.rows.findIndex(r => r.index === Number(path.split('.')[0]));
        if (p < 0) return;
        const standing = held.rows[this.page];
        if (this.open && standing && p !== this.page) {
            this.trail = $(<Return spot={`${standing.index}`}>{standing.heading || `folio ${standing.index}`}</Return>);
        }
        this.mode = 'read';
        this.turn(p);
        setTimeout(() => {
            const target = document.getElementById(path) ? path : path.split('.').slice(0, 3).join('.');
            light(target, 'start');
        }, 80);
    }

    slide(e: React.UIEvent<HTMLDivElement>) {
        const body = e.currentTarget as HTMLDivElement & { slideTimer?: number };
        body.classList.add('sliding');
        clearTimeout(body.slideTimer);
        body.slideTimer = window.setTimeout(() => body.classList.remove('sliding'), 900);
    }

    marks(): ReactNode {
        const back = this.trail;
        return (
            <>
                {this.ribbons.map(m => {
                    const M = $(m) as any;
                    return <span key={m.$spot} onClick={() => this.follow(m.$spot)}><M /></span>;
                })}
                {back && (() => {
                    const R = $(back) as any;
                    return <span onClick={() => this.follow(back.$spot)}><R /></span>;
                })()}
            </>
        );
    }

    view(): ReactNode {
        const current = held.rows[this.page];
        return (
            <DayBackdrop>
                <DayBar>
                    <DayChip as="a" href="/page">← the page</DayChip>
                    <DayRule />
                    {!this.open && (
                        <DayChip as="a" href="/books" data-subject onClick={() => { manifold.subject?.read(); }}>← {manifold.subject?.card?.title ?? 'the shelf'}</DayChip>
                    )}
                    {this.open && (
                        <>
                            <DayChip as="a" href="/books" data-subject onClick={() => { manifold.subject?.read(); }}>← {manifold.subject?.card?.title ?? 'the shelf'}</DayChip>
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
                                        $active={this.ribbons.some(m => m.$spot === `${current.index}`)}
                                        onClick={() => this.leave(current)}
                                    >
                                        {this.ribbons.some(m => m.$spot === `${current.index}`) ? 'the ribbon lies here' : 'leave the ribbon'}
                                    </DayChip>
                                </>
                            )}
                        </>
                    )}
                </DayBar>
                {!this.open && (
                    <CoverFace $ink={held.ink} data-cover onClick={() => { this.open = true; this.turn(1); }}>
                        <CoverTitle>{held.title}</CoverTitle>
                        {held.subtitle && <CoverSubtitle>{held.subtitle}</CoverSubtitle>}
                        <CoverRule />
                        <CoverBlurb>{held.blurb}</CoverBlurb>
                        <CoverInvitation>read the book →</CoverInvitation>
                        <CoverImprint data-subject onClick={(e) => { e.stopPropagation(); manifold.subject?.read(); this.$shelf?.(); }}>
                            {`← ${manifold.subject?.card?.title ?? 'the shelf'}`}
                        </CoverImprint>
                    </CoverFace>
                )}
                {this.open && current && this.mode === 'manuscript' && (() => {
                    const files = [...Object.keys(manuscripts[held.key]), ...Object.keys(modelSources)];
                    const at = files.indexOf(this.tab);
                    return (
                        <Page className="book-page manuscript-book" style={{ background: '#eef3ea' }}>
                            {this.marks()}
                            <RunningHead
                                style={{ cursor: 'pointer' }}
                                title={at < 0 ? 'to the reading' : 'to the manuscript contents'}
                                onClick={() => { if (at < 0) { this.mode = 'read'; this.turn(this.page); } else this.tab = ''; }}
                            >
                                {at < 0 ? `${held.title} — the manuscript` : files[at]}
                            </RunningHead>
                            {at < 0 && (
                                <PageBody className="page-body" onScroll={(e) => this.slide(e)}>
                                    <ChapterNumber style={{ textAlign: 'center' }}>the book of code</ChapterNumber>
                                    <TocPage>
                                        {files.map((f, j) => (
                                            <TocLine key={f} onClick={() => { this.tab = f; this.head(); }}>
                                                <span className="toc-title">{f}</span>
                                                <span className="toc-leader" />
                                                <span className="toc-folio">{j + 1}</span>
                                            </TocLine>
                                        ))}
                                    </TocPage>
                                </PageBody>
                            )}
                            {at >= 0 && (
                                <PageBody className="page-body manuscript" onScroll={(e) => this.slide(e)}>
                                    {inked(manuscripts[held.key][files[at]] ?? modelSources[files[at]])}
                                </PageBody>
                            )}
                            <PageTurns>
                                <PageTurn disabled={at < 0} onClick={() => { if (at <= 0) this.tab = ''; else this.tab = files[at - 1]; this.head(); }}>
                                    ← previous
                                </PageTurn>
                                <Folio>{at < 0 ? '·' : at + 1}</Folio>
                                <PageTurn disabled={at >= files.length - 1} onClick={() => { this.tab = at < 0 ? files[0] : files[at + 1]; this.head(); }}>
                                    next →
                                </PageTurn>
                            </PageTurns>
                            <DogEar data-dogear title="turn back to the reading" onClick={() => { this.mode = 'read'; this.turn(this.page); }} />
                        </Page>
                    );
                })()}
                {this.open && current && this.mode !== 'manuscript' && (() => {
                    const sources = { ...modelSources, ...manuscripts[held.key] };
                    const names = [current.source, ...Object.keys(modelSources).filter(n => n !== current.source)];
                    const leaf = names.includes(this.tab) ? this.tab : current.source;
                    return (
                        <Page className={this.over ? 'book-page verso' : 'book-page'} style={this.over ? { background: '#eef3ea' } : undefined}>
                            {this.marks()}
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
                            {!this.over && (
                                <PageBody className="page-body" onScroll={(e) => this.slide(e)}>
                                    {rightPage(held, current, this.mode, (p) => this.turn(p), (a) => this.follow(a), (a, l) => this.press(a, l))}
                                </PageBody>
                            )}
                            {this.over && (
                                <PageBody className="page-body manuscript" onScroll={(e) => this.slide(e)}>
                                    <CodeTabs>
                                        {names.map(name => (
                                            <CodeTab key={name} $active={leaf === name} onClick={() => { this.tab = name; this.head(); }}>
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

export const TheManifold = $($TheManifold);
