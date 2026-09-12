import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import $Chapter from './.chapter';
import { OutwardLink } from '../.chapter';
import { Foundation, Logo } from './.chapter';

export default class $TheFoundation extends $Chapter {
    view() {
        return (
            <Foundation>
                <Section>
                    <Logo src="https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg" width="42">Wikimedia</Logo>
                    <Heading>Wikipedia is hosted by the Wikimedia Foundation, a non-profit organization that also hosts a range of other projects.</Heading>
                    <Paragraph>
                        <OutwardLink>[You can support our work with a donation.](https://donate.wikimedia.org/)</OutwardLink>
                    </Paragraph>
                </Section>
            </Foundation>
        );
    }
}
