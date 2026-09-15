import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Title } from '@dna-platform/public';
import { $PortalChapter as $Chapter } from './.book';
import { OutwardLink } from '../.book';
import { Licence } from './.book';

export default class $TheLicence extends $Chapter {
    print() {
        return (
            <Licence>
                <Title print={false}>The Licence</Title>
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
