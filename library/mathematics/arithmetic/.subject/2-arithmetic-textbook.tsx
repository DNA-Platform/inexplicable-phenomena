import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../../.reference/4-the-faces~code.tsx';
import ArithmeticTextbookSynopsis from '../.textbook/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Title>
        <Synopsis>{ArithmeticTextbookSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Means>
        </Paragraph>
    </Chapter>
);
