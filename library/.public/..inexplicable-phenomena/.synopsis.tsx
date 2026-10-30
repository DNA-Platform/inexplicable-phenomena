import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../.manual/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            The library of inexplicable phenomena: the one book here filed under its own subject, which is what
            makes it the top of the library, and under it the team that works on these phenomena, the subjects
            their work falls into, and the manual the library is built with. A book here is a project or a
            catalogue of projects.
        </Paragraph>
    </Chapter>
);
