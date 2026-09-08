// The bibliography, written with the base's own cataloguing kinds — $References is a chapter of
// $ReferenceCards, and a $Citation elsewhere in the paper MEANS one of these. The number a citation
// draws is its entry's position, read rather than written, so nothing here is numbered by hand.
import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Reference, ReferenceCard, References, Section } from '@dna-platform/public';

export default $(
    <References>
        <Section>
            <Heading>References</Heading>
            <ReferenceCard>
                <Paragraph>Cook, S. A. The complexity of theorem-proving procedures. STOC, 1971.</Paragraph>
                <Reference>https://dl.acm.org/doi/10.1145/800157.805047</Reference>
            </ReferenceCard>
            <ReferenceCard>
                <Paragraph>Hartmanis, J. and Hopcroft, J. E. Independence results in computer science. SIGACT News, 1976.</Paragraph>
                <Reference>https://dl.acm.org/doi/10.1145/1008304.1008305</Reference>
            </ReferenceCard>
        </Section>
    </References>,
    References
);
