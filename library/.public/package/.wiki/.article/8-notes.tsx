import { $ } from '@dna-platform/chemistry';
import { $Chapter, Document, Heading, Paragraph, Quote, Section } from '@dna-platform/public';
import { BookLink } from '../.book';

export default class $Notes extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                <Heading>Notes</Heading>
                <Quote>
                    See also
<BookLink>[Wikipedia:How to edit a page](https://en.wikipedia.org/wiki/Wikipedia:How_to_edit_a_page)</BookLink> · <BookLink>[Wikipedia:Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>
                </Quote>
                </Section>
            </Document>
        );
    }
}
