import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Tagline } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Design ]]</Title>
        <Author>*[[ Doug ]]( Our Team )</Author>
        <Subject>**[[ Inexplicable Phenomena ]]</Subject>
        <Tagline>Sketches of how this library might look.</Tagline>
    </Chapter>
);
