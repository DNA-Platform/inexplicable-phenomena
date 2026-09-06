import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Order of article elements</Heading>
            <Paragraph>
                A simple article should have, at least, a lead section and references.
                The following list includes additional standardized sections in an article.
                A complete article need not have all, or even most, of these elements.
            </Paragraph>
            <Paragraph>
                Some elements also appear in sections.
                The order of elements after a section heading is the same as it would have been if the elements were placed before the lead.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Before the article content</Heading>
            <List>
                - Short description
                - Hatnotes
                - Deletion or protection tags
                - Maintenance, cleanup, and dispute tags
                - Templates relating to English variety and date format, and citation style
                - Infoboxes
                - Language maintenance templates
                - Images
                - Navigation header templates
            </List>
        </Section>
        <Section>
            <Heading>Article content</Heading>
            <List>
                - Lead section, also called the introduction
                - Table of contents
                - Body
            </List>
        </Section>
        <Section>
            <Heading>Appendices</Heading>
            <List>
                - Works or publications, for biographies only
                - See also
                - Notes and references
                - Further reading
                - External links
            </List>
        </Section>
        <Section>
            <Heading>End matter</Heading>
            <List>
                - Succession boxes and geography boxes
                - Other navigation footer templates
                - Authority control templates
                - Geographical coordinates, if not in the infobox
                - Defaultsort
                - Categories
                - Stub templates
            </List>
        </Section>
    </Chapter>,
    Chapter
);
