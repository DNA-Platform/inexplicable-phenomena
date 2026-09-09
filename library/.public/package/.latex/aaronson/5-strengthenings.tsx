import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Strengthenings of the P ≠ NP Conjecture</Heading>
            <Paragraph>The conjecture has stronger forms, and several are easier to work with because they say something quantitative rather than merely qualitative.</Paragraph>
            <Section>
                <Heading>Different Running Times</Heading>
                <Paragraph>The Exponential Time Hypothesis asserts that satisfiability needs genuinely exponential time, and a great deal of fine-grained complexity is built on it.</Paragraph>
            </Section>
            <Section>
                <Heading>Nonuniform Algorithms and Circuits</Heading>
                <Paragraph>Circuit families may differ for each input length, so a circuit lower bound is a stronger statement than a running-time lower bound and is where most progress has been made.</Paragraph>
            </Section>
            <Section>
                <Heading>Average-Case Complexity</Heading>
                <Paragraph>Worst-case hardness says nothing about the instances anyone meets, and cryptography needs hardness on average.</Paragraph>
                <Section>
                    <Heading>Cryptography and One-Way Functions</Heading>
                    <Paragraph>One-way functions are the minimal cryptographic assumption, and their existence implies a form of average-case hardness strictly stronger than a separation.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Randomized Algorithms</Heading>
                <Paragraph>Randomness looked like a genuine resource for two decades and now looks like a convenience.</Paragraph>
                <Section>
                    <Heading>BPP and Derandomization</Heading>
                    <Paragraph>Under plausible circuit lower bounds every randomized polynomial-time algorithm can be derandomized, which is the clearest case of hardness buying an algorithm.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Quantum Algorithms</Heading>
                <Paragraph>Quantum computers factor efficiently and are not believed to solve NP-complete problems, so they move the boundary without erasing it.</Paragraph>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
