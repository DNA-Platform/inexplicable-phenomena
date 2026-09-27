import { About, Author, Biography, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Biography />
        <Title>[[ A Persona ]]</Title>
        <Author>*[[ The Log ]]</Author>
        <Subject>**[[ The Log ]]</Subject>
        <About>[[ A Persona ]]</About>
        <Catchword />
    </Chapter>
);
