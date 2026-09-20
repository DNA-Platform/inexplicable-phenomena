import { $ } from '@dna-platform/chemistry';
import { Document, Heading, Item, List, Paragraph, Section } from '@dna-platform/public';
import { $Article } from '@dna-platform/public/encyclopedia';
import { BookLink } from '../.book';

export default class $SpecializedLayout extends $Article {
    print() {
        return (
            <Document>
                <Section>
                <Heading>Specialized layout</Heading>
                <Paragraph>
                    <BookLink>[Stand-alone lists](https://en.wikipedia.org/wiki/Wikipedia:Stand-alone_lists)</BookLink> and <BookLink>[talk pages](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink> have their own layout designs.
                </Paragraph>
                <Paragraph>
                    Certain topics have Manual of Style pages that provide layout advice, including:
                </Paragraph>
                <List>
                    <Item><BookLink>[Chemistry](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Chemistry#Article_types)</BookLink></Item>
                    <Item><BookLink>[Film](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Film#Primary_content)</BookLink></Item>
                    <Item><BookLink>[Medicine](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Medicine-related_articles#Content_sections)</BookLink>, for articles on treatments, procedures, medical products, fields of medicine, and other concepts</Item>
                    <Item><BookLink>[Television](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Television)</BookLink></Item>
                    <Item><BookLink>[Video games](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Video_games#Layout)</BookLink></Item>
                </List>
                <Paragraph>
                    Some WikiProjects have <BookLink>[advice pages](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Council/Guide#Advice_pages)</BookLink> that include layout recommendations: see <BookLink>[Category:WikiProject style advice](https://en.wikipedia.org/wiki/Category:WikiProject_style_advice)</BookLink>.
                </Paragraph>
                </Section>
            </Document>
        );
    }
}
