import { $ } from '@dna-platform/chemistry';
import { Citation, Heading, Paragraph, Section } from '@dna-platform/public';
import $Chapter from './.chapter';
import Document from './.document';

export default class $Beliefs extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>Beliefs About P = NP</Heading>
                    <Paragraph>Just as Hilbert’s question turned out to have a negative answer, so too in this case, most computer scientists conjecture that P ≠ NP: that there exist rapidly checkable problems that aren’t rapidly solvable, and for which brute-force search is close to the best we can do. This is not a unanimous opinion. At least one famous computer scientist, Donald Knuth <Citation>knuth2014</Citation>, has professed a belief that P = NP, while another, Richard Lipton <Citation>lipton2014</Citation>, professes agnosticism. Also, in a poll of mathematicians and theoretical computer scientists conducted by William Gasarch <Citation>gasarch2002</Citation> in 2002, there were 61 respondents who said P ≠ NP, but also 9 who said P = NP. (In a followup poll that Gasarch <Citation>gasarch2012</Citation> conducted in 2012, there were 126 respondents who said P ≠ NP, and again 9 who said P = NP.) Admittedly, it can be hard to tell whether declarations that P = NP are meant seriously, or are merely attempts to be contrarian. However, we can surely agree with Knuth and Lipton that we’re far from understanding the limits of efficient computation, and that there are further surprises in store.</Paragraph>
                    <Section>
                        <Heading>Independent of Set Theory?</Heading>
                        <Paragraph>Since the 1970s, there’s been speculation that P ≠ NP might be independent (that is, neither provable nor disprovable) from the standard axiom systems for mathematics, such as Zermelo- Fraenkel set theory. To be clear, this would mean that either <Citation>hartmanis1965</Citation></Paragraph>
                    </Section>
                </Section>
            </Document>
        );
    }
}
