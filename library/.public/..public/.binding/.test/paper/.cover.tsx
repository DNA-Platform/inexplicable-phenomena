import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ A Paper ]]</Title>
        <Author>*[[ A Persona ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
