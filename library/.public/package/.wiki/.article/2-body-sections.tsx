import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';
import { BookLink } from '../.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Body sections</Heading>
            <Paragraph>Articles longer than a <BookLink>[stub](https://en.wikipedia.org/wiki/wp:stub)</BookLink> are generally divided into sections, and sections over a certain length are generally divided into paragraphs: these divisions enhance the readability of the article. Recommended names and orders of section headings may <BookLink>[vary by subject matter](#Specialized_layout)</BookLink>, although articles should still follow good organizational and writing principles regarding sections and paragraphs.</Paragraph>
        </Section>
        <Section>
            <Heading>Headings and sections</Heading>
            <Paragraph>Headings introduce sections and subsections, clarify articles by breaking up text, organize content, and populate the <BookLink>[table of contents](https://en.wikipedia.org/wiki/Help:Section#Table_of_contents_(TOC))</BookLink>. Very short sections and subsections clutter an article with headings and inhibit the flow of the prose. Short paragraphs and single sentences generally do not warrant their own subheadings.</Paragraph>
            <Paragraph>Headings follow a six-level hierarchy, starting at 1 and ending at 6. The level of the heading is defined by the number of equals signs on each side of the title. Heading 1 (= Heading 1 =) is automatically generated as the title of the article, and is never appropriate within the body of an article. Sections start at the second level (== Heading 2 ==), with subsections at the third level (=== Heading 3 ===), and additional levels of subsections at the fourth level (==== Heading 4 ====), fifth level, and sixth level. Sections should be consecutive, such that they do not skip levels from sections to sub-subsections; the exact methodology is part of the <BookLink>[Accessibility](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility)</BookLink> guideline. Between sections, there should be a blank line: multiple blank lines in the edit window create too much white space in the article. There is no need to include a blank line between a heading and sub-heading.</Paragraph>
            <Paragraph>When changing or removing a heading, consider adding an <BookLink>[anchor template](https://en.wikipedia.org/wiki/Template:Anchor)</BookLink> (using <BookLink>[rather than](https://en.wikipedia.org/wiki/WP:ANCHORSUBST)</BookLink> directly) with the original heading name to provide for <BookLink>[incoming external links](https://en.wikipedia.org/wiki/wp:incoming_external_links)</BookLink> and <BookLink>[wikilink](https://en.wikipedia.org/wiki/wp:wikilink)</BookLink>s—see <BookLink>[MOS:RENAMESECTION](https://en.wikipedia.org/wiki/MOS:RENAMESECTION)</BookLink>.</Paragraph>
        </Section>
        <Section>
            <Heading>Section order</Heading>
            <Paragraph>Because of the diversity of subjects it covers, Wikipedia has no general standard or guideline regarding the order of section headings within the body of an article. The usual practice is to order body sections based on the precedent of similar articles. For exceptions, see <BookLink>[Specialized layout](#Specialized_layout)</BookLink> below.</Paragraph>
            <Paragraph>Section order outside of the article body should follow the standard shown above in the <BookLink>[Order of article elements section](#Order_of_article_elements)</BookLink>.</Paragraph>
        </Section>
        <Section>
            <Heading>Section templates and summary style</Heading>
            <Paragraph>When a section is a <BookLink>[summary](https://en.wikipedia.org/wiki/Wikipedia:Summary_style)</BookLink> of another article that provides a full exposition of the section, a link to the other article should appear immediately under the section heading. You can use the &#123;&#123;Main&#125;&#125; template to generate a "Main article" link, in Wikipedia's "<BookLink>[hatnote](https://en.wikipedia.org/wiki/Wikipedia:Hatnote)</BookLink>" style.</Paragraph>
            <Paragraph>If one or more articles provide further information or additional details (rather than a full exposition, see above), links to such articles may be placed immediately after the section heading for that section, provided this does not duplicate a wikilink in the text. These additional links should be grouped along with the template (if there is one), or at the foot of the section that introduces the material for which these templates provide additional information. You can use one of the following templates to generate these links:</Paragraph>
            <Paragraph>For example, to generate a "See also" link to the article on <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>, type, which will generate:</Paragraph>
            <List>
                - &#123;&#123;Further&#125;&#125; generates a "Further information" link
                - &#123;&#123;See also&#125;&#125; generates a "See also" link
            </List>
        </Section>
        <Section>
            <Heading>Paragraphs</Heading>
            <Paragraph>Sections usually consist of paragraphs of running prose, each dealing with a particular point or idea. Single-sentence paragraphs can inhibit the flow of the text; by the same token, long paragraphs become hard to read. Between paragraphs—as between sections—there should be only a blank line. First lines are indented.</Paragraph>
            <Paragraph><BookLink>[Bullet points](https://en.wikipedia.org/wiki/Bullet_(typography)#Bullet_points)</BookLink> should not be used in the lead of an article. They may be used in the body to break up a mass of text, particularly if the topic requires significant effort to comprehend. Sometimes, it may be preferable to use bullet points instead of having a series of very short paragraphs. Bulleted lists are typical in the reference, further reading, and external links sections towards the end of the article. Bullet points are usually not separated by blank lines, as that causes an accessibility issue (see <BookLink>[MOS:LISTGAP](https://en.wikipedia.org/wiki/MOS:LISTGAP)</BookLink> for ways to create multiple paragraphs within list items that do not cause this issue).</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
