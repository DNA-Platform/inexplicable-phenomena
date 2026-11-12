import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Notebook of Arithmetic ]]( Arithmetic Notebook )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Arithmetic ]]</Subject>
        <Tagline>The notes of the paper, The Subject of Arithmetic.</Tagline>
    </Chapter>
);
