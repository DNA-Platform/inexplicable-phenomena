import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { text } from '../tools/html';
import { $Chapter } from './Chapter';
import { $Title, Title } from '../writing/Title';
import { $Cover } from './Cover';
import { $Section } from '../writing/Section';

export class $TableOfContents extends $Chapter {
    get title(): $Title {
        const authored = super.title;
        if (authored) return authored;
        const title: $Title = $(<Title>Table of Contents</Title>);
        return title;
    }

    get summary(): $Section | undefined { return this.book?.cover?.summary; }

    get entries(): $Chapter[] {
        const chapters = this.book?.parts ?? [];
        if (chapters.includes(this)) return chapters;
        const afterCover = chapters.findIndex(c => c instanceof $Cover) + 1;
        return [...chapters.slice(0, afterCover), this, ...chapters.slice(afterCover)];
    }

    $TableOfContents(...sections: $Section[]) {
        this.sections = sections.map(s => $check(s, $Section));
        this.sections.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
    }

    view(): ReactNode {
        const heading = (c: $Chapter): string => {
            const t = text(c.canonical?.title);
            if (t) {
                const colon = t.indexOf(':');
                return colon < 0 ? t : t.slice(0, colon).trim();
            }
            return c instanceof $TableOfContents ? 'Table of Contents' : '';
        };
        return (
            <ol className="table-of-contents">
                {this.entries.map((c, i) => <li key={i}>{heading(c)}</li>)}
            </ol>
        );
    }

}

export const TableOfContents = $($TableOfContents);
