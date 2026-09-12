import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Ref, Section, TableOfContents } from '@dna-platform/public';
import { Menu, Summary } from '@dna-platform/public/application';
import $Chapter from './.chapter';

export default class $Contents extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Section>
                    <Heading>Contents</Heading>
                    <Paragraph><Ref>[(Top)](#)</Ref></Paragraph>
                    <Menu>
                        <Summary><Ref>[Early life and education](#early-life-and-education)</Ref></Summary>
                        <Paragraph><Ref>[Family](#family)</Ref></Paragraph>
                        <Paragraph><Ref>[School](#school)</Ref></Paragraph>
                        <Paragraph><Ref>[Christopher Morcom](#christopher-morcom)</Ref></Paragraph>
                        <Paragraph><Ref>[University and work on computability](#university-and-work-on-computability)</Ref></Paragraph>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Career and research](#career-and-research)</Ref></Summary>
                        <Paragraph><Ref>[Cryptanalysis](#cryptanalysis)</Ref></Paragraph>
                        <Paragraph><Ref>[Bombe](#bombe)</Ref></Paragraph>
                        <Paragraph><Ref>[Hut 8 and the naval Enigma](#hut-8-and-the-naval-enigma)</Ref></Paragraph>
                        <Paragraph><Ref>[Turingery](#turingery)</Ref></Paragraph>
                        <Paragraph><Ref>[Delilah](#delilah)</Ref></Paragraph>
                        <Paragraph><Ref>[Early computers and the Turing test](#early-computers-and-the-turing-test)</Ref></Paragraph>
                        <Paragraph><Ref>[Pattern formation and mathematical biology](#pattern-formation-and-mathematical-biology)</Ref></Paragraph>
                        <Paragraph><Ref>[Ratio Club and other cybernetics contacts](#ratio-club-and-other-cybernetics-contacts)</Ref></Paragraph>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Personal life](#personal-life)</Ref></Summary>
                        <Paragraph><Ref>[Treasure](#treasure)</Ref></Paragraph>
                        <Paragraph><Ref>[Engagement](#engagement)</Ref></Paragraph>
                        <Paragraph><Ref>[Chess](#chess)</Ref></Paragraph>
                        <Paragraph><Ref>[Homosexuality and indecency conviction](#homosexuality-and-indecency-conviction)</Ref></Paragraph>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[Death](#death)</Ref></Summary>
                        <Paragraph><Ref>[Doubts on suicide thesis](#doubts-on-suicide-thesis)</Ref></Paragraph>
                    </Menu>
                    <Paragraph><Ref>[Government apology and pardon](#government-apology-and-pardon)</Ref></Paragraph>
                    <Menu>
                        <Summary><Ref>[Further reading](#further-reading)</Ref></Summary>
                        <Paragraph><Ref>[Articles](#articles)</Ref></Paragraph>
                        <Paragraph><Ref>[Books](#books)</Ref></Paragraph>
                    </Menu>
                    <Menu>
                        <Summary><Ref>[See also](#see-also)</Ref></Summary>
                        <Paragraph><Ref>[Works cited](#works-cited)</Ref></Paragraph>
                    </Menu>
                    <Paragraph><Ref>[Notes](#notes)</Ref></Paragraph>
                    <Paragraph><Ref>[References](#references)</Ref></Paragraph>
                    <Paragraph><Ref>[External links](#external-links)</Ref></Paragraph>
                </Section>
            </TableOfContents>
        );
    }
}
