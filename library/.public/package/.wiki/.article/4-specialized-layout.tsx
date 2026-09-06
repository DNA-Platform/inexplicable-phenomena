import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';
import { BookLink } from '../.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Specialized layout</Heading>
            <Paragraph><BookLink>[Stand-alone lists](https://en.wikipedia.org/wiki/Wikipedia:Stand-alone_lists)</BookLink> and <BookLink>[talk pages](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink> have their own layout designs.</Paragraph>
            <Paragraph>Certain topics have Manual of Style pages that provide layout advice, including:</Paragraph>
            <Paragraph>Some WikiProjects have <BookLink>[advice pages](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Council/Guide#Advice_pages)</BookLink> that include layout recommendations: see <BookLink>[:Category:WikiProject style advice](https://en.wikipedia.org/wiki/:Category:WikiProject_style_advice)</BookLink>.</Paragraph>
            <List>
                - Chemistry
                - Film
                - Medicine, for articles on treatments, procedures, medical products, fields of medicine, and other concepts
                - Television
                - Video games
            </List>
        </Section>
    </Chapter>,
    Chapter
);
