import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Referent } from '../ref/Referent';
import { text } from '../tools/html';
import { type $Composition } from '../writing/Composition';
import { type $Book } from './Book';
import { $Section } from '../writing/Section';
import { $Title, Title } from '../writing/Title';
import { type $Subtitle } from '../writing/Subtitle';
import { type $Tagline } from '../writing/Tagline';
import { $Paragraph } from '../writing/Paragraph';
import { $Word } from '../writing/Word';

export class $Chapter extends $Referent implements $Composition<$Section> {
    parts: $Section[] = [];

    $index?: number = undefined;
    $parenthetical? = false;

    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }
    get book(): $Book { return this.parent as $Book; }
    get copy(): string { return this.parts.map(s => s.copy).join('\n\n'); }
    get sections(): $Section[] { return this.parts; }
    get canonical(): $Section { return this.parts.find(s => !s.parenthetical) ?? this.parts[0]; }
    get summary(): $Section | undefined { return this.parts.find(s => s.parenthetical); }
    get tagline(): $Tagline | undefined { return this.summary?.tagline; }
    get paragraphs(): $Paragraph[] { return this.parts.flatMap(s => s.paragraphs); }
    get words(): $Word[] { return this.paragraphs.flatMap(p => p.words); }

    get title(): $Title | undefined {
        const t = this.canonical ? text(this.canonical.title) : '';
        if (!t) return undefined;
        const colon = t.indexOf(':');
        const title: $Title = $(<Title>{colon < 0 ? t : t.slice(0, colon).trim()}</Title>);
        return title;
    }

    get subtitle(): $Subtitle | undefined { return this.canonical?.subtitle; }

    $Chapter(...sections: $Section[]) {
        this.parts = sections.length ? sections.map(s => $check(s, $Section)) : this.written();
        this.parts.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        this.parts.forEach(s => { if (this.ref) s.ref = this.ref.compose(s.index); });
        if (!this.valid()) throw new Error('A chapter requires a summary — a parenthetical section.');
    }

    select(key: number): $Section | undefined {
        return this.parts.find(s => s.index === key);
    }

    written(): $Section[] {
        if (this.view === $Chapter.prototype.view) return [];
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
        return this.parts.map((s, i) => {
            const S = $(s) as any;
            return <div className="section" key={i}><S /></div>;
        });
    }

    valid(): boolean {
        return super.valid() && this.summary !== undefined;
    }
}

export const Chapter = $($Chapter);
