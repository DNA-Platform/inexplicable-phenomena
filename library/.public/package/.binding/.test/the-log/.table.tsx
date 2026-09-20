import { $Chapter, Heading, Section, TableOfContents, Title, book, chapter as Chapter } from '@dna-platform/public';
import { $ } from '@dna-platform/chemistry';
import { Option } from '@dna-platform/public/application';

// THE MENTION BOUND THROUGH A LOCAL. The compiler reads what `Book` is bound to — `$(book)`, and
// so `book` — not what it is called. Doug, 2026-09-19: "Book = $(book)."
const Book = $(book);

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Chapter>Entries</Chapter></Option>
                    <Chapter print={false}>The Log</Chapter>
                    <Chapter print={false}>Synopsis</Chapter>
                    <Chapter print={false}>Table of Contents</Chapter>
                </Section>
                <Section>
                    <Heading>What the log has written</Heading>
                    <Option><Book>[[ The Library ]]*</Book></Option>
                    <Option><Book>[[ Some Projects ]]*</Book></Option>
                    <Option><Book>[[ A Persona ]]*</Book></Option>
                </Section>
                <Section>
                    <Heading>What stands under the log</Heading>
                    <Option><Chapter>[[ A Persona ]]( A Persona / Synopsis )</Chapter>&nbsp;<Book>[[ ]]( A Persona )**</Book></Option>
                </Section>
            </TableOfContents>
        );
    }
}
