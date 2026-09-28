import { Chapter, Code, Heading, Highlighted, Means, Numbered, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Listing ]]</Title>
        <Section>
            <Heading>How a file must look to be read</Heading>
            <Paragraph>
                Every chapter of this manual prints the file it documents, and a reader is asked to read it, so a
                listing owes the reader what a printed page of code owes: the file's name above it, so the reader
                knows what they are looking at; its lines numbered, so a line can be cited from the prose and found;
                its syntax coloured in the library's own ink, a keyword one shade and a string another, and never in
                an editor's colours, so a dark book colours its code as it colours its prose; and no line wrapped,
                since a wrapped line is a line the reader cannot count. Without these the tree and the tabs of
                the <Means>$[[ ./The Explorer ]]</Means> would be furniture around a grey block.
            </Paragraph>
            <Paragraph>
                The framework gives the colouring and the numbering as annotations on a Code figure, so a listing
                that wants them says so and one that does not prints plain: Highlighted, whose language is the file's,
                and Numbered. The colours are the theme's, read from its ink and paper, and my dark book overrides
                them as it overrides everything else. This chapter has no file of its own; the listing below is this
                chapter's own source, coloured and numbered, which is the shortest proof that the two work.
            </Paragraph>
        </Section>
        <Section>
            <Heading>This chapter, listed</Heading>
            <Paragraph><Code>![[ this ]]<Highlighted /><Numbered /></Code></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
