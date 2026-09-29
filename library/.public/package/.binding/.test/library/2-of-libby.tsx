import { Chapter, Synopsis, Title } from '@dna-platform/public';
import LibbySynopsis from '../libby/.synopsis';

export default () => (
    <Chapter>
        <Title>[[ Of Libby ]]</Title>
        <Synopsis>{LibbySynopsis()}</Synopsis>
    </Chapter>
);
