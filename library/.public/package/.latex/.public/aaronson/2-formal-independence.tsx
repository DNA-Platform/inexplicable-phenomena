import { $ } from '@dna-platform/chemistry';
import { Citation, Equation, Heading, Math, Paragraph, Quote, Section } from '@dna-platform/public';
import { Theorem } from '@dna-platform/public/article';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Formal independence</Heading>
            <Paragraph>
                Gödel's second theorem says that a consistent recursively axiomatised theory strong enough for
                arithmetic cannot prove its own consistency. The statement it produces is independent, and the
                independence is exhibited rather than argued.
            </Paragraph>
            <Theorem>
                <Heading>Theorem</Heading>
                <Paragraph>
                    If <Math>{String.raw`\mathsf{ZFC}`}</Math> is consistent then there is a sentence <Math>{String.raw`\varphi`}</Math> such
                    that neither <Math>{String.raw`\varphi`}</Math> nor its negation is provable in <Math>{String.raw`\mathsf{ZFC}`}</Math>.
                </Paragraph>
            </Theorem>
            <Paragraph>
                The complexity-theoretic statements at issue are of a different shape. Writing <Math>{String.raw`\Sigma_1`}</Math> for
                the existential arithmetic sentences, the separation we want is equivalent to
            </Paragraph>
            <Equation>{String.raw`\forall k \; \exists n \; \forall M \; \left[ |M| \le k \Rightarrow M \text{ fails on some } x, |x| = n \right]`}</Equation>
            <Paragraph>
                which is <Math>{String.raw`\Pi_2`}</Math>, and that alone rules out the easiest routes to an independence
                proof<Citation>[2](#References)</Citation>.
            </Paragraph>
            <Quote>
                <Paragraph>
                    It is not that we lack a proof. It is that we lack a reason to believe a proof is unavailable.
                </Paragraph>
            </Quote>
        </Section>
    </Chapter>,
    Chapter
);
