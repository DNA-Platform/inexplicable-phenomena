import { $ } from '@dna-platform/chemistry';
import { $Chapter, chapter as Chapter, Heading, Ref, Section, TableOfContents, Title } from '@dna-platform/public';
import { Menu, Option, Summary } from '@dna-platform/public/application';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Title print={false}>Table of Contents</Title>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Ref>[(Top)](#)</Ref></Option>
                    <Menu>
                        <Summary><Chapter>Early life and education</Chapter></Summary>
                        <Option><Ref>[Family](#family)</Ref></Option>
                        <Option><Ref>[School](#school)</Ref></Option>
                        <Option><Ref>[Christopher Morcom](#christopher-morcom)</Ref></Option>
                        <Option><Ref>[University and work on computability](#university-and-work-on-computability)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Chapter>Career and research</Chapter></Summary>
                        <Option><Ref>[Cryptanalysis](#cryptanalysis)</Ref></Option>
                        <Option><Ref>[Bombe](#bombe)</Ref></Option>
                        <Option><Ref>[Hut 8 and the naval Enigma](#hut-8-and-the-naval-enigma)</Ref></Option>
                        <Option><Ref>[Turingery](#turingery)</Ref></Option>
                        <Option><Ref>[Delilah](#delilah)</Ref></Option>
                        <Option><Ref>[Early computers and the Turing test](#early-computers-and-the-turing-test)</Ref></Option>
                        <Option><Ref>[Pattern formation and mathematical biology](#pattern-formation-and-mathematical-biology)</Ref></Option>
                        <Option><Ref>[Ratio Club and other cybernetics contacts](#ratio-club-and-other-cybernetics-contacts)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Chapter>Personal life</Chapter></Summary>
                        <Option><Ref>[Treasure](#treasure)</Ref></Option>
                        <Option><Ref>[Engagement](#engagement)</Ref></Option>
                        <Option><Ref>[Chess](#chess)</Ref></Option>
                        <Option><Ref>[Homosexuality and indecency conviction](#homosexuality-and-indecency-conviction)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Chapter>Death</Chapter></Summary>
                        <Option><Ref>[Doubts on suicide thesis](#doubts-on-suicide-thesis)</Ref></Option>
                    </Menu>
                    <Option><Chapter>Government apology and pardon</Chapter></Option>
                    <Menu>
                        <Summary><Chapter>Further reading</Chapter></Summary>
                        <Option><Ref>[Articles](#articles)</Ref></Option>
                        <Option><Ref>[Books](#books)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Chapter>See also</Chapter></Summary>
                        <Option><Ref>[Works cited](#works-cited)</Ref></Option>
                    </Menu>
                    <Option><Chapter>Notes</Chapter></Option>
                    <Option><Chapter>References</Chapter></Option>
                    <Option><Chapter>External links</Chapter></Option>
                    <Chapter print={false}>Alan Turing</Chapter>
                    <Chapter print={false}>From Wikipedia</Chapter>
                    <Chapter print={false}>Table of Contents</Chapter>
                    <Chapter print={false}>Lead</Chapter>
                    <Chapter print={false}>About this page</Chapter>
                </Section>
            </TableOfContents>
        );
    }
}
