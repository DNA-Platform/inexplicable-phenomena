import { Chapter, Title } from '@dna-platform/public';
import { Synopsis } from '../manual/.book';
import LibbySynopsis from '../libby/.synopsis';

export default () => (
    <Chapter>
        <Title>[[ Of Libby ]]</Title>
        <Synopsis>{LibbySynopsis()}</Synopsis>
    </Chapter>
);
