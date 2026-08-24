import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Chapter } from './Chapter';
import { $Title } from '../writing/Title';
import { $Book } from './Book';
import { $Section } from '../writing/Section';
import { $Author } from './Author';
import { $Subject } from './Subject';
import { styled } from 'styled-components';


export const TitlePage = styled.header<{ $theme: $Theme }>`
    margin-bottom: ${p => p.$theme.rhythm};
    padding-bottom: ${p => p.$theme.rhythm};
    border-bottom: 1px solid ${p => p.$theme.rule};
`;

export const Byline = styled.p<{ $theme: $Theme }>`
    margin: ${p => p.$theme.step(-1)} 0 0;
    font-size: ${p => p.$theme.step(-1)};
    color: ${p => p.$theme.faint};

    b { padding: 0 0.55em; color: ${p => p.$theme.rule}; font-weight: 400; }
`;

export class $Cover extends $Chapter implements $Reference<$Book> {
    $titlePage = TitlePage;
    $byline = Byline;

    get summary(): $Section { return this.canonical; }

    get title(): $Title { return super.title!; }

    // FOUND AMONG ITS ANNOTATIONS, not among its words. A cover used to reach for
    // a class name inside a word list; annotations are a member of writing now.
    get author(): $Author | undefined {
        return this.annotations.find(a => a instanceof $Author) as $Author | undefined;
    }

    get subject(): $Subject | undefined {
        return this.annotations.find(a => a instanceof $Subject) as $Subject | undefined;
    }

    read(): $Book {
        if (!this.book) throw new Error('The cover stands outside any book.');
        return this.book;
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    override set(contents: ReactNode, theme: $Theme): ReactNode {
        const Page = this.$titlePage;
        return (
            <Page $theme={theme} data-cover-page>
                {contents}
                {this.byline(theme)}
            </Page>
        );
    }

    // The two words a byline speaks, so a book can speak its own.
    get by(): string { return 'by '; }

    get within(): string { return 'in '; }

    byline(theme: $Theme): ReactNode {
        const author = this.author;
        const subject = this.subject;
        if (!author && !subject) return null;
        const Said = this.$byline;
        return (
            <Said $theme={theme} data-byline>
                {author ? <>{this.by}{author.named(theme)}</> : null}
                {author && subject ? <b>·</b> : null}
                {subject ? <>{this.within}{subject.named(theme)}</> : null}
            </Said>
        );
    }

    protected override requires(): void {
        if (!this.title) throw new Error('A cover requires a title.');
    }
}

export const Cover = $($Cover);
