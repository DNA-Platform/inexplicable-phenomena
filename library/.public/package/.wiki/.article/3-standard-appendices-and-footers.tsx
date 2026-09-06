import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Standard appendices and footers</Heading>
            <Paragraph>
                When appendix sections are used, they should appear at the bottom of an article, with level 2 headings, followed by the various footers.
                When it is useful to sub-divide these sections, this should be done using level 3 headings instead of definition list headings, as explained in the accessibility guidelines.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Works or publications</Heading>
            <Paragraph>
                Contents: a bulleted list, usually ordered chronologically, of the works created by the subject of the article.
                Many different headings are used, depending on the subject matter.
                Works is preferred when the list includes items that are not written publications, or if multiple types of works are included.
                Works or Publications should be plural, even if it lists only a single item.
            </Paragraph>
        </Section>
        <Section>
            <Heading>See also</Heading>
            <Paragraph>
                A See also section is a useful way to organize internal links to related or comparable articles and to encourage readers to explore related concepts that may be new to them.
                However, the section itself is not required; many high-quality and comprehensive articles do not have one.
                The section should be a bulleted list, sorted either logically, chronologically, or alphabetically.
            </Paragraph>
            <Paragraph>
                Links in this section should be relevant and limited to a reasonable number.
                Whether a link belongs in the See also section is ultimately a matter of editorial judgment and common sense.
                One purpose of See also links is to enable readers to explore tangentially related topics; however, articles linked should be related to the topic of the article or be in the same defining category.
            </Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
