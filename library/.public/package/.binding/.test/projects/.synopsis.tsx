import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>An ordinary book: written by Libby, filed under the library, about the work.</Paragraph>
        <Catchword />
    </Chapter>
);
