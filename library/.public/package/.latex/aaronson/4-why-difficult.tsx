import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Why Is Proving P ̸= NP Difficult?</Heading>
            <Paragraph>Let’s suppose that P ̸= NP. Then given the disarming simplicity of the statement, why is proving it so hard? As mentioned above, complexity theorists have identified three technical barriers, called relativization [38], natural proofs [223], and algebrization [10], that any proof of P ̸= NP will need to overcome. They’ve also shown that it’s possible to surmount each of these barriers, though there are few results that surmount all of them simultaneously. The barriers will be discussed alongside progress toward proving P ̸= NP in Section 6.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
