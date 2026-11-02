import { About, Author, Autobiography, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Cover />
        <Autobiography />
        <Title>[[ Libby ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <About>[[ Libby ]]</About>
        <Catchword />
    </Chapter>
);
