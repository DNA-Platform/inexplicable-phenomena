import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { type $Composition } from '../text/Composition';
import { type $Indexable } from './Indexable';
import { $Chapter } from './Chapter';
import { $Cover } from './Cover';
import { $Synopsis } from './Synopsis';
import { $Index } from './Index';
import { $Section } from '../text/Section';
import { $Paragraph } from '../text/Paragraph';
import { $Word } from '../text/Word';

export class $Book extends $Referent implements $Composition<$Chapter>, $Indexable {
    chapters: $Chapter[] = [];

    get copy(): string { return this.parts.map(c => c.copy).join('\n\n'); }
    get parts(): $Chapter[] { return this.chapters; }
    get canonical(): $Cover { return this.cover; }
    get cover(): $Cover { return this.chapters.find(c => c instanceof $Cover) as $Cover; }
    get synopsis(): $Synopsis { return this.chapters.find(c => c instanceof $Synopsis) as $Synopsis; }
    get index(): $Index | undefined { return this.chapters.find(c => c instanceof $Index) as $Index | undefined; }
    get title(): string { return this.cover ? this.cover.title : ''; }
    get sections(): $Section[] { return this.parts.flatMap(c => c.parts); }
    get paragraphs(): $Paragraph[] { return this.parts.flatMap(c => c.paragraphs); }
    get words(): $Word[] { return this.paragraphs.flatMap(p => p.words); }

    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters.map(c => $check(c, $Chapter));
        if (!this.chapters.some(c => c instanceof $Cover)) throw new Error('A book requires a cover — its canonical chapter.');
        if (!this.chapters.some(c => c instanceof $Synopsis)) throw new Error('A book requires a synopsis — a book is indexable.');
        const index = this.index;
        if (index) index.book = this;
    }

    view(): ReactNode {
        return this.parts.map((c, i) => React.createElement($(c as any) as any, { key: i }));
    }
}

export const Book = $($Book);
