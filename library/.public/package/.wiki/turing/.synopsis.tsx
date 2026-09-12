import { $Chapter, Image, Paragraph, Synopsis } from '@dna-platform/public';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Synopsis print>
                <Paragraph>From Wikipedia, the free encyclopedia</Paragraph>
                <Image source="https://thumb.wikimedia.org/wikipedia/en/thumb/9/94/Symbol_support_vote.svg/20px-Symbol_support_vote.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="19" height="20">This is a good article. Click here for more information.</Image>
                <Image source="https://thumb.wikimedia.org/wikipedia/en/thumb/1/1b/Semi-protection-shackle.svg/20px-Semi-protection-shackle.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" width="20" height="20">Page semi-protected</Image>
            </Synopsis>
        );
    }
}
