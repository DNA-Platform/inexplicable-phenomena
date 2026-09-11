import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import { Navbox } from '@dna-platform/public/encyclopedia';
import { BookLink } from '../.document';
import Document from './.document';

export default class $ExternalLinks extends $Chapter {
    view() {
        return (
            <Document>
                <Section>
                    <Heading>External links</Heading>
                </Section>
                <Navbox>
                    <Heading>Alan Turing</Heading>
                    <Section>
                        <Heading>Works</Heading>
                        <Paragraph>
                            <BookLink>[On Computable Numbers](https://en.wikipedia.org/wiki/Turing%27s_proof)</BookLink>
                            <BookLink>[Systems of Logic Based on Ordinals](https://en.wikipedia.org/wiki/Systems_of_Logic_Based_on_Ordinals)</BookLink>
                            <BookLink>[Computing Machinery and Intelligence](https://en.wikipedia.org/wiki/Computing_Machinery_and_Intelligence)</BookLink>
                            <BookLink>[The Chemical Basis of Morphogenesis](https://en.wikipedia.org/wiki/The_Chemical_Basis_of_Morphogenesis)</BookLink>
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>Concepts</Heading>
                        <Paragraph>
                            <BookLink>[Turing machine](https://en.wikipedia.org/wiki/Turing_machine)</BookLink>
                            <BookLink>[Turing test](https://en.wikipedia.org/wiki/Turing_test)</BookLink>
                            <BookLink>[Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness)</BookLink>
                            <BookLink>[Church–Turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)</BookLink>
                            <BookLink>[Halting problem](https://en.wikipedia.org/wiki/Halting_problem)</BookLink>
                            <BookLink>[Turing reduction](https://en.wikipedia.org/wiki/Turing_reduction)</BookLink>
                            <BookLink>[Turing degree](https://en.wikipedia.org/wiki/Turing_degree)</BookLink>
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>Related</Heading>
                        <Paragraph>
                            <BookLink>[Bletchley Park](https://en.wikipedia.org/wiki/Bletchley_Park)</BookLink>
                            <BookLink>[Enigma machine](https://en.wikipedia.org/wiki/Enigma_machine)</BookLink>
                            <BookLink>[Bombe](https://en.wikipedia.org/wiki/Bombe)</BookLink>
                            <BookLink>[Turing Award](https://en.wikipedia.org/wiki/Turing_Award)</BookLink>
                            <BookLink>[Alan Turing Institute](https://en.wikipedia.org/wiki/Alan_Turing_Institute)</BookLink>
                        </Paragraph>
                    </Section>
                </Navbox>
            </Document>
        );
    }
}
