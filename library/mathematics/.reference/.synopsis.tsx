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
            marked held by hand. A part for the forms stood beside it from my rulings of 12 November 2026 — the
            specification of a specification, and the content whose front is the deliverable and whose back is the
            project — and was struck whole on my word of 21 November, to be specified again from nothing; the
            subject's deliverable wore a theorem and a proof of its own there, and they are struck with it, never
            having been said in a chapter.
        </Paragraph>
    </Chapter>
);
