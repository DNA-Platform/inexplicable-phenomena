import { $Chapter, Heading, Section, TableOfContents, Title, chapter as Chapter } from '@dna-platform/public';
import { Option } from '@dna-platform/public/application';

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Chapter>The Work</Chapter></Option>
                    <Chapter print={false}>Some Projects</Chapter>
                    <Chapter print={false}>What Was Worked On</Chapter>
                    <Chapter print={false}>Table of Contents</Chapter>
                </Section>
            </TableOfContents>
        );
    }
}
