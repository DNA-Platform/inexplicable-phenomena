import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import { OutwardLink } from '../.chapter';
import { Licence } from './.chapter';

export default $(
    <Licence>
        <Section>
            <Heading>This page is available under the Creative Commons Attribution-ShareAlike License</Heading>
            <Paragraph>
                <OutwardLink>[Terms of Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use)</OutwardLink>
                <OutwardLink>[Privacy Policy](https://foundation.wikimedia.org/wiki/Policy:Privacy_policy)</OutwardLink>
            </Paragraph>
        </Section>
    </Licence>,
    Licence
);
