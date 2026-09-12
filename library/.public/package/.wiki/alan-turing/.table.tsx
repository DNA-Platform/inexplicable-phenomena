import { $ } from '@dna-platform/chemistry';
import { Heading, Ref, Section, TableOfContents } from '@dna-platform/public';
import { Menu, Option, Summary } from '@dna-platform/public/application';
import $Chapter from './.chapter';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    <Option><Ref>[(Top)](#)</Ref></Option>
                    <Menu>
                        <Summary><Ref>[Early life and education](#early-life-and-education)</Ref></Summary>
                        <Option><Ref>[Family](#family)</Ref></Option>
                        <Option><Ref>[School](#school)</Ref></Option>
                        <Option><Ref>[Christopher Morcom](#christopher-morcom)</Ref></Option>
                        <Option><Ref>[University and work on computability](#university-and-work-on-computability)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Career and research](#career-and-research)</Ref></Summary>
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
                        <Summary><Ref>[Personal life](#personal-life)</Ref></Summary>
                        <Option><Ref>[Treasure](#treasure)</Ref></Option>
                        <Option><Ref>[Engagement](#engagement)</Ref></Option>
                        <Option><Ref>[Chess](#chess)</Ref></Option>
                        <Option><Ref>[Homosexuality and indecency conviction](#homosexuality-and-indecency-conviction)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Death](#death)</Ref></Summary>
                        <Option><Ref>[Doubts on suicide thesis](#doubts-on-suicide-thesis)</Ref></Option>
                    </Menu>
                    <Option><Ref>[Government apology and pardon](#government-apology-and-pardon)</Ref></Option>
                    <Menu>
                        <Summary><Ref>[Further reading](#further-reading)</Ref></Summary>
                        <Option><Ref>[Articles](#articles)</Ref></Option>
                        <Option><Ref>[Books](#books)</Ref></Option>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[See also](#see-also)</Ref></Summary>
                        <Option><Ref>[Works cited](#works-cited)</Ref></Option>
                    </Menu>
                    <Option><Ref>[Notes](#notes)</Ref></Option>
                    <Option><Ref>[References](#references)</Ref></Option>
                    <Option><Ref>[External links](#external-links)</Ref></Option>
                </Section>
            </TableOfContents>
        );
    }
}
