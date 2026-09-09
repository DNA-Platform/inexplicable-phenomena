import { $ } from '@dna-platform/chemistry';
import { Citation, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default $(
    <Document>
        <Section>
            <Heading>Beliefs About P = NP</Heading>
            <Paragraph>Just as Hilbert’s question turned out to have a negative answer, so too in this case, most computer scientists conjecture that P ̸= NP: that there exist rapidly checkable problems that aren’t rapidly solvable, and for which brute-force search is close to the best we can do. This is not a unanimous opinion. At least one famous computer scientist, Donald Knuth [155], has professed a belief that P = NP, while another, Richard Lipton [175], professes agnosticism. Also, in a poll of mathematicians and theoretical computer scientists conducted by William Gasarch [105] in 2002, there were 61 respondents who said P ̸= NP, but also 9 who said P = NP. (In a followup poll that Gasarch [106] conducted in 2012, there were 126 respondents who said P ̸= NP, and again 9 who said P = NP.) Admittedly, it can be hard to tell whether declarations that P = NP are meant seriously, or are merely attempts to be contrarian. However, we can surely agree with Knuth and Lipton that we’re far from understanding the limits of efficient computation, and that there are further surprises in store.</Paragraph>
            <Section>
                <Heading>Independent of Set Theory?</Heading>
                <Paragraph>Since the 1970s, there’s been speculation that P ̸= NP might be independent (that is, neither provable nor disprovable) from the standard axiom systems for mathematics, such as Zermelo- Fraenkel set theory. To be clear, this would mean that either<Citation>[2](hartmanis)</Citation></Paragraph>
            </Section>
        </Section>
    </Document>,
    Document
);
