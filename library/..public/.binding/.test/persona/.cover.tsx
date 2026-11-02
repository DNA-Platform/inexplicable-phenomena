import { About, Author, Biography, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Catchword } from '../manual/.book';

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
