import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Arithmetic ]]</Subject>
        <Tagline>The results of arithmetic, stated and proved.</Tagline>
    </Chapter>
);
