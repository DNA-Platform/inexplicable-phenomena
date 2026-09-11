import { $ } from '@dna-platform/chemistry';
import { $Chapter, Entry, Heading, Reference, References, Section } from '@dna-platform/public';

export default class $References extends $Chapter {
    print() {
        return (
            <References>
                <Section>
                    <Heading>References</Heading>
                    <Entry>algebrization: Aaronson, S. and Wigderson, A. Algebrization: a new barrier in complexity theory. STOC, 2008.<Reference>https://dl.acm.org/doi/10.1145/1374376.1374481</Reference></Entry>
                    <Entry>baker: Baker, T., Gill, J. and Solovay, R. Relativizations of the P =? NP question. SIAM Journal on Computing, 1975.<Reference>https://epubs.siam.org/doi/10.1137/0204037</Reference></Entry>
                    <Entry>cook: Cook, S. A. The complexity of theorem-proving procedures. STOC, 1971.<Reference>https://dl.acm.org/doi/10.1145/800157.805047</Reference></Entry>
                    <Entry>hartmanis: Hartmanis, J. and Hopcroft, J. E. Independence results in computer science. SIGACT News, 1976.<Reference>https://dl.acm.org/doi/10.1145/1008304.1008305</Reference></Entry>
                    <Entry>gct: Mulmuley, K. and Sohoni, M. Geometric complexity theory I. SIAM Journal on Computing, 2001.<Reference>https://epubs.siam.org/doi/10.1137/S009753970038715X</Reference></Entry>
                    <Entry>razborov: Razborov, A. A. and Rudich, S. Natural proofs. Journal of Computer and System Sciences, 1997.<Reference>https://www.sciencedirect.com/science/article/pii/S002200009791494X</Reference></Entry>
                    <Entry>williams: Williams, R. Non-uniform ACC circuit lower bounds. CCC, 2011.<Reference>https://ieeexplore.ieee.org/document/5959814</Reference></Entry>
                </Section>
            </References>
        );
    }
}
