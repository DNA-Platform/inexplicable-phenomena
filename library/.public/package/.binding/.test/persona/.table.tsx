import { $Chapter, Heading, Section, TableOfContents, Title, book as Book, chapter as Chapter } from '@dna-platform/public';
import { Option } from '@dna-platform/public/application';

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Chapter>Who Writes Here</Chapter></Option>
                    <Chapter print={false}>A Persona</Chapter>
                    <Chapter print={false}>Synopsis</Chapter>
                    <Chapter print={false}>Table of Contents</Chapter>
                </Section>
                <Section>
                    <Heading>What the persona has written</Heading>
                    <Option><Book>[[ A Paper ]]*</Book></Option>
                </Section>
            </TableOfContents>
        );
    }
}
