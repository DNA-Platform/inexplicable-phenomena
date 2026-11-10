import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title>
            <Parenthetical />
            [[ Table of Contents ]]
        </Title>
        <Section>
            <Heading>The Papers</Heading>
            <Paragraph>
                <Content>$[[ Saggio di interpretazione della geometria non-euclidea ]]( ./Beltrami 1868 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ On the Representation of a Large Even Integer ]]( ./Chen 1973 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Continuity and Irrational Numbers ]]( ./Dedekind 1872 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Arithmetization of Metamathematics in a General Setting ]]( ./Feferman 1960 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Demonstratio nova theorematis ]]( ./Gauss 1799 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ On Formally Undecidable Propositions ]]( ./Gödel 1931 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Some Problems of Partitio Numerorum, III ]]( ./Hardy and Littlewood 1923 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ The Foundations of Geometry ]]( ./Hilbert 1899 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ On Surfaces of Constant Gaussian Curvature ]]( ./Hilbert 1901 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Outline of a Theory of Truth ]]( ./Kripke 1975 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Solution of a Problem of Leon Henkin ]]( ./Löb 1955 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Geometrical Researches on the Theory of Parallels ]]( ./Lobachevsky 1840 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Extensions of Some Theorems of Gödel and Church ]]( ./Rosser 1936 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ On Computable Numbers ]]( ./Turing 1936 )</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ Systems of Logic Based on Ordinals ]]( ./Turing 1939 )</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Mathematical Library ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Synopsis ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Table of Contents ]]</Content>
                </Word>
            </Paragraph>
        </Section>
    </Chapter>
);
