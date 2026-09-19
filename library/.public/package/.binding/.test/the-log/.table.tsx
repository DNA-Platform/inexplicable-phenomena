import { $Chapter, Heading, Section, TableOfContents, Title, book as Book, chapter as Chapter } from '@dna-platform/public';
import { Option } from '@dna-platform/public/application';

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Chapter>Entries</Chapter></Option>
                    <Chapter print={false}>The Log</Chapter>
                    <Chapter print={false}>Who Writes</Chapter>
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
                    <Option><Book>[[ A Persona ]]**</Book></Option>
                </Section>
            </TableOfContents>
        );
    }
}
