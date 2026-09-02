import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Figure } from '@/writing/Figure';
import { Diagram, Legend, Tree, Branch, Role, Pair, Way, Claim, Verdict, Controls, Field, Toggle, Answer, Because, Flow, Step, StepName, StepFlow, StepWhere, StepOwed, Seams, Seam, SeamHand, SeamAgreement, SeamFixture, Listing, ListingName, Source } from '../../../the-build.styled';

export type Node = { name: string; depth: number; folder?: boolean };

// THE CONVENTION, IN CODE. Dots mark subjects and the count is how deep the
// subjecthood goes; files are named. The diagrams below do not draw a picture
// of this rule — they run it, so a wrong rule draws a wrong tree.
export const dotsOf = (name: string): number => (name.match(/^\.+/)?.[0].length ?? 0);

export const roleOf = (node: Node): string => {
    const dots = dotsOf(node.name);
    if (node.folder) {
        if (dots > 1) return 'a subject of subjects';
        return dots ? 'a subject' : 'a book';
    }
    if (node.name.includes('--')) return 'a resource';
    if (dots) return node.name.replace(/^\.+/, '').split('.')[0];
    return 'a chapter';
};

class $Drawn extends $Figure {
    view(): ReactNode {
        return (
            <Diagram>
                {this.drawn()}
                {this.parenthetical ? null : <Legend>{this.caption.copy}</Legend>}
            </Diagram>
        );
    }
}

export class $Shape extends $Drawn {
    $nodes: Node[] = [];

    get nodes(): Node[] { return this.$nodes; }

    drawn(): ReactNode {
        if (!this.nodes.length) return null;
        return (
            <Tree>
                {this.nodes.map((node, at) => (
                    <Branch key={`${node.name}-${at}`} $depth={node.depth} $role={roleOf(node)}>
                        {node.name}
                        {'  '}
                        <Role>{roleOf(node)}</Role>
                    </Branch>
                ))}
            </Tree>
        );
    }
}

// THE RECIPROCITY, RUN. A book's canonical subject is the folder holding it, so
// the tree answers one direction outright. The other is the subject's own: the
// first book it catalogues, unless it declares another. The two agree exactly
// when what is declared is one of the books actually held.
export const canonicalOf = (books: string[], declared: string): string => declared || books[0] || '';

export const reciprocates = (books: string[], declared: string): boolean => books.includes(canonicalOf(books, declared));

export class $Reciprocal extends $Drawn {
    $subject = '';

    $books: string[] = [];

    $declared = '';

    get subject(): string { return this.$subject; }

    get books(): string[] { return this.$books; }

    get declared(): string { return this.$declared; }

    drawn(): ReactNode {
        const canonical = canonicalOf(this.books, this.declared);
        const holds = reciprocates(this.books, this.declared);
        return (
            <>
                <Pair>
                    <Way>by the tree</Way>
                    <Claim>{this.books.map(b => `${b} → ${this.subject}`).join('\n')}</Claim>
                    <Way>{this.declared ? 'declared' : 'first in contents'}</Way>
                    <Claim>{`${this.subject} → ${canonical}`}</Claim>
                </Pair>
                <Verdict $holds={holds}>
                    {holds
                        ? `reciprocal — ${canonical} is held by ${this.subject}, and ${this.subject} is its subject by the tree`
                        : `NOT reciprocal — ${this.subject} names ${canonical}, which it does not hold`}
                </Verdict>
            </>
        );
    }
}

// THE RULE, UNDER THE READER'S HAND. The same classifier the diagrams run,
// answering whatever is typed at it — so the convention is met by using it
// rather than by being told it.
export class $Bench extends $Drawn {
    entry = '.cover.tsx';

    folder = false;

    because(): string {
        const dots = dotsOf(this.entry);
        if (this.folder && dots > 1) return 'More than one dot on a folder: a subject that holds other subjects, keeping a rank free for each of them.';
        if (this.folder && dots) return 'One dot on a folder: a subject, which is to say a folder that holds books.';
        if (this.folder) return 'No dots on a folder: a book.';
        if (this.entry.includes('--')) return 'A double dash attaches a file to the chapter it serves. Writing code is specifying semantics, so a book carries whatever code it needs.';
        if (dots) return 'A dot on a file marks what is not a chapter, and the name says which. There are two: the cover and the synopsis.';
        return 'No dot on a file: an ordinary chapter, met by reading in order.';
    }

