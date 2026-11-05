import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import NeuroscienceSynopsis from '../neuroscience/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Neuroscience ]]</Title>
        <Synopsis>{NeuroscienceSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Neuroscience ]]</Means>
        </Paragraph>
    </Chapter>
);
