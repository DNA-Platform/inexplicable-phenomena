import { ReactNode } from 'react';
import { $, $check, $valid, $Chemical } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import * as paths from '../reference/Path';
import { $Composible$ } from '../writing/Composition';
import { $Composition$ } from '../writing/Composition';
import { $Chapter } from './Chapter';
import { $Author } from './Author';
import { $Subject } from './Subject';
import { $Canonical } from './Canonical';
import { $IndexCard } from '../library/IndexCard';
import { $Cover } from './Cover';
import { $Synopsis } from './Synopsis';
import { $TableOfContents } from './TableOfContents';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Subtitle } from '../writing/Subtitle';
import { $Paragraph } from '../writing/Paragraph';
import { $Sentence } from '../writing/Sentence';
import { $Word } from '../writing/Word';
import { $Letter } from '../writing/Letter';
import { $Theme } from '../writing/Theme';
import * as themes from '../writing/Theme';

const canonicals = (cover: $Cover): $Canonical[] =>
    cover.words.filter(w => w instanceof $Canonical) as $Canonical[];

const pointed = (reference?: { card?: $IndexCard<$Book> }): $Book | undefined => {
    try {
        return reference?.card?.read();
    } catch {
        return undefined;
    }
};

export class $Book extends $Referent implements $Composition$<$Chapter>, $Catalogue$<$Book> {
    $parts: $Chapter[] = [];

    $parenthetical? = false;

    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    get copy(): string { return this.parts().filter(c => !c.parenthetical).map(c => c.copy).join('\n\n'); }
    get canonical(): $Cover { return this.cover; }
    get cover(): $Cover { return this.chapters[0] as $Cover; }

    get synopsis(): $Synopsis { return this.chapters.find(c => this.accounts(c)) as $Synopsis; }
    get title(): $Title | undefined { return this.cover instanceof $Cover ? this.cover.title : undefined; }
    get author(): $Author | undefined { return this.cover instanceof $Cover ? this.cover.author : undefined; }
    get subject(): $Subject | undefined { return this.cover instanceof $Cover ? this.cover.subject : undefined; }
    get subtitle(): $Subtitle | undefined { return this.cover instanceof $Cover ? this.cover.subtitle : undefined; }

    get library(): $Book | undefined {
        const seen = new Set<$Book>();
        let at: $Book | undefined = this;
        while (at && !seen.has(at)) {
            seen.add(at);
            const of: $Book | undefined = pointed(at.subject);
            if (!of) return undefined;
            if (of === at) return at;
            at = of;
        }
        return undefined;
    }

