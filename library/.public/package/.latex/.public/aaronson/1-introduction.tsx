import { $ } from '@dna-platform/chemistry';
import { Citation, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default $(
    <Document>
        <Section>
            <Heading>Introduction</Heading>
            <Paragraph>“Now my general conjecture is as follows: for almost all sufficiently complex types of<Citation>[1](cook)</Citation></Paragraph>
            <Section>
                <Heading>The Importance of P = NP</Heading>
                <Paragraph>Before getting formal, it seems appropriate to say something about the significance of the P = NP question. P = NP, we might say, shares with Hilbert’s original question the character of a “math problem that’s more than a math problem”: a question that reaches inward to ask about mathematical reasoning itself, and also outward to everything from philosophy to natural science to practical computation.</Paragraph>
            </Section>
            <Section>
                <Heading>Objections to P = NP</Heading>
                <Paragraph>After modest exposure to the P = NP problem, some people come up with what they consider an irrefutable objection to its phrasing or importance. Since the same objections tend to recur, in this section I’ll collect the most frequent ones and make some comments about them.</Paragraph>
                <Section>
                    <Heading>The Asymptotic Objection</Heading>
                    <Paragraph>Objection: P = NP talks only about asymptotics—i.e., whether the running time of an algorithm grows polynomially or exponentially with the size n of the question that was asked, as n goes to infinity. It says nothing about the number of steps needed for concrete values of n (say, a thousand or a million), which is all anyone would ever care about in practice.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Polynomial-Time Objection</Heading>
                    <Paragraph>Objection: But why should we draw the border of efficiency at the polynomial functions, as opposed to any other class of functions—for example, functions upper-bounded by n , or functions of the form n (called quasipolynomial functions)?</Paragraph>
                </Section>
                <Section>
                    <Heading>The Kitchen-Sink Objection</Heading>
                    <Paragraph>Objection: P = NP is limited, because it talks only about discrete, deterministic algorithms that find exact solutions in the worst case—and also, because it ignores the possibility of natural processes that might exceed the limits of Turing machines, such as analog computers, biological computers, or quantum computers.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Mathematical Snobbery Objection</Heading>
                    <Paragraph>Objection: P = NP is not a “real” math problem, because it talks about Turing machines, which are arbitrary human creations, rather than about “natural” mathematical objects like integers or manifolds.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Sour Grapes Objection</Heading>
                    <Paragraph>Objection: P = NP is so hard that it’s impossible to make anything resembling progress on it, at least at this stage in human history—and for that reason, it’s unworthy of serious effort or attention. Indeed, we might as well treat such questions as if their answers were formally independent of set theory, as for all we know they are (a possibility discussed further in Section 3.1).</Paragraph>
                </Section>
                <Section>
                    <Heading>The Obviousness Objection</Heading>
                    <Paragraph>Objection: It’s intuitively obvious that P ̸= NP. For that reason, a proof of P ̸= NP—confirming that indeed, we can’t do something that no reasonable person would ever have imagined we could do—gives almost no useful information.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Constructivity Objection</Heading>
                    <Paragraph>Objection: Even if P = NP, the proof could be nonconstructive—in which case it wouldn’t have any of the amazing implications discussed in Section 1.1, because we wouldn’t know the algorithm.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Further Reading</Heading>
                <Paragraph>There were at least four previous major survey articles about P = NP: Michael Sipser’s 1992 “The History and Status of the P versus NP Question” [241]; Stephen Cook’s 2000 “The P versus NP Problem” [74], which was written for the announcement of the Clay Millennium Prize; Avi Wigderson’s 2006 “P, NP, and Mathematics—A Computational Complexity Perspective” [269]; and Eric Allender’s 2009 “A Status Report on the P versus NP Question” [22]. All four are excellent, so it’s only with trepidation that I add another entry to the crowded arena. I hope that, if nothing else, this survey shows how much has continued to occur through 2017. I cover several major topics that either didn’t exist a decade ago, or existed only in much more rudimentary form: for example, the algebrization barrier, “ironic complexity theory” (including Ryan Williams’s NEXP ̸⊂ ACC result), the “chasm at depth three” for the permanent, and the Mulmuley-Sohoni Geometric Complexity Theory program.</Paragraph>
            </Section>
        </Section>
    </Document>,
    Document
);
