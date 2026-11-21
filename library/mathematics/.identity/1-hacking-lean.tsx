import { Append, Chapter, Paragraph, Part, Title } from '@dna-platform/public';
import { Subtitle } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Part>The Posts</Part>
        <Title>
            [[ Hacking Lean ]]
            <Subtitle>A reflection on recent developments with Riemann</Subtitle>
        </Title>
        <Paragraph>
            The post is drafted beside this chapter, in the markdown document appended to it, and I write there.
            The draft is integrated into this chapter's own writing by hand once it says what I want it to say,
            and it is kept afterwards because a draft is a record.
        </Paragraph>
        <Append
            identifier="post"
            type=".md"
        >
            ![[ post.md ]]
        </Append>
    </Chapter>
);
