import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../../.manual/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            A dictionary, in the first dictionary's own words: colloquially, a canonical source of canonical
            definitions; semantically, a catalogue of definitions, and so the one entry of this book that is the
            book itself. Twelve words stand here, one chapter each, in the order of the alphabet: eight with the
            senses the first dictionary gave them, and four that stand so that their definitions have somewhere
            to go.
        </Paragraph>
    </Chapter>
);
