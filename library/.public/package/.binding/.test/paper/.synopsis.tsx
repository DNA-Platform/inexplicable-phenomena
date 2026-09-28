import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            Written by the persona and filed under the library, so its author and its subject are two different
            books. It is the book the others point at, and the one with the most references in it.
        </Paragraph>
        <Catchword />
    </Chapter>
);
