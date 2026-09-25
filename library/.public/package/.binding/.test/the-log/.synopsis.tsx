import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            The one book here that is by what it is about. Every other book is written by it or by something it
            has vouched for, so authorship in this library begins here and nowhere else.
        </Paragraph>
    </Chapter>
);
