import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import TheDesignSynopsis from './.design/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Design ]]</Title>
        <Synopsis>{TheDesignSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Design ]]</Means>
        </Paragraph>
    </Chapter>
);
