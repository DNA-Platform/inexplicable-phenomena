import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import OurReferenceSynopsis from '../.reference/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Subjective Reference ]]( Our Reference )</Title>
        <Synopsis>{OurReferenceSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Subjective Reference ]]( Our Reference )</Means>
        </Paragraph>
    </Chapter>
);
