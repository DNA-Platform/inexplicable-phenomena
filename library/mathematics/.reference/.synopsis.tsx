import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Parenthetical />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            The specification of mathematics in this library: a part for the books of the subject — the notebook,
            the textbook, the project, the library and the design — one chapter per book, tracking the idioms its
            chapters follow, with the enforcing code standing with the chapter that states the idiom and the rest
            marked held by hand; and a part for the forms, opening with the specification of a specification —
            a title with a numbered list of lists, items cited by number, the specification and the thing it
            specifies moving back and forth, and never thrown away, a change made by changing the specification —
            written in its own form on Doug's rulings of 12 November 2026.
        </Paragraph>
    </Chapter>
);
