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
            The publications the paper's notes lean on, catalogued in one place and listed alphabetically: each a
            chapter carrying one citation, the notes on what the publication is to the paper, and the text beside it
            with a picture of its first page where its terms allow, or its address where they do not. Fifteen, from
            Beltrami to Turing, Gödel's of 1931 among them in English.
        </Paragraph>
    </Chapter>
);
