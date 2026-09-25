import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>An ordinary book: written by the log, filed under the library, about the work.</Paragraph>
    </Chapter>
);
