import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library of Mathematics ]]( Mathematical Library )</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Mathematics ]]</Subject>
        <Tagline>The publications the paper's notes lean on.</Tagline>
    </Chapter>
);
