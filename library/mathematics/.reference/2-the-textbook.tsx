import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Books</Part>
        <Title>[[ The Textbook ]]</Title>
        <Paragraph>
            The textbook is the first place where official results go. A definition or a theorem enters it only as
            Doug has ruled it in the room; what he has not ruled stays a notebook note. The textbook of the first
            subject is <Means>$[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Means>.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>Official results only: every chapter stands on a ruling recorded verbatim in the sprint records.</Line>
            <Line>The official form is the algebraic one, ruled 12 November 2026; the prose stays in the notebook.</Line>
            <Line>Results are stated and proved, and their references resolve into the subject's library of publications.</Line>
        </Paragraph>
        <Paragraph>
            What a textbook entry is, as Doug has specified it so far, 12 November 2026: a chapter is about one
            formalism. It carries the specification of the formalism — the sovereign part, since we formalize
            specifications — an informal explanation, the formalism itself with a justification of how it
            satisfies the specification, and presentations in different contexts, each context itself specified.
            Citations run into the subject's library and into the subject's own notes. One aspect is viewable at
            a time. What is specified and not yet built stands as a placeholder for itself — the interpolation
            approach. The justification leans toward visible annotations, writing added to a part of a chapter
            and toggled in the UI; and the specification needs a form, since when it changes the formal structure
            and the justifications must change with it.
        </Paragraph>
        <Paragraph>
            The components foreseen and not yet ruled: a form for the specification whose clauses have identity;
            the justification as an annotation sort whose note answers with writing, toggled by the theme; a
            placeholder for the interpolation; a context specification for each presentation; and the theme's
            rule that shows one aspect alone, on the front's precedent. The classes will stand with this chapter
            as its code once they are ruled; until then every idiom here is held by hand, and the four chapters
            of the Textbook of Arithmetic stand specified in this shape, each its specification and a
            placeholder.
        </Paragraph>
    </Chapter>
);
