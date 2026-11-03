import { Chapter, Means, Paragraph, Title } from '@dna-platform/public';
import { Synopsis } from '../../.reference/4-the-faces~code.tsx';
import MathematicalPrinciplesSynopsis from '../.textbook/.synopsis.tsx';

export default () => (
    <Chapter>
        <Title>[[ Principia Veritatem Identificandi ]]( Mathematical Principles )</Title>
        <Synopsis>{MathematicalPrinciplesSynopsis()}</Synopsis>
        <Paragraph>
            <Means>$[[ Principia Veritatem Identificandi ]]( Mathematical Principles )</Means>
        </Paragraph>
    </Chapter>
);
