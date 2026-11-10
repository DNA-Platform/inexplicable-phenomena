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
            The papers referenced across mathematics in this library, catalogued in one place: each a chapter of
            Doug's carrying the paper's citation, with the paper itself beside it and read on the page. Gödel's of
            1931 first, in English.
        </Paragraph>
    </Chapter>
);