    drawn(): ReactNode {
        const node: Node = { name: this.entry, depth: 0, folder: this.folder };
        const role = roleOf(node);
        return (
            <>
                <Controls>
                    <Field
                        value={this.entry}
                        spellCheck={false}
                        aria-label="an entry in a library folder"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.entry = e.target.value; }}
                    />
                    <Toggle $on={this.folder} onClick={() => { this.folder = !this.folder; }}>
                        {this.folder ? 'folder' : 'file'}
                    </Toggle>
                </Controls>
                <Answer data-answer>{this.entry.trim() ? role : '—'}</Answer>
                <Because>{this.entry.trim() ? this.because() : 'Type an entry to see what the convention makes of it.'}</Because>
            </>
        );
    }
}

export type Stage = { name: string; takes: string; makes: string; where: string; owed: string };

// THE PROCESS, drawn from its own list. A stage that still owes a mechanism
// says so in the row, because a table that looks uniform reads as finished.
export class $Stages extends $Drawn {
    $stages: Stage[] = [];

    get stages(): Stage[] { return this.$stages; }

    drawn(): ReactNode {
        return (
            <Flow>
                {this.stages.map(stage => (
                    <Step key={stage.name} $owed={!!stage.owed} data-stage={stage.name}>
                        <StepName>{stage.name}</StepName>
                        <StepFlow>{`${stage.takes} → ${stage.makes}`}</StepFlow>
                        <StepWhere>{stage.where}</StepWhere>
                        {stage.owed ? <StepOwed data-owed>{`owed — ${stage.owed}`}</StepOwed> : null}
                    </Step>
                ))}
            </Flow>
        );
    }
}

export type Handoff = { from: string; to: string; agreement: string; fixture: string; ready: boolean };

// THE SEAMS. What one stage hands the next, and what the receiving side can
// build against today. A seam whose receiver has no fixture cannot be dispatched,
// and the figure marks it rather than leaving the row looking like the others.
export class $Handoffs extends $Drawn {
    $handoffs: Handoff[] = [];

    get handoffs(): Handoff[] { return this.$handoffs; }

    drawn(): ReactNode {
        return (
            <Seams>
                {this.handoffs.map(seam => (
                    <Seam key={`${seam.from}-${seam.to}`} $ready={seam.ready} data-seam={`${seam.from}→${seam.to}`}>
                        <SeamHand>{`${seam.from} → ${seam.to}`}</SeamHand>
                        <SeamAgreement>{seam.agreement}</SeamAgreement>
                        <SeamFixture data-fixture={seam.ready ? 'ready' : 'blocked'}>
                            {seam.ready ? `builds against — ${seam.fixture}` : `blocked — ${seam.fixture}`}
                        </SeamFixture>
                    </Seam>
                ))}
            </Seams>
        );
    }
}

export type Band = { when: string; teams: { letter: string; builds: string; against: string }[] };

// THE ORDER OF DISPATCH. Three bands: one team that goes first because its
// output replaces everybody else's hand-made input, five that wait on nothing,
// and one that cannot start early because closing the seams IS its work.
export class $Order extends $Drawn {
    $bands: Band[] = [];

    get bands(): Band[] { return this.$bands; }

    drawn(): ReactNode {
        return (
            <Flow>
                {this.bands.map(band => (
                    <Step key={band.when} $owed={false} data-band={band.when} data-teams={String(band.teams.length)}>
                        <StepName>{band.when}</StepName>
                        <StepFlow>{band.teams.map(t => `${t.letter} — ${t.builds}`).join('\n')}</StepFlow>
                        <StepWhere>{band.teams.length > 1 ? `${band.teams.length} at once` : 'alone'}</StepWhere>
                        <StepOwed as="span">{band.teams.map(t => `${t.letter} builds against ${t.against}`).join('\n')}</StepOwed>
                    </Step>
                ))}
            </Flow>
        );
    }
}

export type Described = {
    path: string;
    dots: number;
    kind: 'subject' | 'book';
    own: string;
    holds: string[];
    files: { name: string; role: string; of: string }[];
};

export type Complaint = { path: string; says: string };

