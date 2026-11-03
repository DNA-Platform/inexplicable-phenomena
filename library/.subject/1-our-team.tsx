import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import OurTeamSynopsis from '../.identity/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Our Team ]]</Title>
        <Synopsis>{OurTeamSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Our Team ]]</Means>
        </Paragraph>
    </Chapter>
);
