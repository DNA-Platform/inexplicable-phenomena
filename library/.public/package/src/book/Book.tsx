import { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { type $Composition } from '../writing/Composition';
import { $Chapter } from './Chapter';
import { $Cover } from './Cover';
import { $Synopsis } from './Synopsis';
import { $TableOfContents, TableOfContents } from './TableOfContents';
import { $Section } from '../writing/Section';
import { type $Title } from '../writing/Title';
import { type $Subtitle } from '../writing/Subtitle';
import { $Paragraph } from '../writing/Paragraph';
import { $Word } from '../writing/Word';

export class $Book extends $Referent implements $Composition<$Chapter> {
    parts: $Chapter[] = [];

    $index?: number = undefined;
    $parenthetical? = false;

    get copy(): string { return this.parts.map(c => c.copy).join('\n\n'); }
    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get chapters(): $Chapter[] { return this.parts; }
    get canonical(): $Cover { return this.cover; }
    get cover(): $Cover { return this.chapters[0] as $Cover; }
    get synopsis(): $Synopsis { return this.chapters.find(c => c instanceof $Synopsis) as $Synopsis; }
    get title(): $Title | undefined { return this.cover instanceof $Cover ? this.cover.title : undefined; }
    get subtitle(): $Subtitle | undefined { return this.cover instanceof $Cover ? this.cover.subtitle : undefined; }
    get sections(): $Section[] { return this.parts.flatMap(c => c.parts); }
    get paragraphs(): $Paragraph[] { return this.parts.flatMap(c => c.paragraphs); }
    get words(): $Word[] { return this.paragraphs.flatMap(p => p.words); }

    get tableOfContents(): $TableOfContents {
        return this.chapters.find(c => c instanceof $TableOfContents) as $TableOfContents;
    }

    $Book(...chapters: $Chapter[]) {
        this.parts = chapters.map(c => $check(c, $Chapter));
        if (!this.valid()) throw new Error('A book requires exactly one cover at position zero — its canonical chapter — a synopsis, and at most one table of contents.');
        if (!this.parts.some(c => c instanceof $TableOfContents)) {
            this.parts.splice(1, 0, $(<TableOfContents />, this));
        }
        this.parts.forEach((c, i) => { if (c.$index === undefined) c.index = i; });
    }

    view(): ReactNode {
        return this.parts.map((c, i) => {
            const C = $(c) as any;
            return <div className="chapter" key={i}><C /></div>;
        });
    }

    valid(): boolean {
        return super.valid()
            && this.chapters[0] instanceof $Cover
            && !this.chapters.some((c, i) => i > 0 && c instanceof $Cover)
            && this.chapters.some(c => c instanceof $Synopsis)
            && this.chapters.filter(c => c instanceof $TableOfContents).length <= 1;
    }
}

export const Book = $($Book);