// THE DESCRIPTION, DERIVED. Every later stage reads this and nothing else, so
// it is computed here from paths alone by the same classifier the chapters run.
// Reading resolves order and collects every complaint rather than stopping at
// the first, because a build that reports one fault at a time is a build run
// many times.
export const describe = (paths: string[]): { entries: Described[]; complaints: Complaint[] } => {
    // Every ancestor, not only the folders that happen to hold files — a subject
    // whose books are all in sub-folders holds no file of its own and would
    // otherwise never appear.
    const folders = [...new Set(paths.flatMap(p => {
        const parts = p.split('/').slice(0, -1);
        return parts.map((_, at) => parts.slice(0, at + 1).join('/'));
    }))].sort();
    const parentOf = (p: string) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '');
    const speaker = (path: string): string => {
        const held = folders.filter(f => parentOf(f) === path);
        const top = held.reduce((n, f) => Math.max(n, dotsOf(last(f))), 0);
        const at = held.filter(f => dotsOf(last(f)) === top);
        return top && at.length === 1 ? at[0] : '';
    };
    const entries: Described[] = folders.map(path => {
        const holds = folders.filter(f => parentOf(f) === path);
        const own = speaker(path);
        // A dotted folder that speaks for its container is that container's own
        // BOOK. Dots alone cannot decide a kind; position decides it.
        const spoken = speaker(parentOf(path)) === path;
        const files = paths
            .filter(p => parentOf(p) === path)
            .map(p => last(p))
            .map(name => ({ name, role: roleOf({ name, depth: 0 }), of: name.includes('--') ? name.slice(0, name.indexOf('--')) : '' }));
        const kind: 'subject' | 'book' = spoken ? 'book' : holds.length ? 'subject' : 'book';
        return { path, dots: dotsOf(last(path)), kind, own, holds, files };
    });
    const complaints: Complaint[] = [];
    for (const e of entries) {
        if (e.kind === 'subject' && !e.holds.length) complaints.push({ path: e.path, says: 'marked a subject and holds nothing' });
        if (e.holds.length && !e.own) complaints.push({ path: e.path, says: 'no single folder speaks for it' });
        if (e.kind === 'book' && e.files.length && !e.files.some(f => f.role === 'cover')) complaints.push({ path: e.path, says: 'a book with no cover' });
    }
    return { entries, complaints };
};

export class $Description extends $Drawn {
    $paths: string[] = [];

    get paths(): string[] { return this.$paths; }

    drawn(): ReactNode {
        const { entries, complaints } = describe(this.paths);
        return (
            <>
                <Tree>
                    {entries.map(entry => (
                        <Branch key={entry.path} $depth={entry.path.split('/').length - 1} $role={entry.kind} data-described={entry.path}>
                            {entry.path}
                            {'  '}
                            <Role>{`${entry.kind}${entry.own ? ` · spoken for by ${last(entry.own)}` : ''} · ${entry.files.length} files`}</Role>
                        </Branch>
                    ))}
                </Tree>
                <Verdict $holds={!complaints.length} data-complaints={String(complaints.length)}>
                    {complaints.length
                        ? complaints.map(c => `${c.path} — ${c.says}`).join('\n')
                        : `no complaints — ${entries.length} folders described`}
                </Verdict>
            </>
        );
    }
}

const last = (p: string) => p.slice(p.lastIndexOf('/') + 1);

export type Declared = { path: string; author?: string; subject?: string; canonical?: string };

export type Resolved = { path: string; author: string; subject: string; canonical: string; supplied: string[] };

// RESOLVING, RUN. A name on a cover is a word until something makes it
// followable. Position answers what a book belongs to; the cover answers what a
// subject speaks with; and a silence is filled from where the book sits rather
// than from what it says. Nothing here is written back to anybody's file — the
// library is a resolution, and a resolution is not an edit.
export const resolve = (books: Declared[]): Resolved[] => {
    const above = (path: string): string => (path.lastIndexOf('/') > 0 ? path.slice(0, path.lastIndexOf('/')) : '/');
    const holds = (path: string): string[] => books.filter(b => b.path !== path && above(b.path) === path).map(b => b.path);
    const itself = books.find(b => b.author !== undefined && b.author === b.path);
    return books.map(book => {
        const supplied: string[] = [];
        let subject = book.subject;
        if (subject === undefined) { subject = above(book.path); supplied.push('subject'); }
        let author = book.author;
        if (author === undefined) { author = itself ? itself.path : 'nobody — this library names no author of its own'; supplied.push('author'); }
        const held = holds(book.path);
        let canonical = book.canonical;
        if (canonical === undefined) { canonical = held.length ? held[0] : ''; if (held.length) supplied.push('canonical'); }
        return { path: book.path, author, subject, canonical, supplied };
    });
};

