import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import PhysicsSynopsis from '../physics/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Physics ]]</Title>
        <Synopsis>{PhysicsSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Physics ]]</Means>
        </Paragraph>
    </Chapter>
);
