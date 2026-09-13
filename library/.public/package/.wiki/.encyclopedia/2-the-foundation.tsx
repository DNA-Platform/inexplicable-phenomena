import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Image, Paragraph, Section } from '@dna-platform/public';
import { OutwardLink } from '../.book';
import { Foundation } from './.book';

export default class $TheFoundation extends $Chapter {
    view() {
        return (
            <Foundation>
                <Section>
                    <Image source="https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg" width="42" height="42">Wikimedia</Image>
                    <Heading>Wikipedia is hosted by the Wikimedia Foundation, a non-profit organization that also hosts a range of other projects.</Heading>
                    <Paragraph>
                        <OutwardLink>[You can support our work with a donation.](https://donate.wikimedia.org/)</OutwardLink>
                    </Paragraph>
                </Section>
            </Foundation>
        );
    }
}
