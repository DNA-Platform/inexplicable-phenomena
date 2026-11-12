import { About, Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Subject of Arithmetic ]]( Arithmetic )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Mathematics ]]</Subject>
        <About>[[ Arithmetic ]]</About>
        <Tagline>The catalogue of arithmetic, the paper once called Goldbach versus Gödel.</Tagline>
    </Chapter>
);
