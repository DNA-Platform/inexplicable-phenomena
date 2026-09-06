import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Formatting</Heading>
        </Section>
        <Section>
            <Heading>Images</Heading>
            <Paragraph>
                Each image should ideally be located in the section to which it is most relevant, and most should carry an explanatory caption.
                Try to harmonize the sizes of images on a given page in order to maintain visual coherence.
            </Paragraph>
            <Paragraph>
                Avoid article text referring to images as being to the left, right, above or below, because image placement varies with platform and screen size, and is meaningless to people using screen readers; instead, use captions to identify images.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Horizontal rule</Heading>
            <Paragraph>
                Horizontal rules are sometimes used in some special circumstances, such as inside template derivatives, but not in regular article prose.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Collapsible content</Heading>
            <Paragraph>
                Limit the use of collapsible templates in articles.
                That said, they can be useful in talk pages.
            </Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
