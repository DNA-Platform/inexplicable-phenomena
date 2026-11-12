import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Project of Arithmetic ]]( Arithmetic Project )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Arithmetic ]]</Subject>
        <Tagline>The sprints and plans of arithmetic.</Tagline>
    </Chapter>
);
