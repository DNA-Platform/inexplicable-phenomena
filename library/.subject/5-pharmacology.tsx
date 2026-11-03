import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../.reference/4-the-faces~code.tsx';
import PharmacologySynopsis from '../pharmacology/.subject/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Pharmacology ]]</Title>
        <Synopsis>{PharmacologySynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Pharmacology ]]</Means>
        </Paragraph>
    </Chapter>
);
