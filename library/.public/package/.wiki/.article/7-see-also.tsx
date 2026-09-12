import { $ } from '@dna-platform/chemistry';
import { Document, Heading, Item, List, Paragraph, Section } from '@dna-platform/public';
import { BookLink } from '../.chapter';
import $Chapter from './.chapter';

export default class $SeeAlso extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                <Heading>See also</Heading>
                <List>
                    <Item><BookLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</BookLink></Item>
                    <Item><BookLink>[Wikipedia:Talk page guidelines](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_guidelines)</BookLink> – shows how to use headings on talk pages</Item>
                    <Item><BookLink>[Wikipedia:Talk page layout](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink></Item>
                </List>
                </Section>
            </Document>
        );
    }
}
