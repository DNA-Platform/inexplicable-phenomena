// CREATED 2026-09-13 · rating 2. THE ENCYCLOPEDIA'S BOOK, AND IT IS LAYOUT — Doug: "Book is layout.
// Chapters are logical parts." The view puts the chapters in their groups and hands each group to
// the template method for that part, exactly as the header and the footer are drawn. The body is
// one such part: the chapters carrying $TypeOfArticle stand in it, in the order they were written,
// so one formatting context holds them and a format that floats reaches the prose that follows.
// The apparatus — the cover, the synopsis, the table of contents, the footer — carries no such type
// and stands where it was written. ONE WALK OVER ONE LIST, and no member answers a list.
import { Fragment, ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Book$, $Book, $TypeOfBook, BookSpecification } from '@/library/Book';
import { $TypeOfArticle } from './Article';

export interface $Encyclopedia$ extends $Book$ { }

export class $Encyclopedia extends $Book implements $Encyclopedia$ {
    $Encyclopedia(block: $Block) {
        super.$Book(this.addType(block, $TypeOfEncyclopedia));
    }

    override print(): ReactNode {
        const shown: ReactNode[] = [];
        let held: ReactNode[] = [];

        this.chapters.forEach((chapter, at) => {
            const Chapter = $(chapter);
            if (reflection.is(chapter, $TypeOfArticle)) return void held.push(<Chapter key={at} />);
            shown.push(<Fragment key={`body-${at}`}>{this.body(held)}</Fragment>, <Chapter key={at} />);
            held = [];
        });
        shown.push(<Fragment key="body">{this.body(held)}</Fragment>);

        return <>{this.header()}{shown}{this.footer()}</>;
    }

    body(held: ReactNode[]): ReactNode {
        return held.length === 0 ? undefined : <div className="pd-body">{held}</div>;
    }
}

export class $TypeOfEncyclopedia extends $TypeOfBook {
    protected override specification: Specification<$Writing> = new EncyclopediaSpecification();
}

export class EncyclopediaSpecification extends BookSpecification {
}

export const Encyclopedia = $($Encyclopedia);
export const TypeOfEncyclopedia = $($TypeOfEncyclopedia);
