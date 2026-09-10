// The contents, written as the chapters themselves. Each <Chapter> means the document that wears
// its title, and wears that document's own classes — which is how the appendices are told apart
// from the body without this file saying so. A nested <Chapter> means a section beneath one, and
// the encyclopedia numbers none of them: Wikipedia shows depth by indent alone.
import { $ } from '@dna-platform/chemistry';
import { Chapter, TableOfContents } from '@dna-platform/public';

export default $(
    <TableOfContents>
        <Chapter title="Early life and education">
            <Chapter title="Family" />
            <Chapter title="School" />
            <Chapter title="Christopher Morcom" />
            <Chapter title="University and work on computability" />
        </Chapter>
        <Chapter title="Career and research">
            <Chapter title="Cryptanalysis" />
            <Chapter title="Bombe">
                <Chapter title="Action This Day" />
            </Chapter>
            <Chapter title="Hut 8 and the naval Enigma" />
            <Chapter title="Turingery" />
            <Chapter title="Delilah" />
            <Chapter title="Early computers and the Turing test" />
            <Chapter title="Pattern formation and mathematical biology" />
            <Chapter title="Ratio Club and other cybernetics contacts" />
        </Chapter>
        <Chapter title="Personal life">
            <Chapter title="Treasure" />
            <Chapter title="Engagement" />
            <Chapter title="Chess" />
            <Chapter title="Homosexuality and indecency conviction">
                <Chapter title={`"Pryce's Buoy"`} />
            </Chapter>
        </Chapter>
        <Chapter title="Death">
            <Chapter title="Doubts on suicide thesis" />
        </Chapter>
        <Chapter title="Government apology and pardon" />
        <Chapter title="Further reading">
            <Chapter title="Articles" />
            <Chapter title="Books" />
        </Chapter>
        <Chapter title="See also">
            <Chapter title="Works cited" />
        </Chapter>
        <Chapter title="Notes" />
        <Chapter title="References" />
        <Chapter title="External links" />
    </TableOfContents>,
    TableOfContents
);
