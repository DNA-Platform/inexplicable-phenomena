import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Body sections</Heading>
            <Paragraph>
                Articles longer than a stub are generally divided into sections, and sections over a certain length are generally divided into paragraphs: these divisions enhance the readability of the article.
                Recommended names and orders of section headings may vary by subject matter, although articles should still follow good organizational and writing principles regarding sections and paragraphs.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Headings and sections</Heading>
            <Paragraph>
                Headings introduce sections and subsections, clarify articles by breaking up text, organize content, and populate the table of contents.
                Very short sections and subsections clutter an article with headings and inhibit the flow of the prose.
                Short paragraphs and single sentences generally do not warrant their own subheadings.
            </Paragraph>
            <Paragraph>
                Headings follow a six-level hierarchy, starting at 1 and ending at 6.
                Heading 1 is automatically generated as the title of the article, and is never appropriate within the body of an article.
                Sections start at the second level, with subsections at the third level, and additional levels of subsections at the fourth level, fifth level, and sixth level.
                Sections should be consecutive, such that they do not skip levels from sections to sub-subsections.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Section order</Heading>
            <Paragraph>
                Because of the diversity of subjects it covers, Wikipedia has no general standard or guideline regarding the order of section headings within the body of an article.
                The usual practice is to order body sections based on the precedent of similar articles.
                Section order outside of the article body should follow the standard shown above in the Order of article elements section.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Section templates and summary style</Heading>
            <Paragraph>
                When a section is a summary of another article that provides a full exposition of the section, a link to the other article should appear immediately under the section heading.
            </Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
