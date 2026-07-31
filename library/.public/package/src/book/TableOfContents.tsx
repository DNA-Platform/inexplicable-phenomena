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

    get chapters(): $Chapter[] {
        return this.book?.where(c => c !== this && !(c instanceof $Cover)) ?? [];
    }

    $TableOfContents(...sections: $Section[]) {
        this.$parts = sections.map(s => $check(s, $Section));
        this.$parts.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
    }

    heading(c: $Chapter): string {
        return c.title?.copy ?? '';
    }

    row(c: $Chapter): ReactNode {
        const reference = c.$ref;
        return <li key={c.index}>{reference ? React.createElement($(reference) as any) : this.heading(c)}</li>;
    }

    view(): ReactNode {
        return (
            <div className="table-of-contents">
                <div className="contents-title">{this.heading(this)}</div>
                <ol>
                    {this.chapters.map(c => this.row(c))}
                </ol>
            </div>
        );
    }

}

export const TableOfContents = $($TableOfContents);
