import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';
import { BookLink } from '../.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Order of article elements</Heading>
            <Paragraph>A <BookLink>[simple article](https://en.wikipedia.org/wiki/Wikipedia:Stub#Creating_and_improving_a_stub_article)</BookLink> should have, at least, (a) a lead section and (b) references. The following list includes additional standardized sections in an article. A complete article need not have all, or even most, of these elements.</Paragraph>
            <Paragraph>Some elements also appear in sections. The order of elements after a section heading is the same as it would have been if the elements were placed before the lead.</Paragraph>
            <List>
                - Before the article content
                - Short description
                - &#123;&#123;DISPLAYTITLE&#125;&#125;, &#123;&#123;Lowercase title&#125;&#125;, &#123;&#123;Italic title&#125;&#125;, &#123;&#123;Italic disambiguation&#125;&#125; (some of these may also be placed before the infobox or after the infobox). See complete list at :Category:Correct title templates.
                - Hatnotes
                - &#123;&#123;Featured list&#125;&#125;, &#123;&#123;Featured article&#125;&#125; and &#123;&#123;Good article&#125;&#125; (where appropriate for article status)
                - Deletion or protection tags (CSD, PROD, AFD, PP notices)
                - Maintenance, cleanup, and dispute tags
                - Templates relating to English variety and date format, citation style (&#123;&#123;Use list-defined references&#125;&#125;, &#123;&#123;Use shortened footnotes&#125;&#125;), &#123;&#123;CS1 config&#125;&#125; and &#123;&#123;Force cite load&#125;&#125;
                - Infoboxes
                - Language maintenance templates
                - Images
                - Navigation header templates (sidebar templates)
                - Article content
                - Lead section (also called the introduction)
                - Table of contents
                - Body (see below for specialized layout)
                - Appendices
                - Works or publications (for biographies only)
                - See also
                - Notes and references (this can be two sections in some citation systems)
                - &#123;&#123;Duplicated citations&#125;&#125;
                - Further reading
                - External links
                - End matter
                - Succession boxes and geography boxes
                - Other navigation footer templates (navboxes)
                - &#123;&#123;Portal bar&#125;&#125; (or &#123;&#123;Subject bar&#125;&#125;)
                - &#123;&#123;Taxonbar&#125;&#125;
                - Authority control templates
                - Geographical coordinates (if not in the infobox) or &#123;&#123;coord missing&#125;&#125;
                - Defaultsort
                - Categories
                - or &#123;&#123;Uncategorized&#125;&#125; (These can alternatively be placed with other maintenance templates before the article content)
                - Stub templates (follow WP:STUBSPACING)
            </List>
        </Section>
    </Chapter>,
    Chapter
);
