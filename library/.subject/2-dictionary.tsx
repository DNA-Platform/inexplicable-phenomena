import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import DictionarySynopsis from './dictionary/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Dictionary ]]</Title>
        <Synopsis>{DictionarySynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Dictionary ]]</Means>
        </Paragraph>
    </Chapter>
);
