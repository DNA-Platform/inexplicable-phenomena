import { Chapter, Code, Heading, Image, Paragraph, Section, Svg, Title } from '@dna-platform/public';
import { Catchword } from './.book';

// TWO FILES BESIDE ONE CHAPTER, NEITHER OF THEM CODE: the library's mark as an SVG and a photograph of the
// library as a PNG, each named by its type alone since neither carries an identifier — and each figure drawn
// again from what is written in it, so the same tool shows a file and a literal. Doug, 2026-09-28: "have one
// image and one SVG and to prove that both can work… so that the same tool can be used to express a literal in
// the code."
export default () => (
    <Chapter>
        <Title>[[ The Mark and the Photograph ]]</Title>
        <Section>
            <Heading>The mark</Heading>
            <Paragraph>
                Three books on a shelf, the library's mark, kept beside this chapter as a file and drawn here from
                it.
            </Paragraph>
            <Paragraph><Svg type=".svg" /></Paragraph>
            <Paragraph>
                And the same figure given its markup directly, one book, so a figure needs no file to stand.
            </Paragraph>
            <Paragraph><Svg><svg viewBox="0 0 24 24" width="24" height="24"><rect x="9" y="4" width="6" height="16" /></svg></Svg></Paragraph>
        </Section>
        <Section>
            <Heading>The photograph</Heading>
            <Paragraph>A photograph of the library's own page, taken while it was dressed, kept beside this chapter.</Paragraph>
            <Paragraph><Image type=".png" /></Paragraph>
        </Section>
        <Section>
            <Heading>A listing without a file</Heading>
            <Paragraph><Code>{'const mark = <Svg type=".svg" />;'}</Code></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
