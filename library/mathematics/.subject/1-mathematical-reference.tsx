import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';
import MathematicalReferenceSynopsis from '../.reference/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Referential Objectivity ]]( Mathematical Reference )</Title>
        <Synopsis>{MathematicalReferenceSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Referential Objectivity ]]( Mathematical Reference )</Means>
        </Paragraph>
    </Chapter>
);
