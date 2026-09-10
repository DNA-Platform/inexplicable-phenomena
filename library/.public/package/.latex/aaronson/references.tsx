// EACH ENTRY DENOTES ITS OWN PLACE. A <PageFold> gives the paragraph a key, so a citation
// anywhere in the paper reaches it with markdown's own syntax: <Citation>[1](cook)</Citation>.
// The entry keeps its <Reference> too — it is both a target and a link to the paper it names.
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, PageFold, Paragraph, Reference, References, Section } from '@dna-platform/public';

export default class $References extends $Chapter {
    view() {
        return (
            <References>
                <Section>
                    <Heading>References</Heading>
                    <Paragraph>Cook, S. A. The complexity of theorem-proving procedures. STOC, 1971.<Reference>https://dl.acm.org/doi/10.1145/800157.805047</Reference><PageFold>cook</PageFold></Paragraph>
                    <Paragraph>Hartmanis, J. and Hopcroft, J. E. Independence results in computer science. SIGACT News, 1976.<Reference>https://dl.acm.org/doi/10.1145/1008304.1008305</Reference><PageFold>hartmanis</PageFold></Paragraph>
                    <Paragraph>Baker, T., Gill, J. and Solovay, R. Relativizations of the P =? NP question. SIAM Journal on Computing, 1975.<Reference>https://epubs.siam.org/doi/10.1137/0204037</Reference><PageFold>baker</PageFold></Paragraph>
                    <Paragraph>Razborov, A. A. and Rudich, S. Natural proofs. Journal of Computer and System Sciences, 1997.<Reference>https://www.sciencedirect.com/science/article/pii/S002200009791494X</Reference><PageFold>razborov</PageFold></Paragraph>
                    <Paragraph>Aaronson, S. and Wigderson, A. Algebrization: a new barrier in complexity theory. STOC, 2008.<Reference>https://dl.acm.org/doi/10.1145/1374376.1374481</Reference><PageFold>algebrization</PageFold></Paragraph>
                    <Paragraph>Williams, R. Non-uniform ACC circuit lower bounds. CCC, 2011.<Reference>https://ieeexplore.ieee.org/document/5959814</Reference><PageFold>williams</PageFold></Paragraph>
                    <Paragraph>Mulmuley, K. and Sohoni, M. Geometric complexity theory I. SIAM Journal on Computing, 2001.<Reference>https://epubs.siam.org/doi/10.1137/S009753970038715X</Reference><PageFold>gct</PageFold></Paragraph>
                </Section>
            </References>
        );
    }
}
