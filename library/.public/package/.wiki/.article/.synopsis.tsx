import { Image, Paragraph, Synopsis } from '@dna-platform/public';
import { BookLink } from '../.chapter';
import $Chapter from './.chapter';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis print>
                <Paragraph>From Wikipedia, the free encyclopedia</Paragraph>
                <Image source="https://thumb.wikimedia.org/wikipedia/en/thumb/1/1b/Semi-protection-shackle.svg/20px-Semi-protection-shackle.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="20px" height="20px">Page semi-protected</Image>
                <Paragraph>
                    &lt; <BookLink>[Wikipedia:Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style)</BookLink>
                </Paragraph>
            </Synopsis>
        );
    }
}
