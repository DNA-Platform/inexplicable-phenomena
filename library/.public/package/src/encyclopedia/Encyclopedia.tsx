// CREATED 2026-09-13 · rating 2. THE ENCYCLOPEDIA'S BOOK, AND IT IS LAYOUT — Doug: "Book is layout.
// Chapters are logical parts." Its body is a place beside the header and the footer: the chapters
// carrying $TypeOfArticle stand in it, in the order they were written, so one formatting context
// holds them all and a format that floats reaches the prose that follows. The apparatus — the cover,
// the synopsis, the table of contents, the footer — carries no such type and draws where it stands.
// ONE WALK OVER ONE LIST: nothing is filtered twice, nothing is held, and no member answers a list.
import { ReactNode } from 'react';
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

        const body = () => {
            if (held.length === 0) return;
            shown.push(<div className="pd-body" key={`body-${shown.length}`}>{held}</div>);
            held = [];
        };

        this.chapters.forEach((chapter, at) => {
            const Chapter = $(chapter);
            if (reflection.is(chapter, $TypeOfArticle)) return void held.push(<Chapter key={at} />);
            body();
            shown.push(<Chapter key={at} />);
        });
        body();

        return <>{this.header()}{shown}{this.footer()}</>;
    }
}

export class $TypeOfEncyclopedia extends $TypeOfBook {
    protected override specification: Specification<$Writing> = new EncyclopediaSpecification();
}

export class EncyclopediaSpecification extends BookSpecification {
}

export const Encyclopedia = $($Encyclopedia);
export const TypeOfEncyclopedia = $($TypeOfEncyclopedia);
