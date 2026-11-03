import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import PhilosophySynopsis from '../philosophy/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Philosophy ]]</Title>
        <Synopsis>{PhilosophySynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Philosophy ]]</Means>
        </Paragraph>
    </Chapter>
);
