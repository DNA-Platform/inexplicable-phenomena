import React, { type ReactNode } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { type $Composition$ } from '../writing/Composition';
import { $Section } from '../writing/Section';
import { $Title, Title } from '../writing/Title';
import { type $Subtitle } from '../writing/Subtitle';
import { type $Tagline } from '../writing/Tagline';
import { $Paragraph } from '../writing/Paragraph';
import { $Sentence } from '../writing/Sentence';
import { $Word } from '../writing/Word';
import { $Letter } from '../writing/Letter';
import { $Footer } from './Footer';
import { $Bibliography } from './Bibliography';

export class $Document extends $Chemical implements $Referent$, $Composition$<$Section> {
    $parts: $Section[] = [];

    $index?: number = undefined;
    $parenthetical? = false;

    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
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
        const title: $Title = $(<Title>{t}</Title>);
        return title;
    }

    get subtitle(): $Subtitle | undefined { return this.canonical?.subtitle; }

    $Document(...sections: $Section[]) {
        this.$parts = sections.length ? sections.map(s => $check(s, $Section)) : this.written();
        this.$parts.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        if (!this.valid()) throw new Error('A document requires a summary — a parenthetical section.');
        for (const section of this.$parts) {
            for (const element of section.elements) {
                const writing = element as { valid?: () => boolean; copy?: string };
                if (typeof writing.valid === 'function' && writing.valid() === false) {
                    throw new Error(`The binding rejects ${JSON.stringify(writing.copy ?? '')} — invalid writing in ${section.heading}.`);
                }
            }
        }
    }

    at(index: number): $Location<$Section> {
        return $Composible$.at(this, index);
    }

    parts(): $Section[] {
        return this.$parts;
    }

    where(match: (part: $Section) => boolean): $Section[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (part: $Section) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (part: $Section) => boolean): $Section {
        return $Composible$.single(this, match);
    }

    written(): $Section[] {
        if (this.view === $Document.prototype.view) return [];
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
