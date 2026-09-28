import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            A book that may write, because Libby catalogues it and Libby wrote it. It is the only author here
            besides Libby, and everything it writes is vouched for through that one fact.
        </Paragraph>
        <Catchword />
    </Chapter>
);
