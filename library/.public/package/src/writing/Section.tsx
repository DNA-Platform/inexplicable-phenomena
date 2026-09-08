import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing$, $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue } from '@/reference/Catalogue';
import { parser } from '@/utilities/Parser';
import { $$Paragraph, $Paragraph$, $TypeOfParagraph } from './Paragraph';
import { $TypeOfHeading, Heading as heading } from './Heading';
import { $TypeOfReference, ReferenceSpecification } from '@/reference/Reference';
import { $Type } from './Type';

export interface $Section$ extends $Composition$ {
    heading(): $Writing$ | undefined;
}

export class $Section extends $Composition implements $Section$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    override reading(): $Block { return reflection.wrapped(this); }

    override print(content: ReactNode): ReactNode {
        return <section className={this.className}>{content}</section>;
    }

    $Section(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfSection, '!')));
        const Representation = $($$Paragraph);
        for (const written of this.searchFor($TypeOfParagraph))
            written.mention ??= $<$$Paragraph>(<Representation />, written);
    }
}

export interface $$Section$ extends $Paragraph$ { }

export class $$Section extends $Catalogue implements $$Section$ {
    $$Section(block: $Block) {
        super.$Catalogue($check(block, $Block).concat($check($TypeOfParagraph, '!')).concat($check($TypeOf$Section, '!')));
    }
}

export class $TypeOfSection extends $Type {
    override name = 'Section';
    protected override specification: Specification<$Writing> = new SectionSpecification();

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Section = $(written);

        return [$<$Section>(<Section>{parser.elements(tokens)}</Section>)];
    }

    override below(): new() => $TypeOfParagraph { return $TypeOfParagraph; }
}

export class $TypeOf$Section extends $Type {
    override name = '$Section';
    protected override specification: Specification<$Writing> = new $SectionSpecification();
}

export class $SectionSpecification extends WritingSpecification {
}

export class SectionSpecification extends WritingSpecification {
    // A RULE READS WHAT IS WRITTEN. Asking for the parts would run the parser, and the
    // parser answers what is asked for, when it is asked for — never on a rule's behalf.
    // So the demand is the one the reading can meet: a heading is held, or something is
    // held to read one out of.
    @specify('a section opens with its heading')
    $opensWithHeading(writing: $Writing): void {
        $check(this.composed(writing).some(part => reflection.is(part, $TypeOfHeading))
            || parser.tokens(writing).length > 0,
            'a section opens with its heading, and this one opens without one');
    }

    // THE READING, NOT THE WRITING. A section states that it opens with a heading;
    // a section written as prose holds none. Rather than refuse it, the section reads
    // one out of what it already holds — the opening sentence, elided — and answers it
    // FIRST among its parts. Nothing is consumed: the paragraph stands whole beneath.
    override supplies(writing: $Writing, parts: $Writing[]): $Writing[] {
        if (parts.some(part => reflection.is(part, $TypeOfHeading))) return parts;
        const opening = parts[0];
        if (opening === undefined) return parts;
        const said = parser.sentences(parser.tokens(opening))[0];
        if (said === undefined) return parts;
        const opened = parser.text(said).trim();
        if (opened === '') return parts;
        const Heading = $(heading);
        // ELIDED ONLY IF IT WAS CUT. A first sentence short enough to stand as a title
        // stands as one; a long one is pumped off at its measure and says so with an
        // ellipsis. The measure is a proxy and flagged for Doug.
        const measure = 60;
        const title = opened.length > measure ? opened.slice(0, measure).trimEnd() + '…' : opened;

        return [$<$Writing>(<Heading>{title}</Heading>), ...parts];
    }

}

export const Section = $($Section);
const written = Section;
export const section = $($$Section);
export const TypeOfSection = $($TypeOfSection);
export const TypeOf$Section = $($TypeOf$Section);
