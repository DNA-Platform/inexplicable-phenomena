import { Heading, Means, Section } from '@dna-platform/public';

// A RESOURCE OF THE FIRST CHAPTER: the library's name as a link to the library, which every book of
// the test library could wear. Drawn wherever it is used, so it refers and names nothing.
// `RunningHead` is a PROXY NAME, flagged for Doug.
export const RunningHead = () => (
    <Section>
        <Heading><Means>$[ The Library ]</Means></Heading>
    </Section>
);
