import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Composition } from '../writing/Composition';
import { $Writing } from '../writing/Writing';
import { $Section } from '../writing/Section';
import { $Theme } from '../writing/Theme';
import { styled } from 'styled-components';
import { $Title } from '../writing/Title';
import * as titles from '../writing/Title';
import { $Subtitle } from '../writing/Subtitle';
import { $Tagline } from '../writing/Tagline';
import { $Paragraph } from '../writing/Paragraph';
import { $Sentence } from '../writing/Sentence';
import { $Word } from '../writing/Word';
import { $Letter } from '../writing/Letter';
import { $Footer } from './Footer';
import { $Bibliography } from './Bibliography';

export const Placed = styled.div<{ $theme: $Theme }>`
    margin-bottom: ${p => p.$theme.rhythm};
`;

export const Body = styled.section``;

export class $Document extends $Writing<$Section> implements $Referent, $Composition<$Section> {
    $placed = Placed;
    $body = Body;

    $parts: $Section[] = [];

    constructor() {
        super();
        this.inline = false;
    }

    get copy(): string { return this.parts().filter(s => !s.parenthetical).map(s => s.copy).join(' '); }
    get canonical(): $Section {
        return this.parts().find(s => !s.parenthetical && this.carriesSummary(s)) ?? this.parts().find(s => !s.parenthetical) ?? this.parts()[0];
    }

    get summary(): $Section | undefined { return this.parts().find(s => s.parenthetical); }

    carriesSummary(section: $Section): boolean {
        return section.parts().some((p, at) => at > 0 && p.parenthetical);
    }
    get tagline(): $Tagline | undefined { return this.summary?.tagline; }
    get footer(): $Footer | undefined { return this.parts().find(s => s instanceof $Footer && !(s instanceof $Bibliography)) as $Footer | undefined; }
    get bibliography(): $Bibliography | undefined { return this.parts().find(s => s instanceof $Bibliography) as $Bibliography | undefined; }

    get sections(): $Section[] { return this.parts(); }
    get paragraphs(): $Paragraph[] { return this.sections.flatMap(s => s.paragraphs); }
    get sentences(): $Sentence[] { return this.paragraphs.flatMap(p => p.sentences); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.sections.flatMap(s => s.letters); }

    get title(): $Title | undefined {
        const t = this.canonical?.heading ?? '';
        if (!t) return undefined;
        const Title = $(titles.Title);
        const title: $Title = $(<Title>{t}</Title>);
        return title;
    }

    get subtitle(): $Subtitle | undefined { return this.canonical?.subtitle; }

    $Document(...writing: unknown[]) {
        super.$Writing(...writing);
        const written = (this.text.$elements ?? []).filter(s => s instanceof $Section) as $Section[];
        this.$parts = written.length ? written : this.declaration();
        for (const section of this.$parts) {
            for (const element of [...section.parts(), ...section.words]) {
                const writing = element as { valid?: () => boolean; copy?: string };
                if (typeof writing.valid === 'function' && writing.valid() === false) {
                    throw new Error(`The binding rejects ${JSON.stringify(writing.copy ?? '')} — invalid writing in ${section.heading}.`);
                }
            }
        }
    }

    parts(): $Section[] {
        return this.$parts;
    }

    declaration(): $Section[] {
        const node = this.view();
        const children = React.Children.toArray(
            React.isValidElement(node) && node.type === React.Fragment ? (node.props as any).children : node
        );
        const sections: $Section[] = [];
        for (const child of children) {
            if (!React.isValidElement(child)) continue;
            const evaluated = $(child as any);
            if (evaluated instanceof $Section && evaluated.parent !== this) evaluated.parent = this as never;
            if (evaluated instanceof $Section) sections.push(evaluated);
        }
        if (sections.length) this.$view = $Document.prototype.view;
        return sections;
    }

    // JOINED TO THE TEMPLATE. It used to override view() outright and
    // re-implement gathered() inline, twelve lines below the one it inherits.
    override gathered(theme: $Theme): ReactNode {
        const held = this.parts().filter(section => !section.parenthetical);
        const laid = this.shown(theme, this, held, false) ?? held;
        const Standing = this.$placed;
        return laid.map((s, i) => {
            const S = $(s) as never as React.ComponentType;
            return <Standing key={i} $theme={theme}><S /></Standing>;
        });
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Held = this.$body;
        return <Held>{contents}</Held>;
    }

    valid(): boolean {
        return this.summary !== undefined;
    }
}

export const Document = $($Document);
