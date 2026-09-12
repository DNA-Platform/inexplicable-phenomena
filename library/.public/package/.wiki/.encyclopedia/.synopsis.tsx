import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Synopsis } from '@dna-platform/public';
import $Chapter from './.chapter';

export default class $Synopsis extends $Chapter {
    view() {
        return (
            <Synopsis>
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
