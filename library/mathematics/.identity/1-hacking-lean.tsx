import { Append, Chapter, Paragraph, Part, Question, Thought, Title } from '@dna-platform/public';
import { Subtitle } from '../../.reference/4-the-faces~code.tsx';
import { Post } from '../../.reference/8-the-books~code.tsx';

export default () => (
    <Chapter>
        <Part>The Posts</Part>
        <Title>
            [[ Hacking Lean ]]
            <Subtitle>A Reflection on Riemann</Subtitle>
        </Title>
        <Post at="2026-11-21" />
        <Paragraph>
            <Thought>
                This reminds me of Scott Aaronson talking about the difference between classical and quantum
                computing. In theory the same functions are computable, but in practice a quantum computer can
                compute things that no classical system will be able to verify. Clearly, in this analogy, we humans
                are the classical system and this proof is a product of the quantum realm.
            </Thought>
            Watching the Riemann story unfold has been fascinating. It is humbling to imagine that we might be
            staring at a profound mathematical truth that we might not be able to understand. Hopefully
            mathematicians will be able to simplify this one and extract the critical insights. But we know that
            proofs can be unbounded in length, so if not this proof, what about the next one, and the next? What
            happens ten years from now?
        </Paragraph>
        <Paragraph>
            <Question>
                Doug, 21 November 2026, in the draft: "state something about variants which are not equivalent but
                exist in situations that have more symmetry have elementary solutions, so that maybe symmetry is
                the key." The sentence is yours to write and the references it wants are being found; this note
                stands in its place rather than words I would have put in your mouth.
            </Question>
            It has always been my suspicion that results related to the distribution of the primes might be
            unprovable.
        </Paragraph>
        <Append
            identifier="post"
            type=".md"
        >
            ![[ post.md ]]
        </Append>
    </Chapter>
);
