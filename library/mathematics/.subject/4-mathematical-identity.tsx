import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';
import MathematicalIdentitySynopsis from '../.identity/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Biography of Subjective Identity ]]( Mathematical Identity )</Title>
        <Synopsis>{MathematicalIdentitySynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Biography of Subjective Identity ]]( Mathematical Identity )</Means>
        </Paragraph>
    </Chapter>
);
