import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../../.reference/4-the-faces~code.tsx';
import ArithmeticProjectSynopsis from '../.project/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Project of Arithmetic ]]( Arithmetic Project )</Title>
        <Synopsis>{ArithmeticProjectSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Project of Arithmetic ]]( Arithmetic Project )</Means>
        </Paragraph>
    </Chapter>
);
