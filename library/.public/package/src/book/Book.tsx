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

// The $Canonical a subject declares is a WORD in its cover's own writing, and it
// has no accessor of its own because `canonical` is already the framework's word
// for the first part of a composition — a book's cover, a chapter's summary — at
// every level. Asked of the model rather than of a bag of raw children, which is
// possible now that a written element survives the parse.
const canonicals = (cover: $Cover): $Canonical[] =>
    cover.words.filter(w => w instanceof $Canonical) as $Canonical[];

// A card that never pointed stands for nothing yet, and a book asked to judge
// itself before its cards are filled must answer rather than throw. Validity is
// asked at construction, when nothing points anywhere.
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

    get ref(): $Cover { return this.cover; }

    at(position: number): $Location<$Chapter> {
        return $Composible$.at(this, position);
    }

    parts(): $Chapter[] {
        return this.$parts;
    }

    follow(): $Composition$<$Book> {
        const elsewhere = (): $Reference$<$Book>[] => this.chapters.filter(c => {
            try { return c.read() !== this; } catch { return false; }
        });
        return $Composible$.follow({ parts: elsewhere });
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

    view(): ReactNode {
        return this.parts().filter(c => !c.parenthetical).map((c, i) => {
            const C = $(c) as any;
            return <div className="chapter" key={i}><C /></div>;
        });
    }

    valid(): boolean {
        const covered = $valid(this.chapters[0] instanceof $Cover, 'a book carries its cover at position zero, and this one does not');
        const once = $valid(!this.chapters.some((c, i) => i > 0 && c instanceof $Cover), 'a book carries exactly one cover, and this one carries more');
        const accounted = $valid(this.chapters.some(c => this.accounts(c)), 'a book carries a synopsis OF ITSELF, and this one accounts only for other books');
        const listed = $valid(this.chapters.filter(c => c instanceof $TableOfContents).length === 1, 'a book declares exactly one table of contents');
        const authored = $valid(this.author !== undefined, 'a book carries its author on its cover, and this cover names none');
        const filed = $valid(this.subject !== undefined, 'a book carries its subject on its cover, and this cover names none');

        // WHAT A LINK POINTS AT is a question only something holding every book can
        // ask, so these hold where a card has been given its book and are passed
        // over where it has not — which is every book at construction.
        const of = pointed(this.author);
        const about = pointed(this.subject);

        const wrote = $valid(!of || pointed(of.author) === of, 'a book names an author that authors itself, and this one names a book somebody else wrote');
        const holds = $valid(!about || about.read().parts().length > 0, 'a book names a subject that catalogues other books, and this one names a book that catalogues nothing');

        // THE CANONICAL IS NOT ASKED HERE, and that is the model answering rather
        // than a rule going missing. A book IS a catalogue of books, its catalogue
        // reading is a composition, and a composition's canonical is its first
        // part — so `read().canonical` IS the subject's canonical book, held by
        // definition. What a cover DECLARES only decides which entry stands first,
        // and a declaration naming a book the subject does not hold is answered
        // where the entries are built.
        return covered && once && accounted && listed && authored && filed && wrote && holds;
    }
}

export const Book = $($Book);
