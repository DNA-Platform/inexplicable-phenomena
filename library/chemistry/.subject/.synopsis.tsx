import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../../.subject/.manual/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            The catalogue of chemistry: every book of chemistry in this library is filed under it.
        </Paragraph>
    </Chapter>
);
