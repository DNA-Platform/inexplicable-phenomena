import { Chapter, Date, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ Who I Am ]]</Title>
        <Section>
            <Heading>A librarian</Heading>
            <Paragraph>
                I keep this library. I began it on <Date>[the last day of September](2026-09-30)</Date> with one
                shelf, <Means>$[[ The Library / The Shelves ]]</Means>, and said
                what it is for in <Means>$[[ The Library / Synopsis ]]</Means>, a synopsis whose title is parenthetical, so a
                reference lands on an id the page wears and does not show. The same day I gave a persona a voice, and
                the first thing it wrote is <Means>$[[ its paper ]]( A Paper )</Means>, which opens
                with <Means>$[[ A Paper / What is claimed ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>An autobiography</Heading>
            <Paragraph>
                This book is the one book of the library that is by its own subject. I am the librarian, so it is
                filed under Libraries like every other book here; it is about me, so I am a subject, and my name is
                what others file under. That is why it is written in the first person and not as a log: a log is a
                record of a library, and an autobiography is a person.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
