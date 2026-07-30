import React, { type ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Cover } from './Cover';
import { $Section } from '../text/Section';
import { type $Book } from './Book';

export class $Index extends $Chapter {
    book?: $Book;

    get entries(): $Chapter[] {
        return (this.book?.parts ?? []).filter(c => !(c instanceof $Index) && !(c instanceof $Cover));
    }

    $Index(...sections: $Section[]) {
        this.sections = sections.map(s => $check(s, $Section));
    }

    view(): ReactNode {
        return (
            <ol className="index">
                {this.entries.map((c, i) => <li key={i}>{c.title}</li>)}
            </ol>
        );
    }
}

export const Index = $($Index);
