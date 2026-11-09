import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../../.reference/4-the-faces~code.tsx';
import ArithmeticNotebookSynopsis from '../.notebook/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Notebook of Arithmetic ]]( Arithmetic Notebook )</Title>
        <Synopsis>{ArithmeticNotebookSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Notebook of Arithmetic ]]( Arithmetic Notebook )</Means>
        </Paragraph>
    </Chapter>
);
