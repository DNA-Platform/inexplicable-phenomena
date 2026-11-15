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
            written in its own form on Doug's rulings of 12 November 2026; and then the content of 15 November,
            the thing that holds a specification on its back and an identification on its front, toggled, with
            a purpose, a project, the project's progress and an author on every part, its object model said
            back in its chapter for his corrections.
        </Paragraph>
    </Chapter>
);
