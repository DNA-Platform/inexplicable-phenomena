import { Author, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ A Paper ]]</Title>
        <Author>*[[ A Persona ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
