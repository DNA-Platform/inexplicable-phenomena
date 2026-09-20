import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Synopsis, Title } from '@dna-platform/public';
import { $PortalChapter as $Chapter } from './.book';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis>
                <Title print={false}>The Free Encyclopedia</Title>
                <Section>
                    <Heading>Wikipedia</Heading>
                    <Paragraph>
                        An encyclopedia written by the people who read it.
                        It holds a book for every subject anyone thought worth one, and each names the subjects it belongs to.
                        Nobody owns a page, so the encyclopedia is authored by the whole of its readership at once.
                    </Paragraph>
                </Section>
            </Synopsis>
        );
    }
}
