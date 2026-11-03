import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import OurMathSynopsis from '../mathematics/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Subjective Mathematics ]]( Our Math )</Title>
        <Synopsis>{OurMathSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Subjective Mathematics ]]( Our Math )</Means>
        </Paragraph>
    </Chapter>
);
