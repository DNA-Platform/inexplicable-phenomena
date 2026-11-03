import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';
import MathematicalDesignSynopsis from '../.design/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Subjective Design ]]( Mathematical Design )</Title>
        <Synopsis>{MathematicalDesignSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Subjective Design ]]( Mathematical Design )</Means>
        </Paragraph>
    </Chapter>
);
