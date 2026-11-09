import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';
import MathematicalLibrarySynopsis from '../.library/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Library of Mathematics ]]( Mathematical Library )</Title>
        <Synopsis>{MathematicalLibrarySynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ The Library of Mathematics ]]( Mathematical Library )</Means>
        </Paragraph>
    </Chapter>
);
