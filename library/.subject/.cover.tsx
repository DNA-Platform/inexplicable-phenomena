import { About, Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library of Subjectivity ]]( Our Library )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Inexplicable Phenomena ]]</Subject>
        <About>[[ Inexplicable Phenomena ]]</About>
        <Tagline>The catalogue of the library, whose subject is itself.</Tagline>
    </Chapter>
);
