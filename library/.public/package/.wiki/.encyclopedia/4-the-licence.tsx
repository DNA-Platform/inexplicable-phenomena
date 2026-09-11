import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import { OutwardLink } from '../.document';
import { Licence } from './.document';

export default class $TheLicence extends $Chapter {
    print() {
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
