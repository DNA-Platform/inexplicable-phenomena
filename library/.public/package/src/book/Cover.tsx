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

    override emit(contents: ReactNode, theme: $Theme): ReactNode {
        return <header style={{ borderBottom: `1px solid ${theme.rule}` }}>{contents}</header>;
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
