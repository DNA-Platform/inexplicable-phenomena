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
import { styled } from 'styled-components';
import '../writing/dressing';


export const TitlePage = styled.header`
    margin-bottom: ${p => p.theme.rhythm};
    padding-bottom: ${p => p.theme.rhythm};
    border-bottom: 1px solid ${p => p.theme.rule};
`;

export const Byline = styled.p`
    margin: ${p => p.theme.step(-1)} 0 0;
    font-size: ${p => p.theme.step(-1)};
    color: ${p => p.theme.faint};

    b { padding: 0 0.55em; color: ${p => p.theme.rule}; font-weight: 400; }
`;

export class $Cover extends $Chapter implements $Reference$<$Book> {
    readonly isCover = true;

    TitlePage = TitlePage;
    Byline = Byline;

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
        const Page = this.TitlePage;
        return (
            <Page theme={theme as never} data-cover-page>
                {contents}
                {this.byline(theme)}
            </Page>
        );
    }

    byline(theme: $Theme): ReactNode {
        const author = this.author;
        const subject = this.subject;
        if (!author && !subject) return null;
        const Said = this.Byline;
        return (
            <Said theme={theme as never} data-byline>
                {author ? <>{'by '}{author.named(theme)}</> : null}
                {author && subject ? <b>·</b> : null}
                {subject ? <>{'in '}{subject.named(theme)}</> : null}
            </Said>
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
