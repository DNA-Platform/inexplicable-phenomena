import { Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Books ]]</Title>
        <Paragraph>
            The kinds of book a subject keeps, and the idioms each follows. These stood in the first subject's own
            manual until my word of 21 November 2026: "Most of those things should be specified in the library manual
            because they are not specific to mathematics." They were right — every one of them named mathematics only
            as its first instance, and nothing in their idioms was mathematics' — so they stand here by the first of
            the three shelves, <Means>$[[ ./The Reference Manual ]]</Means> 2.1. What a subject makes different about
            a kind stays in that subject's manual, and the textbook is the standing case.
        </Paragraph>
        <Section>
            <Heading>1. The kinds</Heading>
            <Paragraph>
                <List />
                <Line>1.1 A subject keeps as many of these as its work asks for, and no subject is required to keep any: the notebook that takes the notes, the textbook that states the official results, the project that records the work, the library that holds the publications the work leans on, the design that holds the visual decisions, and the identity in which the subject speaks for itself.</Line>
                <Line>1.2 A kind is a shape, never a privilege: a book of a kind wears the same four faces as every other book and is reached the same way, <Means>$[[ ./The Faces ]]</Means> 1.1.</Line>
                <Line>1.3 The idioms below hold for every subject's book of that kind. A subject's manual adds only what its own subject makes different, and says so in a chapter of its own.</Line>
                <Line>1.4 Two idioms hold across all six and are not repeated under each: every chapter gets its row on the table of contents and its clause in the synopsis, written in the same act as the chapter; and a resource stands beside its chapter, named for it with a tilde, appended to it and drawing nothing of itself.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The notebook</Heading>
            <Paragraph>
                The notebook takes the notes. Nothing in it is official: it is where rulings, analogies and
                specifications live while the textbook is not ready to state them. The first
                is <Means>$[[ The Notebook of Arithmetic ]]( Arithmetic Notebook )</Means>.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>2.1 A chapter names its part with the part annotation and opens with one provenance paragraph: where the note came from and on whose word it stands.</Line>
                <Line>2.2 Only I am quoted. Everyone else — a paper, a session, a teammate — is paraphrased, with the source named.</Line>
                <Line>2.3 Titles are short names, and no heading on the page repeats a title or another heading.</Line>
                <Line>2.4 One idiom is enforced by code: every quoted span of four or more words must stand in a conversation's message or a sprint record, and the checker beside <Means>$[[ The Sources ]]( Arithmetic Notebook / The Sources )</Means> proves it, failing the loop until every span is found. That checker speaks no subject's language and is owed its place in this manual beside this chapter; it stands beside the first notebook until it is moved.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. The project</Heading>
            <Paragraph>
                The project is the record of the work: what each sprint accomplished and what it leaves. The first
                is <Means>$[[ The Project of Arithmetic ]]( Arithmetic Project )</Means>.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>3.1 One entry per sprint, written at the close, in the form of the entries before it.</Line>
                <Line>3.2 An entry names what was built, refers into the notebook and the library where the work landed, and says what the sprint leaves.</Line>
                <Line>3.3 The sprint's full record lives in the branch library, not here; this book is the subject's own account of it.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>4. The library of publications</Heading>
            <Paragraph>
                A subject's library holds the publications its work leans on. The first
                is <Means>$[[ The Library of Mathematics ]]( Mathematical Library )</Means>.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>4.1 A publication is a chapter, keyed by author and year in the form of Gödel 1931, and the table lists the rows alphabetically by key.</Line>
                <Line>4.2 A free text is held beside its chapter with its file and a plate of the first page, <Means>$[[ ./The Paper ]]</Means>; a copyrighted one is cited by address.</Line>
                <Line>4.3 The chapter carries the citation and the notes; the citing books refer in by the key, and the chapter's writeup refers back to them.</Line>
                <Line>4.4 Enforced by code: the prover in the branch library opens every row in a real browser, follows the plate to the held file or the address, and fails on a landing that does not answer. The keys and the rows are held by hand.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>5. The design</Heading>
            <Paragraph>
                A design book holds visual decisions as sketches. The library keeps its
                own, <Means>$[[ The Design ]]</Means>, and a subject keeps one for what its own pages
                need; the first subject's is <Means>$[[ Subjective Design ]]( Mathematical Design )</Means>.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>5.1 A sketch is an HTML page beside its chapter, its forms lettered, each photographed at a desk's width and a phone's.</Line>
                <Line>5.2 A sketch is drawn in the pages' own palette and never with the print's class names; the decided form is cited by its number when it is built.</Line>
                <Line>5.3 A built design refers to the chapters that exemplify it, and the photographs stand beside the chapter as its record.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>6. The identity</Heading>
            <Paragraph>
                The identity is the book in which a subject speaks for itself — a blog the subject writes in its own
                voice, about its own formalization and about what has become possible in it. The first
                is <Means>$[[ Mathematical Identity ]]</Means>, opened on my word of 21 November 2026.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>6.1 A post is a chapter titled by what it is about, carrying a subtitle that says what the post is a reflection on, <Means>$[[ ./The Faces ]]</Means> 1.4.</Line>
                <Line>6.2 A post is drafted in a markdown document appended beside its chapter, which is where the writing is done; the document is the draft and the chapter is the post. The document draws nothing of itself, 1.4 above, and is kept because a draft is a record.</Line>
                <Line>6.3 The draft is integrated into the chapter's own writing by hand — paragraphs, sections, mentions and annotations in the library's own words — and never rendered in place. A document rendered verbatim was the library's practice until my word of 21 November 2026 struck the whole apparatus that did it; what replaces it is a person reading a draft and writing the page.</Line>
                <Line>6.4 A draft that is rewritten keeps its versions beside the chapter, each appended under its own name, as the conversations of my own library keep theirs.</Line>
                <Line>6.5 The voice is the subject's, in the first person, and the posts carry the insights of whoever writes them. The switch of perspective between the subject's voice and the author's is not built, and stands open on my word of 21 November 2026: "It was always meant to be a blog, but one that mathematics itself writes in its voice. We can add that switch of perspective in later."</Line>
            </Paragraph>
        </Section>
    </Chapter>
);
