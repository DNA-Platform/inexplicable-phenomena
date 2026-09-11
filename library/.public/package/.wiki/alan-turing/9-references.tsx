// EACH ENTRY DENOTES ITS OWN PLACE. A <PageFold> gives the paragraph a key, so a citation anywhere
// in the article reaches it with markdown's own syntax: <Citation>[1](computable)</Citation>. The
// entries stand in the order the article cites them, which is what makes the hand-written numbers
// agree with the list. The four that are papers keep their <Reference> too — an entry is both a
// target and a link to the work it names — and the books and news items carry no URL rather than
// a guessed one.
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, PageFold, Paragraph, Reference, Section } from '@dna-platform/public';
import Document from './.document';

export default class $References extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>References</Heading>
                    <Paragraph>Hodges, Andrew. Alan Turing: The Enigma. Burnett Books, 1983.<PageFold>hodges</PageFold></Paragraph>
                    <Paragraph>Turing, A. M. On Computable Numbers, with an Application to the Entscheidungsproblem. Proceedings of the London Mathematical Society, 1937.<Reference>https://doi.org/10.1112/plms/s2-42.1.230</Reference><PageFold>computable</PageFold></Paragraph>
                    <Paragraph>Copeland, B. Jack, ed. The Essential Turing. Oxford University Press, 2004.<PageFold>essential</PageFold></Paragraph>
                    <Paragraph>Mahon, A. P. The History of Hut Eight, 1939–1945. Government Code and Cypher School, 1945.<PageFold>mahon</PageFold></Paragraph>
                    <Paragraph>Turing, A. M. Computing Machinery and Intelligence. Mind 59 (236), 1950.<Reference>https://doi.org/10.1093/mind/LIX.236.433</Reference><PageFold>mind</PageFold></Paragraph>
                    <Paragraph>Turing, A. M. The Chemical Basis of Morphogenesis. Philosophical Transactions of the Royal Society of London B 237 (641), 1952.<Reference>https://doi.org/10.1098/rstb.1952.0012</Reference><PageFold>morphogenesis</PageFold></Paragraph>
                    <Paragraph>Leavitt, David. The Man Who Knew Too Much: Alan Turing and the Invention of the Computer. Weidenfeld and Nicolson, 2006.<PageFold>leavitt</PageFold></Paragraph>
                    <Paragraph>Newman, M. H. A. Alan Mathison Turing, 1912–1954. Biographical Memoirs of Fellows of the Royal Society 1, 1955.<Reference>https://doi.org/10.1098/rsbm.1955.0019</Reference><PageFold>newman</PageFold></Paragraph>
                    <Paragraph>Alan Turing: Inquest's suicide verdict not supportable. BBC News, 26 June 2012.<PageFold>inquest</PageFold></Paragraph>
                    <Paragraph>Copeland, B. Jack. Turing: Pioneer of the Information Age. Oxford University Press, 2012.<PageFold>copeland</PageFold></Paragraph>
                    <Paragraph>PM apology after Turing petition. BBC News, 11 September 2009.<PageFold>apology</PageFold></Paragraph>
                    <Paragraph>Royal pardon for codebreaker Alan Turing. BBC News, 24 December 2013.<PageFold>pardon</PageFold></Paragraph>
                </Section>
            </Document>
        );
    }
}
