// CREATED 2026-09-08 — Sprint 53 scaffold. A placeholder chapter so the book stands; REPLACED by the paper's own sections when Doug supplies the source. Shows the authoring surface the article expects: sections with headings, prose with inline <Math>, display <Equation>, a <Theorem>.
import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Introduction</Heading>
            <Paragraph>This chapter stands in for the paper until its source is supplied. The P versus NP question asks whether every problem whose solutions can be verified in polynomial time can also be solved in polynomial time.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
