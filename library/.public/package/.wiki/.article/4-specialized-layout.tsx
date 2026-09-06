import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Specialized layout</Heading>
            <Paragraph>
                Stand-alone lists and talk pages have their own layout designs.
                Certain topics have Manual of Style pages that provide layout advice.
            </Paragraph>
            <List>
                - Chemistry
                - Film
                - Medicine, for articles on treatments, procedures, medical products, fields of medicine, and other concepts
                - Television
                - Video games
            </List>
            <Paragraph>Some WikiProjects have advice pages that include layout recommendations.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
