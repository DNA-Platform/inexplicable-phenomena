import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            A book that may write, because the log catalogues it and the log wrote it. It is the only author here
            besides the log, and everything it writes is vouched for through that one fact.
        </Paragraph>
    </Chapter>
);
