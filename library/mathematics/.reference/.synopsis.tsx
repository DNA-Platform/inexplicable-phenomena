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
            marked held by hand.
        </Paragraph>
    </Chapter>
);
