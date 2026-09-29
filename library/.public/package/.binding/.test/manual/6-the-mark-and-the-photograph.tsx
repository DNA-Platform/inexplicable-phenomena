import { Chapter, Code, Heading, Image, Paragraph, Section, Svg, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Mark and the Photograph ]]</Title>
        <Section>
            <Heading>The mark</Heading>
            <Paragraph>
                Two files stand beside this chapter and neither is code: the library's mark as an SVG and a
                photograph of the library as a PNG. Each is named by its type alone, since neither carries an
                identifier, and each figure below is drawn once from its file and once from what is written in it,
                so the same tool shows a file and a literal.
            </Paragraph>
            <Paragraph>
                Three books on a shelf, the library's mark, kept beside this chapter as a file and drawn here from
                it.
            </Paragraph>
            <Paragraph><Svg>![[ .svg ]]</Svg></Paragraph>
            <Paragraph>
                And the same figure given its markup directly, one book, so a figure needs no file to stand.
            </Paragraph>
            <Paragraph><Svg><svg viewBox="0 0 24 24" width="24" height="24"><rect x="9" y="4" width="6" height="16" /></svg></Svg></Paragraph>
        </Section>
        <Section>
            <Heading>The photograph</Heading>
            <Paragraph>A photograph of the library's own page, taken while it was dressed, kept beside this chapter.</Paragraph>
            <Paragraph><Image>![[ .png ]]</Image></Paragraph>
        </Section>
        <Section>
            <Heading>A listing without a file</Heading>
            <Paragraph><Code>{'const mark = <Svg><svg viewBox="0 0 24 24"><rect x="9" y="4" width="6" height="16" /></svg></Svg>;'}</Code></Paragraph>
        </Section>
        <Section>
            <Heading>This chapter's own file</Heading>
            <Paragraph>
                A chapter may insert its own source as written, so the literal forms above stand in the listing below
                exactly as they were typed, uncompiled, since the version shown is the version written.
            </Paragraph>
            <Paragraph><Code>![[ this ]]</Code></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
