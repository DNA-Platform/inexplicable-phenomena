import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Chapter } from './Chapter';
import { $Title } from '../writing/Title';
import { $Book } from './Book';
import { $Section } from '../writing/Section';
import { $Author } from './Author';
import { $Subject } from './Subject';

export class $Cover extends $Chapter implements $Reference$<$Book> {
    readonly isCover = true;

    get summary(): $Section { return this.canonical; }

    get title(): $Title { return super.title!; }

    get author(): $Author | undefined {
        return this.words.find(w => w instanceof $Author) as $Author | undefined;
    }

    get subject(): $Subject | undefined {
        return this.words.find(w => w instanceof $Subject) as $Subject | undefined;
    }

    read(): $Book {
        if (!this.book) throw new Error('The cover stands outside any book.');
        return this.book;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        return (
            <header data-cover-page style={{ borderBottom: `1px solid ${theme.rule}`, paddingBottom: theme.rhythm, marginBottom: theme.rhythm }}>
                {contents}
                {this.byline(theme)}
            </header>
        );
    }

    byline(theme: $Theme): ReactNode {
        const author = this.author;
        const subject = this.subject;
        if (!author && !subject) return null;
        const Wrote = author ? ($(author) as any) : undefined;
        const About = subject ? ($(subject) as any) : undefined;
        return (
            <p data-byline style={{ margin: `${theme.step(-1)} 0 0`, fontSize: theme.step(-1), color: theme.faint }}>
                {Wrote ? <>{'by '}<Wrote /></> : null}
                {Wrote && About ? <span style={{ padding: '0 0.55em', color: theme.rule }}>·</span> : null}
                {About ? <>{'in '}<About /></> : null}
            </p>
        );
    }

    $Cover(...writing: unknown[]) {
        try {
            super.$Chapter(...writing);
        } catch (error) {
            if (this.title) throw error;
        }
        if (!this.title) throw new Error('A cover requires a title.');
    }
}

export const Cover = $($Cover);
