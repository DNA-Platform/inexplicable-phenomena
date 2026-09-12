import { $ } from '@dna-platform/chemistry';
import { Heading, List, Paragraph, Section } from '@dna-platform/public';
import $Chapter from './.chapter';
import Document from './.document';
import { BookLink, OutwardLink } from '../.document';

export default class $TheAppendices extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>See also</Heading>
                    <List>
                        - <BookLink>[Wikipedia:Guide to layout](https://en.wikipedia.org/wiki/Wikipedia:Guide_to_layout)</BookLink>
                        - <BookLink>[Wikipedia:Manual of Style/Lead section](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Lead_section)</BookLink>
                        - <BookLink>[Wikipedia:Manual of Style/Accessibility](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility)</BookLink>
                        - <BookLink>[Wikipedia:Manual of Style/Linking](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking)</BookLink>
                        - <BookLink>[Wikipedia:Article size](https://en.wikipedia.org/wiki/Wikipedia:Article_size)</BookLink>
                        - <BookLink>[Wikipedia:Summary style](https://en.wikipedia.org/wiki/Wikipedia:Summary_style)</BookLink>
                        - <BookLink>[Wikipedia:Stand-alone lists](https://en.wikipedia.org/wiki/Wikipedia:Stand-alone_lists)</BookLink>
                        - <BookLink>[Wikipedia:Template index/Cleanup](https://en.wikipedia.org/wiki/Wikipedia:Template_index/Cleanup)</BookLink>
                    </List>
                </Section>
                <Section>
                    <Heading>Notes</Heading>
                    <Paragraph>
                        The order of sections given here is the order the community settled on rather than a rule anyone derived.
                        Where a guideline and a template disagree about placement, the guideline is the one that was discussed.
                        A section that an article does not need is simply absent; nothing here asks for an empty heading.
                    </Paragraph>
                    <Paragraph>
                        Editors working on very short articles should read this page as a description of what a long article grows into,
                        not as a checklist to satisfy before saving.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>References</Heading>
                    <List>
                        - <OutwardLink>[Wikipedia:Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</OutwardLink>, the parent guideline this page belongs to.
                        - <OutwardLink>[Help:Section](https://en.wikipedia.org/wiki/Help:Section)</OutwardLink>, on how headings become sections and how the software numbers them.
                        - <OutwardLink>[Help:Editing](https://en.wikipedia.org/wiki/Help:Editing)</OutwardLink>, on the markup this page assumes a reader already writes.
                        - <OutwardLink>[Wikipedia:Citing sources](https://en.wikipedia.org/wiki/Wikipedia:Citing_sources)</OutwardLink>, on the appendix this page places last but names first.
                    </List>
                </Section>
            </Document>
        );
    }
}
