// A BOOK IS MENTIONED WITH `book` AND COMPOSED WITH `Book`, and a table mentions. The structure
// reads the tag name, so the mention is bound to the name it reads.
import { $Chapter, Heading, Section, TableOfContents, Title, book as Book, chapter as Chapter } from '@dna-platform/public';
import { Option } from '@dna-platform/public/application';

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Chapter>The Shelves</Chapter></Option>
                    <Chapter print={false}>The Library</Chapter>
                    <Chapter print={false}>What This Is</Chapter>
                    <Chapter print={false}>Table of Contents</Chapter>
                </Section>
                <Section>
                    <Heading>The Catalogue</Heading>
                    <Option><Book>[[ The Log ]]**</Book></Option>
                    <Option><Book>[[ Some Projects ]]**</Book></Option>
                    <Option><Book>[[ A Paper ]]**</Book></Option>
                </Section>
            </TableOfContents>
        );
    }
}
