import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Forms</Part>
        <Title>[[ The Specification ]]</Title>
        <Paragraph>
            The specification of a specification, ruled by Doug on 12 November 2026 and written in its own form.
            For right now a synopsis is a title for the specification with a numbered list of lists, and in a
            book's synopsis we write the specification of what the book is supposed to be; the first
            is <Means>$[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Means>'s.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The form</Line>
            <Line>1.1 A specification is a title with a numbered list of lists.</Line>
            <Line>1.2 Every item carries its number, and things are referenced across the specification by those numbers.</Line>
            <Line>1.3 For right now, the specification of a book is written in its synopsis.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The two forms</Line>
            <Line>2.1 A thing shows in specification form or in implementation form.</Line>
            <Line>2.2 The specification and the thing it specifies move back and forth, each reachable from the other.</Line>
            <Line>2.3 In a chapter the formalization, the explanation and the presentation are each specified, and each moves back and forth with its specification.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>3. The justification</Line>
            <Line>3.1 The implementation is annotated with justifications.</Line>
            <Line>3.2 A justification says how the implementation satisfies the specification, citing items by number.</Line>
            <Line>3.3 A justification is a visible annotation, toggled in the UI.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>4. The interpolation</Line>
            <Line>4.1 What is specified and not yet built stands as a placeholder for itself.</Line>
            <Line>4.2 An item with no implementation to move to is the placeholder.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>5. The permanence</Line>
            <Line>5.1 Specifications are not thrown away; they stay, to be read and improved.</Line>
            <Line>5.2 A change is made by changing the specification, so changes are made in the context of all the other parts.</Line>
        </Paragraph>
        <Paragraph>
            The components of the library that show a thing in specification against implementation form, carry
            the movement between the two, and bear the justifications begin from this chapter, and they will
            stand beside it as its code. Until they do, the form is held by hand — the numbers written in the
            lines, the movement by mention.
        </Paragraph>
    </Chapter>
);
