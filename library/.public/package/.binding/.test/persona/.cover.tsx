import { About, Author, Biography, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Cover />
        <Biography />
        <Title>[[ A Persona ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libby ]]</Subject>
        <About>[[ A Persona ]]</About>
        <Catchword />
    </Chapter>
);
