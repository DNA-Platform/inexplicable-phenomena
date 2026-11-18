import { Append, Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';
import { Listing } from '../.reference/7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Part>Appendix</Part>
        <Title>[[ The Sketch's Tools ]]</Title>
        <Section>
            <Heading>How a sketch of this book is made</Heading>
            <Paragraph>
                Every sketch in this book is a print of a bound page with a sheet and a switch laid over it, as the
                method in <Means>$[[ ./The Manual's Page ]]</Means> says, and three tools beside this chapter make
                one. The snapshot opens the bound page off the served site in a headless Chrome, strips its scripts,
                fetches every linked stylesheet into the page and writes the sheets the styled components made back as
                text, so the print stands on its own. The assembly takes that print, a sheet of the sketch's own rules
                under its own prefix, and the script of its switch, inserts the link to the face the listing takes
                from Google Fonts, and writes the sketch file beside its chapter. The shooting opens a sketch from the
                disk at a form named in the address, at the desk's width or the phone's, and photographs it, the whole
                page when asked, so a photograph is read before I am shown.
            </Paragraph>
            <Paragraph>
                The tools are catalogued here, under the appendix of this book's table, because they are this book's
                own code and no other's: the components that show them are the reference manual's, and an appendix is
                a special part of a book, written with those components, that refers to the code specific to the book.
                They were written on 17 November 2026 for The Manual's Page and stood in a scratch folder until
                19 November 2026, when the appendix was built and they came home.
            </Paragraph>
        </Section>
        <Listing />
        <Append
            identifier="snapshot"
            type=".mjs"
        >
            ![[ snapshot.mjs ]]
        </Append>
        <Append
            identifier="assemble"
            type=".mjs"
        >
            ![[ assemble.mjs ]]
        </Append>
        <Append
            identifier="shoot"
            type=".mjs"
        >
            ![[ shoot.mjs ]]
        </Append>
    </Chapter>
);