    get chapters(): $Chapter[] { return this.parts(); }
    get sections(): $Section[] { return this.selectMany(c => c.sections); }
    get paragraphs(): $Paragraph[] { return this.sections.flatMap(s => s.paragraphs); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get theme(): $Theme { return $(themes.Theme).$ as $Theme; }

    get ref(): $Cover { return this.cover; }

    at(position: number): $Location<$Chapter> {
        return $Composible$.at(this, position);
    }

    parts(): $Chapter[] {
        return this.$parts;
    }

    get entries(): $Reference$<$Book>[] {
        return this.chapters.filter(c => {
            if (c instanceof $Synopsis && c.card !== undefined) return !this.accounts(c);
            try { return c.read() !== this; } catch { return false; }
        });
    }

    follow(): $Composition$<$Book> {
        return $Composible$.follow({ parts: () => this.entries });
    }

    read(): $Composition$<$Book> {
        return this.follow();
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    where(match: (part: $Chapter) => boolean): $Chapter[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $Chapter) => U): U[] {
        return $Composible$.select(this, pick);
    }

    selectMany<U>(pick: (part: $Chapter) => U[]): U[] {
        return $Composible$.selectMany(this, pick);
    }

    single(match: (part: $Chapter) => boolean): $Chapter {
        return $Composible$.single(this, match);
    }

    accounts(chapter: $Chapter): boolean {
        if (!(chapter instanceof $Synopsis)) return false;
        try {
            return chapter.read() === this;
        } catch {
            return false;
        }
    }

    get tableOfContents(): $TableOfContents {
        return this.chapters.find(c => c instanceof $TableOfContents) as $TableOfContents;
    }

    $Book(...chapters: $Chapter[]) {
        this.$parts = chapters.map(c => $check(c, $Chapter));
        for (const chapter of this.$parts) chapter.$in = this;
        if (!(this.chapters[0] instanceof $Cover)) throw new Error('A book requires its cover at position zero — its canonical chapter.');
        if (this.chapters.some((c, i) => i > 0 && c instanceof $Cover)) throw new Error('A book requires exactly one cover.');
        if (!this.chapters.some(c => this.accounts(c))) throw new Error('A book requires a synopsis OF ITSELF — one whose reference comes home. A book may carry the synopses of other books, and those are its catalogue rather than its own account.');
        if (this.chapters.filter(c => c instanceof $TableOfContents).length !== 1) throw new Error('A book declares exactly one table of contents.');
        if (!this.author) throw new Error('A book carries its author on its cover, and this cover names none.');
        if (!this.subject) throw new Error('A book carries its subject on its cover, and this cover names none.');
        if (canonicals(this.cover).length > 1) throw new Error('A subject declares exactly one canonical, and this cover carries more.');
    }

    get reading(): $Chapter[] {
        return this.chapters.filter(c => !(c instanceof $TableOfContents) && !this.accounts(c) && !c.parenthetical);
    }

    stands(theme: $Theme): $Chapter[] {
        const reading = this.reading;
        if (!reading.length) return [];
        const at = Math.min(Math.max(this.page, 0), reading.length - 1);
        return [reading[at]];
    }

    environment(contents: ReactNode, theme: $Theme): ReactNode {
        return (
            <article style={{ maxWidth: theme.measure, margin: '0 auto', lineHeight: theme.leading, color: theme.ink, background: theme.ground, fontFamily: theme.face, fontSize: theme.step(0) }}>
                {contents}
            </article>
        );
    }

    place(chapter: $Chapter, at: number, theme: $Theme): ReactNode {
        const Standing = $(chapter) as any;
        return (
            <div key={at} id={chapter.address || undefined} data-chapter={at} style={{ marginBottom: theme.rhythm }}>
                <Standing />
            </div>
        );
    }

    head(theme: $Theme): ReactNode {
        if (this.page === 0) return null;
        const title = this.title?.copy ?? '';
        if (!title) return null;
        return (
            <a
                data-running
                href="#"
                onClick={event => { event.preventDefault(); this.page = 0; }}
                style={{ display: 'block', fontSize: theme.step(-2), letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.faint, textDecoration: 'none', marginBottom: theme.step(0), cursor: 'pointer' }}
            >
                {title}
            </a>
        );
    }

    shelf(theme: $Theme): ReactNode {
        const held = this.entries;
        if (!held.length) return null;
        return (
            <ul data-entries={held.length} style={{ margin: `${theme.rhythm} 0 0`, padding: 0 }}>
                {held.map((entry, at) => {
                    const Held = $(entry) as any;
                    return <Held key={at} />;
                })}
            </ul>
        );
    }

    view(): ReactNode {
        const theme = this.theme;
        const reading = this.reading;
        const contents = this.tableOfContents;
        const Contents = contents ? ($(contents) as any) : undefined;
        const listed = Contents ? <div data-contents style={{ margin: `${theme.rhythm} 0` }}><Contents /></div> : null;
        const standing = this.stands(theme).map(c => this.place(c, reading.indexOf(c), theme));
        return this.environment(
            this.page === 0
                ? <>{standing}{listed}{this.shelf(theme)}</>
                : <>{this.head(theme)}{listed}{standing}</>,
            theme
        );
    }

    valid(): boolean {
        const covered = $valid(this.chapters[0] instanceof $Cover, 'a book carries its cover at position zero, and this one does not');
        const once = $valid(!this.chapters.some((c, i) => i > 0 && c instanceof $Cover), 'a book carries exactly one cover, and this one carries more');
        const accounted = $valid(this.chapters.some(c => this.accounts(c)), 'a book carries a synopsis OF ITSELF, and this one accounts only for other books');
        const listed = $valid(this.chapters.filter(c => c instanceof $TableOfContents).length === 1, 'a book declares exactly one table of contents');
        const authored = $valid(this.author !== undefined, 'a book carries its author on its cover, and this cover names none');
        const filed = $valid(this.subject !== undefined, 'a book carries its subject on its cover, and this cover names none');

        const of = pointed(this.author);
        const about = pointed(this.subject);

        const wrote = $valid(!of || pointed(of.author) === of, 'a book names an author that authors itself, and this one names a book somebody else wrote');

        const holds = $valid(!about || about.entries.length > 0, 'a book names a subject that catalogues other books, and this one names a book that catalogues nothing');

        return covered && once && accounted && listed && authored && filed && wrote && holds;
    }
}

export const Book = $($Book);
