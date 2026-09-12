import { $ } from '@dna-platform/chemistry';
import { Bold, Citation, Document, Heading, Illustration, Italics, Paragraph, Quote } from '@dna-platform/public';
import { Hatnote, Infobox, Line } from '@dna-platform/public/encyclopedia';
import { BookLink, OutwardLink } from '../.chapter';
import $Chapter from './.chapter';

export default class $Lead extends $Chapter {
    print() {
        return (
            <Document>
                <Hatnote>
                    For the Oregon artwork, see <BookLink>[Alan Turing sculpture](https://en.wikipedia.org/wiki/Alan_Turing_%28sculpture%29)</BookLink>.
                </Hatnote>
                <Hatnote>
                    "Turing" redirects here. For other uses, see <BookLink>[Turing disambiguation](https://en.wikipedia.org/wiki/Turing_%28disambiguation%29)</BookLink>.
                </Hatnote>
                <Infobox>
                    <Heading>Alan Turing</Heading>
                    <Paragraph>
                        OBE FRS
                    </Paragraph>
                    <Illustration source="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Alan_turing_header.jpg/250px-Alan_turing_header.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="250" height="333">
                        Turing in 1951
                    </Illustration>
                    <Line label="Born">
                        Alan Mathison Turing 23 June 1912 <BookLink>[Maida Vale](https://en.wikipedia.org/wiki/Maida_Vale)</BookLink>, London, England
                    </Line>
                    <Line label="Died">
                        7 June 1954 (aged 41) <BookLink>[Wilmslow](https://en.wikipedia.org/wiki/Wilmslow)</BookLink>, Cheshire, England
                    </Line>
                    <Line label="Cause of death">
                        Suicide by <BookLink>[cyanide poisoning](https://en.wikipedia.org/wiki/Cyanide_poisoning)</BookLink><Citation>[note 1](cite_note-2)</Citation>
                    </Line>
                    <Line label="Education">
                        <BookLink>[University of Cambridge](https://en.wikipedia.org/wiki/University_of_Cambridge)</BookLink> (<BookLink>[MA](https://en.wikipedia.org/wiki/Master_of_Arts_%28Oxford,_Cambridge,_and_Dublin%29)</BookLink>) · <BookLink>[Princeton University](https://en.wikipedia.org/wiki/Princeton_University)</BookLink> (PhD)
                    </Line>
                    <Line label="Known for">
                        <BookLink>[Cryptanalysis of the Enigma](https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Enigma)</BookLink> · <BookLink>[Turing's proof](https://en.wikipedia.org/wiki/Turing's_proof)</BookLink> · <BookLink>[Turing machine](https://en.wikipedia.org/wiki/Turing_machine)</BookLink> · <BookLink>[Turing test](https://en.wikipedia.org/wiki/Turing_test)</BookLink> · <BookLink>[unorganised machine](https://en.wikipedia.org/wiki/Unorganized_machine)</BookLink> · <BookLink>[Turing pattern](https://en.wikipedia.org/wiki/Turing_pattern)</BookLink> · <BookLink>[Turing reduction](https://en.wikipedia.org/wiki/Turing_reduction)</BookLink> · "<BookLink>[The Chemical Basis of Morphogenesis](https://en.wikipedia.org/wiki/The_Chemical_Basis_of_Morphogenesis)</BookLink>" · <BookLink>[Turing paradox](https://en.wikipedia.org/wiki/Quantum_Zeno_effect)</BookLink>
                    </Line>
                    <Line label="Partner">
                        <BookLink>[Joan Clarke](https://en.wikipedia.org/wiki/Joan_Clarke)</BookLink> (engaged in 1941 but did not marry)
                    </Line>
                    <Line label="Awards">
                        <BookLink>[Smith's Prize](https://en.wikipedia.org/wiki/Smith's_Prize)</BookLink> (1936)
                    </Line>
                    <Line label="Fields">
                        <BookLink>[Logic](https://en.wikipedia.org/wiki/Logic)</BookLink> · mathematics · <BookLink>[cryptanalysis](https://en.wikipedia.org/wiki/Cryptanalysis)</BookLink> · <BookLink>[computer science](https://en.wikipedia.org/wiki/Computer_science)</BookLink> · <BookLink>[mathematical and theoretical biology](https://en.wikipedia.org/wiki/Mathematical_and_theoretical_biology)</BookLink><Citation>[2](cite_note-googlescholar-3)</Citation>
                    </Line>
                    <Line label="Workplaces">
                        <BookLink>[University of Manchester](https://en.wikipedia.org/wiki/University_of_Manchester)</BookLink> · <BookLink>[Government Code and Cypher School](https://en.wikipedia.org/wiki/Government_Code_and_Cypher_School)</BookLink> · <BookLink>[National Physical Laboratory](https://en.wikipedia.org/wiki/National_Physical_Laboratory_%28United_Kingdom%29)</BookLink>
                    </Line>
                    <Line label="Thesis">
                        <Italics><OutwardLink>[Systems of Logic Based on Ordinals](https://web.archive.org/web/20121023103503/https://webspace.princeton.edu/users/jedwards/Turing%20Centennial%202012/Mudd%20Archive%20files/12285_AC100_Turing_1938.pdf)</OutwardLink></Italics> (1938)
                    </Line>
                    <Line label="Doctoral advisor">
                        <BookLink>[Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church)</BookLink><Citation>[3](cite_note-mathgene-4)</Citation>
                    </Line>
                    <Line label="Doctoral students">
                        <BookLink>[Robin Gandy](https://en.wikipedia.org/wiki/Robin_Gandy)</BookLink><Citation>[3](cite_note-mathgene-4)</Citation><Citation>[4](cite_note-gandyphd-5)</Citation> · <BookLink>[Beatrice Worsley](https://en.wikipedia.org/wiki/Beatrice_Worsley)</BookLink><Citation>[5](cite_note-bowen19-6)</Citation>
                    </Line>
                </Infobox>

                <Paragraph>
                    <Bold>Alan Mathison Turing</Bold> (<BookLink>[/ˈtjʊərɪŋ/](https://en.wikipedia.org/wiki/Help:IPA/English)</BookLink>; 23 June 1912 – 7 June 1954) was an English mathematician, <BookLink>[computer scientist](https://en.wikipedia.org/wiki/Computer_scientist)</BookLink>, <BookLink>[logician](https://en.wikipedia.org/wiki/Logic)</BookLink>, <BookLink>[cryptanalyst](https://en.wikipedia.org/wiki/Cryptanalyst)</BookLink>, philosopher and <BookLink>[theoretical biologist](https://en.wikipedia.org/wiki/Theoretical_biologist)</BookLink>.<Citation>[6](cite_note-Auto6D-1-7)</Citation> He was highly influential in the development of <BookLink>[theoretical computer science](https://en.wikipedia.org/wiki/Theoretical_computer_science)</BookLink>, providing a formalisation of the concepts of <BookLink>[algorithm](https://en.wikipedia.org/wiki/Algorithm)</BookLink> and <BookLink>[computation](https://en.wikipedia.org/wiki/Computation)</BookLink> with the <BookLink>[Turing machine](https://en.wikipedia.org/wiki/Turing_machine)</BookLink>, which can be considered a model of a general-purpose computer.<Citation>[7](cite_note-frs-8)</Citation><Citation>[8](cite_note-AFP-9)</Citation><Citation>[9](cite_note-Auto6D-2-10)</Citation> Turing is widely considered to be the father of theoretical computer science.<Citation>[10](cite_note-Auto6D-3-11)</Citation>
                </Paragraph>
                <Paragraph>
                    Born in London, Turing was raised in <BookLink>[southern England](https://en.wikipedia.org/wiki/Southern_England)</BookLink>. He graduated from <BookLink>[King's College, Cambridge](https://en.wikipedia.org/wiki/University_of_Cambridge)</BookLink>, and in 1938, earned a doctorate degree from <BookLink>[Princeton University](https://en.wikipedia.org/wiki/Princeton_University)</BookLink>. During <BookLink>[World War II](https://en.wikipedia.org/wiki/World_War_II)</BookLink>, Turing worked for the <BookLink>[Government Code and Cypher School](https://en.wikipedia.org/wiki/Government_Code_and_Cypher_School)</BookLink> at <BookLink>[Bletchley Park](https://en.wikipedia.org/wiki/Bletchley_Park)</BookLink>, Britain's <BookLink>[codebreaking](https://en.wikipedia.org/wiki/Codebreaking)</BookLink> centre that produced <BookLink>[Ultra](https://en.wikipedia.org/wiki/Ultra_%28cryptography%29)</BookLink> intelligence. He led <BookLink>[Hut 8](https://en.wikipedia.org/wiki/Hut_8)</BookLink>, the section responsible for German naval cryptanalysis. Turing devised techniques for speeding the breaking of German <BookLink>[ciphers](https://en.wikipedia.org/wiki/Cipher)</BookLink>, including improvements to the pre-war Polish <BookLink>[bomba](https://en.wikipedia.org/wiki/Bomba_%28cryptography%29)</BookLink> method, an <BookLink>[electromechanical](https://en.wikipedia.org/wiki/Electromechanical)</BookLink> machine that could find settings for the <BookLink>[Enigma machine](https://en.wikipedia.org/wiki/Enigma_machine)</BookLink>. He played a crucial role in cracking intercepted messages that enabled the <BookLink>[Allies](https://en.wikipedia.org/wiki/Allies_of_World_War_2)</BookLink> to defeat the <BookLink>[Axis powers](https://en.wikipedia.org/wiki/Axis_powers)</BookLink> in the <BookLink>[Battle of the Atlantic](https://en.wikipedia.org/wiki/Battle_of_the_Atlantic)</BookLink> and other engagements.<Citation>[11](cite_note-bbc-copeland-12)</Citation><Citation>[12](cite_note-Auto6D-4-13)</Citation>
                </Paragraph>
                <Paragraph>
                    After the war, Turing worked at the <BookLink>[National Physical Laboratory](https://en.wikipedia.org/wiki/National_Physical_Laboratory_%28United_Kingdom%29)</BookLink>, where he designed the <BookLink>[Automatic Computing Engine](https://en.wikipedia.org/wiki/Automatic_Computing_Engine)</BookLink>, one of the first designs for a stored-program computer. In 1948, Turing joined <BookLink>[Max Newman](https://en.wikipedia.org/wiki/Max_Newman)</BookLink>'s <BookLink>[Computing Machine Laboratory](https://en.wikipedia.org/wiki/Computing_Machine_Laboratory)</BookLink> at the <BookLink>[University of Manchester](https://en.wikipedia.org/wiki/University_of_Manchester)</BookLink>, where he contributed to the development of early <BookLink>[Manchester computers](https://en.wikipedia.org/wiki/Manchester_computers)</BookLink><Citation>[13](cite_note-Auto6D-5-14)</Citation> and became interested in <BookLink>[mathematical biology](https://en.wikipedia.org/wiki/Mathematical_biology)</BookLink>. Turing wrote on the chemical basis of <BookLink>[morphogenesis](https://en.wikipedia.org/wiki/Morphogenesis)</BookLink><Citation>[14](cite_note-Milinkovitch-15)</Citation><Citation>[2](cite_note-googlescholar-3)</Citation> and predicted <BookLink>[oscillating chemical reactions](https://en.wikipedia.org/wiki/Chemical_oscillator)</BookLink> such as the <BookLink>[Belousov–Zhabotinsky reaction](https://en.wikipedia.org/wiki/Belousov%E2%80%93Zhabotinsky_reaction)</BookLink>, first observed in the 1960s. Despite these accomplishments, he was never fully recognised during his lifetime because much of his work was covered by the <BookLink>[Official Secrets Act](https://en.wikipedia.org/wiki/Official_Secrets_Act_1939)</BookLink>.<Citation>[15](cite_note-Auto6D-6-16)</Citation>
                </Paragraph>
                <Paragraph>
                    In 1952, Turing was prosecuted for <BookLink>[homosexual acts](https://en.wikipedia.org/wiki/Gross_indecency)</BookLink>. He accepted hormone treatment, a procedure commonly referred to as <BookLink>[chemical castration](https://en.wikipedia.org/wiki/Chemical_castration)</BookLink>, as an alternative to prison. Turing died on 7 June 1954, aged 41, from <BookLink>[cyanide poisoning](https://en.wikipedia.org/wiki/Cyanide_poisoning)</BookLink>. An inquest determined his death as suicide, but the evidence is also consistent with accidental poisoning.<Citation>[1](cite_note-Copeland-1)</Citation> Following a campaign in 2009, British prime minister <BookLink>[Gordon Brown](https://en.wikipedia.org/wiki/Gordon_Brown)</BookLink> made an <BookLink>[official public apology](https://en.wikipedia.org/wiki/Alan_Turing#Government_apology_and_pardon)</BookLink> for "the appalling way [Turing] was treated". <BookLink>[Queen Elizabeth II](https://en.wikipedia.org/wiki/Queen_Elizabeth_II)</BookLink> granted a <BookLink>[pardon](https://en.wikipedia.org/wiki/Royal_prerogative_of_mercy)</BookLink> in 2013. The term "<BookLink>[Alan Turing law](https://en.wikipedia.org/wiki/Alan_Turing_law)</BookLink>" is used informally to refer to a 2017 law in the UK that retroactively pardoned men cautioned or convicted under historical legislation that outlawed homosexual acts.<Citation>[16](cite_note-BBC-pardon-17)</Citation>
                </Paragraph>
                <Paragraph>
                    Turing left <BookLink>[an extensive legacy](https://en.wikipedia.org/wiki/Legacy_of_Alan_Turing)</BookLink> in mathematics and computing which has become widely recognised with statues and <BookLink>[many things named after him](https://en.wikipedia.org/wiki/List_of_things_named_after_Alan_Turing)</BookLink>, including <BookLink>[an annual award](https://en.wikipedia.org/wiki/Turing_Award)</BookLink> for computing innovation. His portrait appears on the <BookLink>[Bank of England £50 note](https://en.wikipedia.org/wiki/Bank_of_England_%C2%A350_note)</BookLink>, first released on 23 June 2021 to coincide with his birthday. The audience vote in a <BookLink>[2019 BBC series](https://en.wikipedia.org/wiki/Icons:_The_Greatest_Person_of_the_20th_Century)</BookLink> named Turing the greatest scientist of the 20th century.<Citation>[17](cite_note-Auto6D-7-18)</Citation>
                </Paragraph>
                <Paragraph>
                    The cognitive scientist <BookLink>[Douglas Hofstadter](https://en.wikipedia.org/wiki/Douglas_Hofstadter)</BookLink> writes:<Citation>[18](cite_note-FOOTNOTEHodges1983xiii-19)</Citation>
                </Paragraph>
                <Quote>
                    Atheist, homosexual, eccentric, marathon-running mathematician, A. M. Turing was in large part responsible not only for the concept of computers, incisive theorems about their powers, and a clear vision of the possibility of computer minds, but also for the cracking of German ciphers during the Second World War. It is fair to say we owe much to Alan Turing for the fact that we are not under Nazi rule today.
                </Quote>
            </Document>
        );
    }
}
