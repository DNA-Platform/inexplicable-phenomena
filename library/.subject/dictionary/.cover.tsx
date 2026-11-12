import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ Dictionary ]]</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Inexplicable Phenomena ]]</Subject>
        <Tagline>A catalogue of definitions, one of them this book.</Tagline>
    </Chapter>
);
