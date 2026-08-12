import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Composition$ } from '../writing/Composition';
import { $Writing, type Level } from '../writing/Writing';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import * as titles from '../writing/Title';
import { type $Subtitle } from '../writing/Subtitle';
import { type $Tagline } from '../writing/Tagline';
import { $Paragraph } from '../writing/Paragraph';
import { $Sentence } from '../writing/Sentence';
import { $Word } from '../writing/Word';
import { $Letter } from '../writing/Letter';
import { $Footer } from './Footer';
import { $Bibliography } from './Bibliography';

// A document is the sixth level of writing — letter, word, sentence, paragraph,
// section, document. Chapter, book, subject and library are things done WITH a
// document; the document itself is writing, and composes sections.
export class $Document extends $Writing<$Section> implements $Referent$, $Composition$<$Section> {
    $parts: $Section[] = [];

    constructor() {
        super();
        this.inline = false;
    }

    get level(): Level { return 'document'; }
    get copy(): string { return this.parts().map(s => s.copy).join('\n\n'); }
    get canonical(): $Section { return this.parts().find(s => !s.parenthetical) ?? this.parts()[0]; }
    get summary(): $Section | undefined { return this.parts().find(s => s.parenthetical); }
    get tagline(): $Tagline | undefined { return this.summary?.tagline; }
    get footer(): $Footer | undefined { return this.parts().find(s => s instanceof $Footer && !(s instanceof $Bibliography)) as $Footer | undefined; }
    get bibliography(): $Bibliography | undefined { return this.parts().find(s => s instanceof $Bibliography) as $Bibliography | undefined; }

    get sections(): $Section[] { return this.parts(); }
    get paragraphs(): $Paragraph[] { return this.sections.flatMap(s => s.paragraphs); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get title(): $Title | undefined {
        const t = this.canonical?.heading ?? '';
        if (!t) return undefined;
        const Title = $(titles.Title);
        const title: $Title = $(<Title>{t}</Title>);
        return title;
    }

    get subtitle(): $Subtitle | undefined { return this.canonical?.subtitle; }

    $Document(...sections: $Section[]) {
        // A document is writing, so its own sequence goes up the chain — its
        // sections are block-level parts and arrive as the writing it holds.
        super.$Writing(...sections);
        this.$parts = sections.length ? sections.map(s => $check(s, $Section)) : this.declaration();
        this.$parts.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        for (const section of this.$parts) {
            for (const element of section.elements) {
                const writing = element as { valid?: () => boolean; copy?: string };
                if (typeof writing.valid === 'function' && writing.valid() === false) {
                    throw new Error(`The binding rejects ${JSON.stringify(writing.copy ?? '')} — invalid writing in ${section.heading}.`);
                }
            }
        }
    }

    // A document's sections are handed to it or written in its view — never
    // divided out of prose, which is what every level below does.
    parts(): $Section[] {
        return this.$parts;
    }

    // A document may write its sections in its own view instead of being handed
    // them. Those instances ARE its parts, and once they are read the document
    // draws what it holds: evaluating the same writing a second time would leave
    // the model carrying one set of sections and the reader looking at another.
    // A document that writes none falls through with nothing — the base view
    // renders parts that are not there yet and yields no sections, so no check
    // against the base is needed and none is made.
    declaration(): $Section[] {
        const node = this.view();
        const children = React.Children.toArray(
            React.isValidElement(node) && node.type === React.Fragment ? (node.props as any).children : node
        );
        const sections: $Section[] = [];
        for (const child of children) {
            if (!React.isValidElement(child)) continue;
            const evaluated = $(child as any, this);
            if (evaluated instanceof $Section) sections.push(evaluated);
        }
        if (sections.length) this.$view = $Document.prototype.view;
        return sections;
    }

    view(): ReactNode {
        return this.parts().map((s, i) => {
            const S = $(s) as any;
            return <div className="section" key={i}><S /></div>;
        });
    }

    valid(): boolean {
        return this.summary !== undefined;
    }
}

export const Document = $($Document);
