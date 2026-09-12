import { $ } from '@dna-platform/chemistry';
import { Heading, Illustration, Paragraph } from '@dna-platform/public';
import { Infobox, Line, Hatnote } from '@dna-platform/public/encyclopedia';
import { BookLink } from '../.document';
import $Chapter from './.chapter';
import Document from './.document';

export default class $Lead extends $Chapter {
    print() {
        return (
            <Document>

                <Hatnote>
                    This page is about the layout of Wikipedia articles. For the layout of Wikipedia talk pages, see <BookLink>[Wikipedia:Talk page layout](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink>.
                </Hatnote>
                <Illustration source="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Wikipedia_layout_sample_large.png/250px-Wikipedia_layout_sample_large.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="200" height="196">
                    Sample article layout (click on image for larger view)
                </Illustration>
                <Paragraph>
                    This guide presents the typical layout of Wikipedia articles, including the sections an article usually has, ordering of sections, and formatting styles for various elements of an article. For advice on the use of wiki <BookLink>[markup](https://en.wikipedia.org/wiki/Markup_language)</BookLink>, see <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>; for guidance on writing style, see <BookLink>[Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>.
                </Paragraph>
            </Document>
        );
    }
}
