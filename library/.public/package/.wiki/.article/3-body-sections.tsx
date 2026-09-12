import { $ } from '@dna-platform/chemistry';
import { Citation, Document, Heading, Illustration, Italics, Item, List, Paragraph, Section } from '@dna-platform/public';
import { Hatnote } from '@dna-platform/public/encyclopedia';
import { BookLink, OutwardLink } from '../.chapter';
import $Chapter from './.chapter';

export default class $BodySections extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                <Heading>Body sections</Heading>
                <List>
                    <Item><OutwardLink>[MOS:BODY](https://en.wikipedia.org/w/index.php?title=MOS:BODY&redirect=no)</OutwardLink></Item>
                </List>
                <Hatnote>
                    Further information: <BookLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</BookLink> and <BookLink>[Wikipedia:Manual of Style § Article titles, headings, and sections](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Article_titles,_headings,_and_sections)</BookLink>
                </Hatnote>
                <Paragraph>
                    Articles longer than a <BookLink>[stub](https://en.wikipedia.org/wiki/Wikipedia:Stub)</BookLink> are generally divided into sections, and sections over a certain length are generally divided into paragraphs: these divisions enhance the readability of the article. Recommended names and orders of section headings may <BookLink>[vary by subject matter](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Specialized_layout)</BookLink>, although articles should still follow good organizational and writing principles regarding sections and paragraphs.
                </Paragraph>
                <Section>
                    <Heading>Headings and sections</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:SUBSECTION](https://en.wikipedia.org/w/index.php?title=MOS:SUBSECTION&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:OVERSECTION](https://en.wikipedia.org/w/index.php?title=MOS:OVERSECTION&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        Further information: <BookLink>[Wikipedia:Manual of Style § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Section_headings)</BookLink>
                    </Hatnote>
                    <Illustration source="https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Wikipedia_layout_sample_bodies.png/250px-Wikipedia_layout_sample_bodies.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="200" height="250">
                        Body sections appear after the lead and table of contents (click on image for larger view).
                    </Illustration>
                    <Paragraph>
                        Headings introduce sections and subsections, clarify articles by breaking up text, organize content, and populate the <BookLink>[table of contents](https://en.wikipedia.org/wiki/Help:Section#Table_of_contents_%28TOC%29)</BookLink>. Very short sections and subsections clutter an article with headings and inhibit the flow of the prose. Short paragraphs and single sentences generally do not warrant their own subheadings.
                    </Paragraph>
                    <Paragraph>
                        Headings follow a six-level hierarchy, starting at 1 and ending at 6. The level of the heading is defined by the number of equals signs on each side of the title. Heading 1 (= Heading 1 =) is automatically generated as the title of the article, and is never appropriate within the body of an article. Sections start at the second level (== Heading 2 ==), with subsections at the third level (=== Heading 3 ===), and additional levels of subsections at the fourth level (==== Heading 4 ====), fifth level, and sixth level. Sections should be consecutive, such that they do not skip levels from sections to sub-subsections; the exact methodology is part of the <BookLink>[Accessibility](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility)</BookLink> guideline.<Citation>[h](cite_note-16)</Citation> Between sections, there should be a <Italics>single</Italics> blank line: multiple blank lines in the edit window create too much white space in the article. There is no need to include a blank line between a heading and sub-heading.
                    </Paragraph>
                    <Paragraph>
                        When changing or removing a heading, consider adding an <BookLink>[anchor template](https://en.wikipedia.org/wiki/Template:Anchor)</BookLink> (using &#123;&#123;subst:anchor&#125;&#125; <BookLink>[rather than](https://en.wikipedia.org/wiki/Wikipedia:ANCHORSUBST)</BookLink> &#123;&#123;anchor&#125;&#125; directly) with the original heading name to provide for <BookLink>[incoming external links](https://en.wikipedia.org/wiki/Wikipedia:Incoming_external_links)</BookLink> and <BookLink>[wikilinks](https://en.wikipedia.org/wiki/Wikipedia:Wikilink)</BookLink>—see <BookLink>[MOS:RENAMESECTION](https://en.wikipedia.org/wiki/MOS:RENAMESECTION)</BookLink>.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Section order</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:SNO](https://en.wikipedia.org/w/index.php?title=MOS:SNO&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        See also: <BookLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</BookLink>, <BookLink>[WP:Manual of Style/Accessibility § Headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility#Headings)</BookLink>, <BookLink>[WP:Manual of Style § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Section_headings)</BookLink>, and <BookLink>[WP:Manual of Style/Capital letters § Section headings](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Capital_letters#Section_headings)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        Because of the diversity of subjects it covers, Wikipedia has no general standard or guideline regarding the order of section headings within the body of an article. The usual practice is to order body sections based on the precedent of similar articles. For exceptions, see <BookLink>[Specialized layout](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Specialized_layout)</BookLink> below.
                    </Paragraph>
                    <Paragraph>
                        Section order outside of the article body should follow the standard shown above in the <BookLink>[Order of article elements section](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#Order_of_article_elements)</BookLink>.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>Section templates and summary style</Heading>
                    <Hatnote>
                        Further information: <BookLink>[WP:SUMMARYHATNOTE](https://en.wikipedia.org/wiki/Wikipedia:SUMMARYHATNOTE)</BookLink> and <BookLink>[Wikipedia:Summary style § Templates](https://en.wikipedia.org/wiki/Wikipedia:Summary_style#Templates)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        When a section is a <BookLink>[summary](https://en.wikipedia.org/wiki/Wikipedia:Summary_style)</BookLink> of another article that provides a full exposition of the section, a link to the other article should appear immediately under the section heading. You can use the &#123;&#123;<BookLink>[Main](https://en.wikipedia.org/wiki/Template:Main)</BookLink>&#125;&#125; template to generate a "Main article" link, in Wikipedia's "<BookLink>[hatnote](https://en.wikipedia.org/wiki/Wikipedia:Hatnote)</BookLink>" style.
                    </Paragraph>
                    <Paragraph>
                        If one or more articles provide further information or additional details (rather than a full exposition, see above), links to such articles may be placed immediately after the section heading for that section, provided this does not duplicate a wikilink in the text. These additional links should be grouped along with the &#123;&#123;Main&#125;&#125; template (if there is one), or at the foot of the section that introduces the material for which these templates provide additional information. You can use one of the following templates to generate these links:
                    </Paragraph>
                    <List>
                        <Item>&#123;&#123;<BookLink>[Further](https://en.wikipedia.org/wiki/Template:Further)</BookLink>&#125;&#125; – generates a "Further information" link</Item>
                        <Item>&#123;&#123;<BookLink>[See also](https://en.wikipedia.org/wiki/Template:See_also)</BookLink>&#125;&#125; – generates a "See also" link</Item>
                    </List>
                    <Paragraph>
                        For example, to generate a "See also" link to the article on <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>, type &#123;&#123;<BookLink>[See also](https://en.wikipedia.org/wiki/Template:See_also)</BookLink>|Help:Editing&#125;&#125;, which will generate:
                    </Paragraph>
                    <Hatnote>
                        See also: <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>
                    </Hatnote>
                </Section>
                <Section>
                    <Heading>Paragraphs</Heading>
                    <List>
                        <Item><OutwardLink>[MOS:PARA](https://en.wikipedia.org/w/index.php?title=MOS:PARA&redirect=no)</OutwardLink></Item>
                        <Item><OutwardLink>[MOS:LINEBREAKS](https://en.wikipedia.org/w/index.php?title=MOS:LINEBREAKS&redirect=no)</OutwardLink></Item>
                    </List>
                    <Hatnote>
                        "MOS:LINEBREAKS" redirects here. For preventing line breaks, see <BookLink>[Wikipedia:Manual of Style § Controlling line breaks](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style#Controlling_line_breaks)</BookLink>.
                    </Hatnote>
                    <Hatnote>
                        See also: <BookLink>[WP:Writing better articles § Paragraphs](https://en.wikipedia.org/wiki/Wikipedia:Writing_better_articles#Paragraphs)</BookLink>, <BookLink>[Help:Wikitext § Line breaks](https://en.wikipedia.org/wiki/Help:Wikitext#Line_breaks)</BookLink>, and <BookLink>[WP:Manual of Style/Accessibility § Indentation](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility#Indentation)</BookLink>
                    </Hatnote>
                    <Paragraph>
                        Sections usually consist of paragraphs of running prose, each dealing with a particular point or idea. Single-sentence paragraphs can inhibit the flow of the text; by the same token, long paragraphs become hard to read. Between paragraphs—as between sections—there should be only a <Italics>single</Italics> blank line. First lines are <Italics>not</Italics> indented.
                    </Paragraph>
                    <Paragraph>
                        <BookLink>[Bullet points](https://en.wikipedia.org/wiki/Bullet_%28typography%29#Bullet_points)</BookLink> should not be used in the lead of an article. They may be used in the body to break up a mass of text, particularly if the topic requires significant effort to comprehend. Sometimes, it may be preferable to use bullet points instead of having a series of very short paragraphs. Bulleted lists are typical in the reference, further reading, and external links sections towards the end of the article. Bullet points are usually not separated by blank lines, as that causes an accessibility issue (see <BookLink>[MOS:LISTGAP](https://en.wikipedia.org/wiki/MOS:LISTGAP)</BookLink> for ways to create multiple paragraphs within list items that do not cause this issue).
                    </Paragraph>
                </Section>
                </Section>
            </Document>
        );
    }
}
