import { $ } from '@dna-platform/chemistry';
import { chapter as Chapter, section as Section, Heading, Row, TableOfContents } from '@dna-platform/public';
import $Chapter from './.chapter';

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Heading>Contents</Heading>
                <Row><Chapter>Early life and education</Chapter>
                    <Row><Section>Family</Section></Row>
                    <Row><Section>School</Section></Row>
                    <Row><Section>Christopher Morcom</Section></Row>
                    <Row><Section>University and work on computability</Section></Row>
                </Row>
                <Row><Chapter>Career and research</Chapter>
                    <Row><Section>Cryptanalysis</Section></Row>
                    <Row><Section>Bombe</Section>
                        <Row><Section>Action This Day</Section></Row>
                    </Row>
                    <Row><Section>Hut 8 and the naval Enigma</Section></Row>
                    <Row><Section>Turingery</Section></Row>
                    <Row><Section>Delilah</Section></Row>
                    <Row><Section>Early computers and the Turing test</Section></Row>
                    <Row><Section>Pattern formation and mathematical biology</Section></Row>
                    <Row><Section>Ratio Club and other cybernetics contacts</Section></Row>
                </Row>
                <Row><Chapter>Personal life</Chapter>
                    <Row><Section>Treasure</Section></Row>
                    <Row><Section>Engagement</Section></Row>
                    <Row><Section>Chess</Section></Row>
                    <Row><Section>Homosexuality and indecency conviction</Section>
                        <Row><Section>"Pryce's Buoy"</Section></Row>
                    </Row>
                </Row>
                <Row><Chapter>Death</Chapter>
                    <Row><Section>Doubts on suicide thesis</Section></Row>
                </Row>
                <Row><Chapter>Government apology and pardon</Chapter></Row>
                <Row><Chapter>Further reading</Chapter>
                    <Row><Section>Articles</Section></Row>
                    <Row><Section>Books</Section></Row>
                </Row>
                <Row><Chapter>See also</Chapter>
                    <Row><Section>Works cited</Section></Row>
                </Row>
                <Row><Chapter>Notes</Chapter></Row>
                <Row><Chapter>References</Chapter></Row>
                <Row><Chapter>External links</Chapter></Row>
            </TableOfContents>
        );
    }
}
