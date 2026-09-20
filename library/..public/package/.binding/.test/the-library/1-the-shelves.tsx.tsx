import { $, $Block } from '@dna-platform/chemistry';
import { Heading, Reference, Section, book as bookMention, $Writing } from '@dna-platform/public';
import { $Header } from '@dna-platform/public/application';

const Book = $(bookMention);

// A RESOURCE OF THE FIRST CHAPTER, and a masthead every book of the test library could wear: the
// library's name as a link to the library, wherever it is drawn. Compiled once, drawn on every
// page, so its mention of the library is never "here".
export class $Masthead extends $Header {
    $Masthead(block: $Block) {
        super.$Header((block ?? new $Block()).concat(
            $<$Writing>(
                <Section>
                    <Reference>[[ The Library ]]</Reference>
                    <Heading>The Library</Heading>
                </Section>
            ),
            $<$Writing>(<Section><Heading>Elsewhere</Heading><Book>The Library</Book></Section>),
        ));
    }
}

export const Masthead = $($Masthead);
