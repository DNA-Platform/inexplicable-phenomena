import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Synopsis } from '@dna-platform/public';
import $Chapter from './.chapter';
import { BookLink } from '../.document';
import { Hatnote } from '@dna-platform/public/encyclopedia';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis print>
                <Section>
                    <Heading>Style guide which presents the typical layout of Wikipedia articles</Heading>
                    <Hatnote>
                        This page is about the layout of Wikipedia articles.
                        For the layout of Wikipedia talk pages, see <BookLink>[Wikipedia:Talk page layout](https://en.wikipedia.org/wiki/Wikipedia:Talk_page_layout)</BookLink>.
                    </Hatnote>
                    <Paragraph>
                        This guide presents the typical layout of Wikipedia articles, including the sections an article usually has, ordering of sections, and formatting styles for various elements of an article.
                        For advice on the use of wiki markup, see <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>; for guidance on writing style, see <BookLink>[Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>.
                    </Paragraph>
                </Section>
            </Synopsis>
        );
    }
}
