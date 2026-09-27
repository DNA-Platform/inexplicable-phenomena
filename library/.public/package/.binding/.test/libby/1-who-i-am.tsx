import { Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

// AN AUTOBIOGRAPHY IS WRITTEN IN THE FIRST PERSON — Doug, 2026-09-27: "Don't have a Log in libby's
// library. Have an autobiography."
export default () => (
    <Chapter>
        <Title>[[ Who I Am ]]</Title>
        <Section>
            <Heading>A librarian</Heading>
            <Paragraph>
                I keep this library. I began it with one shelf, <Means>$[ The Library / The Shelves ]</Means>, and said
                what it is for in <Means>$[ The Library / Synopsis ]</Means>, a synopsis whose title is parenthetical, so a
                reference lands on an id the page wears and does not show. The same day I gave a persona a voice, and
                the first thing it wrote is <Means>$[ its paper ]( A Paper )</Means>, which opens
                with <Means>$[ A Paper / What is claimed ]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
