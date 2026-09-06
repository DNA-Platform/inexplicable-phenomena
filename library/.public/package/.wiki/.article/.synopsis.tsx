import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Synopsis } from '@dna-platform/public';
import { BookLink } from '../.chapter';

export default $(
    <Synopsis print>
        <Section>
            <Heading>Style guide which presents the typical layout of Wikipedia articles</Heading>
            <Paragraph>
                This guide presents the typical layout of Wikipedia articles, including the sections an article usually has, ordering of sections, and formatting styles for various elements of an article.
                For advice on the use of wiki markup, see <BookLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</BookLink>; for guidance on writing style, see <BookLink>[Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>.
            </Paragraph>
        </Section>
    </Synopsis>,
    Synopsis
);
