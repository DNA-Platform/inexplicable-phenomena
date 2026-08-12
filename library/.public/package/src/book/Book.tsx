import { ReactNode } from 'react';
import { $, $check, $valid, $Chemical } from '@dna-platform/chemistry';
import { $Referent$ } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import * as paths from '../reference/Path';
import { $Composible$ } from '../utilities/Composible';
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

export class $Book extends $Chemical implements $Referent$, $Composition$<$Chapter>, $Catalogue$<$Book> {
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

    get chapters(): $Chapter[] { return this.parts(); }
    get sections(): $Section[] { return this.parts().flatMap(c => c.sections); }
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

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    where(match: (part: $Chapter) => boolean): $Chapter[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $Chapter) => U): U[] {
        return $Composible$.select(this, pick);
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
        if (this.cover.sections.flatMap(s => s.elements).filter(e => e instanceof $Canonical).length > 1) throw new Error('A subject declares exactly one canonical, and this cover carries more.');
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
        return covered && once && accounted && listed && authored && filed;
    }
}

export const Book = $($Book);
