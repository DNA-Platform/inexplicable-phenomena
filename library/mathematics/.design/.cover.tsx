import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ Subjective Design ]]( Mathematical Design )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Mathematics ]]</Subject>
        <Tagline>The design of the books of mathematics.</Tagline>
    </Chapter>
);
