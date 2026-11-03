import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import ChemistrySynopsis from '../chemistry/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Chemistry ]]</Title>
        <Synopsis>{ChemistrySynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Chemistry ]]</Means>
        </Paragraph>
    </Chapter>
);
