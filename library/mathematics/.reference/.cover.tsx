import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ Referential Objectivity ]]( Mathematical Reference )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Mathematics ]]</Subject>
        <Tagline>The specification of mathematics in this library.</Tagline>
    </Chapter>
);
