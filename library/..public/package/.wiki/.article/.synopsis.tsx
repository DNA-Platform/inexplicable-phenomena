import { $Chapter, Image, Paragraph, Synopsis, Title } from '@dna-platform/public';
import { BookLink } from '../.book';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis print>
                <Title print={false}>From Wikipedia</Title>
                <Paragraph>From Wikipedia, the free encyclopedia</Paragraph>
                <Image source="https://thumb.wikimedia.org/wikipedia/en/thumb/1/1b/Semi-protection-shackle.svg/20px-Semi-protection-shackle.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="20" height="20">Page semi-protected</Image>
                <Paragraph>
                    &lt; <BookLink>[Wikipedia:Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>
                </Paragraph>
            </Synopsis>
        );
    }
}
