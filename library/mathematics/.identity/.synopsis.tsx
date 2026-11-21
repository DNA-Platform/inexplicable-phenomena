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
            A blog of mathematical insights, written in the subject's own voice. It was always meant to be one: a
            subject's account of its own formalization, in the first person, under the pseudonym of mathematics
            itself. The posts carry my insights and mathematics speaks them, and the switch of perspective between
            the two of us is not built yet — it comes later, on my word of 21 November 2026.
        </Paragraph>
        <Paragraph>
            What the blog is about, beyond the mathematics: how much more accessible mathematics has become in the
            wake of AI. Results that would have taken a season of reading now take an afternoon of asking; a proof
            assistant that once demanded a specialist now answers an amateur; and a subject that was reached
            through its guild is reachable through a conversation. That is the change the posts keep returning to,
            and the first of them is about what it is like to work that way.
        </Paragraph>
    </Chapter>
);