export class $Resolving extends $Drawn {
    $books: Declared[] = [];

    get books(): Declared[] { return this.$books; }

    drawn(): ReactNode {
        const rows = resolve(this.books);
        const filled = rows.reduce((n, r) => n + r.supplied.length, 0);
        const missing = rows.some(r => r.author.startsWith('nobody'));
        return (
            <>
                <Tree>
                    {rows.map(row => (
                        <Branch key={row.path} $depth={row.path.split('/').length - 1} $role={row.supplied.length ? 'supplied' : 'declared'} data-resolved={row.path}>
                            {row.path}
                            {'  '}
                            <Role>
                                {`by ${row.author} · in ${row.subject}${row.canonical ? ` · spoken for by ${row.canonical}` : ''}`}
                                {row.supplied.length ? ` · supplied: ${row.supplied.join(', ')}` : ' · all declared'}
                            </Role>
                        </Branch>
                    ))}
                </Tree>
                <Verdict $holds={!missing} data-supplied={String(filled)}>
                    {missing
                        ? `${filled} links supplied — but this library holds no book that is its own author, so every author it supplies stands for nobody. A corpus that never leaves the author unsaid never tests the rule that fills it.`
                        : `${filled} links supplied from where each book sits; the rest were declared. No authored file was touched to do it.`}
                </Verdict>
            </>
        );
    }
}

export type Shown = { path: string; holds: string[] };

// THE SHOWING, RUN. A book is consulted when it catalogues anything and read
// when it does not, and the test is HAVING a card rather than following one —
// following would open every book on the shelf to decide how to draw one page,
// which is the thing a catalogue exists to prevent. What a visit costs falls
// out of the same answer rather than being imposed on it.
export const shown = (book: Shown): { kind: string; loads: string } => {
    const held = book.holds.length;
    if (!held) return { kind: 'read', loads: 'its own module, and nothing else' };
    return { kind: 'consulted', loads: `its own module, and ${held} ${held === 1 ? 'card' : 'cards'}` };
};

export class $Showing extends $Drawn {
    $books: Shown[] = [];

    get books(): Shown[] { return this.$books; }

    drawn(): ReactNode {
        const rows = this.books.map(book => ({ book, ...shown(book) }));
        const consulted = rows.filter(r => r.kind === 'consulted').length;
        return (
            <>
                <Tree>
                    {rows.map(({ book, kind, loads }) => (
                        <Branch key={book.path} $depth={book.path.split('/').length - 1} $role={kind} data-shown={book.path}>
                            {book.path}
                            {'  '}
                            <Role>{`${kind} · ${loads}`}</Role>
                        </Branch>
                    ))}
                </Tree>
                <Verdict $holds data-consulted={String(consulted)}>
                    {`${consulted} of ${rows.length} catalogue something and are drawn as catalogues; the rest are read. No page loads a book it does not show.`}
                </Verdict>
            </>
        );
    }
}

export class $Listed extends $Figure {
    $source = '';

    $of = '';

    constructor() {
        super();
        this.parenthetical = true;
    }

    get source(): string { return this.$source; }

    get of(): string { return this.$of; }

    view(): ReactNode {
        return (
            <Listing>
                <ListingName>{this.of || this.caption.copy}</ListingName>
                <Source>{this.source.trim()}</Source>
            </Listing>
        );
    }

    drawn(): ReactNode {
        return this.source ? <Source>{this.source.trim()}</Source> : null;
    }

    valid(): boolean {
        return this.source !== '' || this.caption.copy !== '';
    }
}

export const Shape = $($Shape);
export const Reciprocal = $($Reciprocal);
export const Bench = $($Bench);
export const Stages = $($Stages);
export const Handoffs = $($Handoffs);
export const Description = $($Description);
export const Order = $($Order);
export const Resolving = $($Resolving);
export const Showing = $($Showing);
export const Listed = $($Listed);
