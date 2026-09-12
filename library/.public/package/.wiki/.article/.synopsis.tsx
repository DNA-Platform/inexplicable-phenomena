import { Paragraph, Synopsis } from '@dna-platform/public';
import $Chapter from './.chapter';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis print>
                <Paragraph>From Wikipedia, the free encyclopedia</Paragraph>
            </Synopsis>
        );
    }
}
