import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import { OutwardLink } from '../.book';
import { Licence } from './.book';

export default class $TheLicence extends $Chapter {
    view() {
        return (
            <Licence>
                <Section>
                    <Heading>This page is available under the Creative Commons Attribution-ShareAlike License</Heading>
                    <Paragraph>
                        <OutwardLink>[Terms of Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use)</OutwardLink>
                        <OutwardLink>[Privacy Policy](https://foundation.wikimedia.org/wiki/Policy:Privacy_policy)</OutwardLink>
                    </Paragraph>
                </Section>
            </Licence>
        );
    }
}
