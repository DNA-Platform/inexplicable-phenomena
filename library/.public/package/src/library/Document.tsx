import { $, $Block } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { Specification } from '@/utilities/Specification';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Type } from '@/writing/Type';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { $Section, $TypeOfSection } from '@/writing/Section';
import { $Title, $TypeOfTitle } from './Title';

export interface $Document$ extends $Composition$ {
    title(): $Writing | undefined;
}

export class $Document extends $Composition implements $Document$ {
    definition = 'article';
    // A DOCUMENT STANDS FOR THE CHAPTER THAT PRINTS IT, so it is what its title can mean. A book
    // gives each of its chapters a mention; a chapter prints one document, and that document is
    // reached at the same place — so the link a title represents is the document's to answer.
    override get mention(): $Catalogue | undefined { return this._mention ?? reflection.chapter(this)?.mention; }
    // THE HEADING OF ITS FIRST SECTION — Doug, 2026-09-15: "The chapter title IS the heading of its
    // first section PERIOD", with "you should be able to recover a heading". So it reads the PARTS
    // and not the block: a document written as prose has no section written into it, and the one the
    // parse makes carries the heading `supplies` recovered. A cover is the one document that writes
    // its title, and writes chrome before it, so a title of its own answers first.
    title(): $Section | undefined { return this.searchForOne<$Title>($TypeOfTitle) ?? this.searchParts<$Section>($TypeOfSection)[0]; }

    $Document(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfDocument));
    }
}

// A BOND IS FOUND BY THE CLASS'S OWN NAME, so a mention that declares none never runs the one it
// inherits — and a catalogue that never bonds is never parenthetical, which is what makes the
// writing holding it draw as the link.
export class $$Document extends $Catalogue {
    $$Document(block: $Block) {
        super.$Catalogue(block);
    }
}

export class $TypeOfDocument extends $Type {
    protected override specification: Specification<$Writing> = new DocumentSpecification();
}

export class DocumentSpecification extends WritingSpecification { }

export const Document = $($Document);
export const doc = $($$Document);
export const TypeOfDocument = $($TypeOfDocument);
