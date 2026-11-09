import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';
import ArithmeticSynopsis from '../arithmetic/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Subject of Arithmetic ]]( Arithmetic )</Title>
        <Synopsis>{ArithmeticSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Subject of Arithmetic ]]( Arithmetic )</Means>
        </Paragraph>
    </Chapter>
);
