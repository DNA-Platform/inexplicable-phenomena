import { Chapter, Means, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../../.manual/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            Pharmacology, in its own words a subject of the library, documented with <Means>$[[ Chemistry ]]</Means>.
            Nothing is filed under it yet; the subject stands so that its first book has somewhere to go.
        </Paragraph>
    </Chapter>
);
