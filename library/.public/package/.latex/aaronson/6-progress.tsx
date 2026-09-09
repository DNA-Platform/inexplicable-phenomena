import { $ } from '@dna-platform/chemistry';
import { Citation, Equation, Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Progress</Heading>
            <Paragraph>One common view among mathematicians is that questions like P = NP, while undoubtedly im- portant, are just too hard to make progress on in the present state of mathematics. It’s true that we seem to be nowhere close to a solution, but in this section, I’ll build a case that the extreme pessimistic view is unwarranted. I’ll explain what genuine knowledge I think we have, relevant to proving P ̸= NP, that we didn’t have thirty years ago or in many cases ten years ago. One could argue that, if P ̸= NP is a distant peak, then all the progress has remained in the foothills. On the other hand, scaling the foothills has already been nontrivial, so anyone aiming for the summit had better get acquainted with what’s been done.</Paragraph>
            <Section>
                <Heading>Logical Techniques</Heading>
                <Paragraph>In the 1960s, Hartmanis and Stearns [122] realized that, by simply “scaling down” Turing’s diago- nalization proof of the undecidability of the halting problem, we can at least prove some separations between complexity classes. In particular, we can generally show that more of the same resource (time, memory, etc.) lets us decide more languages than less of that resource. Here’s a special case of their so-called Time Hierarchy Theorem. Theorem 37 (Hartmanis-Stearns [122]) P is strictly contained in EXP. Proof. Let</Paragraph>
                <Section>
                    <Heading>Circuit Lower Bounds Based on Counting</Heading>
                    <Paragraph>A related idea—not exactly “diagonalization,” but counting arguments made explicit—can also be used to show that certain problems can’t be solved by polynomial-size circuits. This story starts with Claude Shannon [235], who made the following fundamental observation in 1949. Proposition 39 (Shannon [235]) There exists a Boolean function f : &#123;0,1&#125; → &#123;0,1&#125;, on n variables, such that any circuit to compute f requires at least Ω (2 /n) logic gates. Indeed, almost all Boolean functions on n variables (that is, a 1 − o(1) fraction of them) have this property. Proof. There are 2 different Boolean functions f on n variables, but only</Paragraph>
                </Section>
                <Section>
                    <Heading>The Relativization Barrier</Heading>
                    <Paragraph>The magic of diagonalization, self-reference, and counting arguments is how abstract and general they are: they never require us to “get our hands dirty” by understanding the inner workings of algorithms or circuits. But as was recognized early in the history of complexity theory, the price of generality is that the logical techniques are extremely limited in scope.<Citation>[3](baker)</Citation></Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Combinatorial Lower Bounds</Heading>
                <Paragraph>Partly because of the relativization barrier, in the 1980s attention shifted to combinatorial ap- proaches: that is, approaches where one tries to prove superpolynomial lower bounds on the num- ber of operations of some kind needed to do something, by actually “rolling up one’s sleeves” and</Paragraph>
                <Section>
                    <Heading>Proof Complexity</Heading>
                    <Paragraph>Suppose we’re given a 3Sat formula φ, and we want to prove that φ has no satisfying assignments. One natural approach to this is called resolution: we repeatedly pick two clauses of φ, and then “resolve” the clauses (or “smash them together”) to derive a new clause that logically follows from the first two. This is most useful when one of the clauses contains a non-negated literal x, and the other contains the corresponding negated literal x. For example, from the clauses (x ∨ y) and (x ∨ z), it’s easy to see that we can derive (y ∨ z). The new derived clause can then be added to the list of clauses, and used as an input to future resolution steps.</Paragraph>
                </Section>
                <Section>
                    <Heading>Monotone Circuit Lower Bounds</Heading>
                    <Paragraph>Recall, from Section 5.2, that if we could merely prove that any family of Boolean circuits to solve some NP problem required a superpolynomial number of AND, OR, and NOT gates, then that would imply P ̸= NP, and even the stronger result NP ̸⊂ P/poly (that is, NP-complete problems are not efficiently solvable by nonuniform algorithms).</Paragraph>
                </Section>
                <Section>
                    <Heading>Small-Depth Circuits and the Random Restriction Method</Heading>
                    <Paragraph>Besides restricting the allowed gates (say, to AND and OR only), there’s a second natural way to “hobble” a circuit, and thereby potentially make it easier to prove lower bounds on circuit size. Namely, we can restrict the circuit’s depth, the number of layers of gates between input and output. If the allowed gates all have a fanin of 1 or 2 (that is, they all take only 1 or 2 input bits), then clearly any circuit that depends nontrivially on all n of the input bits must have depth at least log2 n. On the other hand, if we allow gates of unbounded fanin—for example, ANDs or XORs or MAJORITYs on unlimited numbers of inputs—then it makes sense to ask what can be computed even by circuits of constant depth. Constant-depth circuits are very closely related to neural networks, which also consist of a small number of layers of “logic gates” (i.e., the neurons), with each neuron allowed to have very large “fanin”—i.e., to accept input from many or all of the neurons in the previous layer.</Paragraph>
                    <Equation>{String.raw`\mathrm{PARITY} \notin \mathrm{AC}^0`}</Equation>
                    <Paragraph>The switching lemma, and one of the few unconditional separations.</Paragraph>
                </Section>
                <Section>
                    <Heading>Small-Depth Circuits and the Polynomial Method</Heading>
                    <Paragraph>For our purposes, the most important extension of Theorem 50 was achieved by Smolensky [243] and Razborov [221] in 1987. Let AC [m] be the class of languages decidable by a family of constant- depth, polynomial-size, unbounded-fanin circuits with AND, OR, NOT, and MOD-m gates (which output 1 if their number of ‘1’ input bits is divisible by m, and 0 otherwise). Adding in MOD-m gates seems like a natural extension of AC : for example, if m = 2, then we’re just adding Parity, one of the most basic functions not in AC .</Paragraph>
                </Section>
                <Section>
                    <Heading>The Natural Proofs Barrier</Heading>
                    <Paragraph>Despite the weakness of AC and AC [p] circuits, the progress on lower bounds for them suggested what seemed to many researchers like a plausible path to proving NP ̸⊂ P/poly, and hence P ̸= NP. That path is simply to generalize the random restriction and polynomial methods further and further, to get lower bounds for more and more powerful classes of circuits. The first step, of course, would be to generalize the polynomial method to handle AC [m] circuits, where m is not a prime power. Then one could handle what are called TC circuits: that is, constant-depth, polynomial-size, unbounded-fanin circuits with MAJORITY gates (or, as in a neural network, threshold gates, which output 1 if a certain weighted affine combination of the input bits exceeds 0, and 0 otherwise). Next, one could aim for polynomial-size circuits of logarithmic depth: that is, the class NC . Finally, one could push all the way to polynomial-depth circuits: that is, the class P/poly.<Citation>[4](razborov)</Citation></Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Arithmetization</Heading>
                <Paragraph>In the previous sections, we saw that there are logic-based techniques (like diagonalization) that suffice to prove P ̸= EXP and NEXP ̸⊂ P/poly, and that evade the natural proofs barrier, but that are blocked from proving P ̸= NP by the relativization barrier. Meanwhile, there are combinatorial techniques (like random restrictions) that suffice to prove circuit lower bounds against AC and AC [p], and that evade the relativization barrier, but that are blocked from proving lower bounds against P/poly (and hence, from proving P ̸= NP) by the natural proofs barrier.</Paragraph>
                <Section>
                    <Heading>IP = PSPACE</Heading>
                    <Paragraph>The story starts with a dramatic development in complexity theory around 1990, though not one that obviously bore on P ̸= NP or circuit lower bounds. In the 1980s, theoretical cryp- tographers became interested in so-called interactive proof systems, which are protocols where a computationally-unbounded but untrustworthy prover (traditionally named Merlin) tries to con- vince a skeptical polynomial-time verifier (traditionally named Arthur) that some mathematical statement is true, via a two-way conversation, in which Arthur can randomly generate challenges and then evaluate Merlin’s answers to them.</Paragraph>
                    <Equation>{String.raw`\mathrm{IP} = \mathrm{PSPACE}`}</Equation>
                    <Paragraph>Interactive proofs are exactly polynomial space, and the proof does not relativize.</Paragraph>
                </Section>
                <Section>
                    <Heading>Hybrid Circuit Lower Bounds</Heading>
                    <Paragraph>To recap, PSPACE ⊆ IP is a non-relativizing inclusion of complexity classes. But can we leverage that achievement to prove non-relativizing separations between complexity classes, with an eye toward P ̸= NP? Certainly, by combining IP = PSPACE with the Space Hierarchy Theorem (which</Paragraph>
                </Section>
                <Section>
                    <Heading>The Algebrization Barrier</Heading>
                    <Paragraph>In 2008, Avi Wigderson and I [10] showed that, alas, there’s a third barrier. In particular, while the arithmetic techniques used to prove IP = PSPACE do evade relativization, they crash up against a modified version of relativization that’s “wise” to those techniques. We called this modified barrier the algebraic relativization or algebrization barrier. We then showed that, in order to prove P ̸= NP—or for that matter, even to prove NEXP ̸⊂ P/poly, or otherwise go even slightly beyond the results of Section 6.3.2—we’d need techniques that evade the algebrization barrier (and also, of course, evade natural proofs).<Citation>[5](algebrization)</Citation></Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Ironic Complexity Theory</Heading>
                <Paragraph>There’s one technique that’s had some striking recent successes in proving circuit lower bounds, and that bypasses the natural proofs, relativization, and algebrization barriers. This technique might be called “ironic complexity theory.” It uses the existence of surprising algorithms in one setting</Paragraph>
                <Section>
                    <Heading>Time-Space Tradeoffs</Heading>
                    <Paragraph>At the moment, no one can prove that solving 3Sat requires more than linear time (let alone exponential time!), on realistic models of computation like random-access machines. Nor can anyone prove that solving 3Sat requires more than O (logn) bits of memory. But the situation isn’t completely hopeless: at least we can prove there’s no algorithm for 3Sat that uses both linear time and logarithmic memory! Indeed, we can do better than that.</Paragraph>
                </Section>
                <Section>
                    <Heading>NEXP ̸⊂ ACC</Heading>
                    <Paragraph>In Section 6.2.4, we saw how Smolensky [243] and Razborov [221] proved strong lower bounds against the class AC [p], or constant-depth, polynomial-size circuits of AND, OR, NOT, and MOD p gates, where p is prime. This left the frontier of circuit lower bounds as AC [m], where m is composite.<Citation>[6](williams)</Citation></Paragraph>
                    <Equation>{String.raw`\mathrm{NEXP} \not\subset \mathrm{ACC}`}</Equation>
                    <Paragraph>Williams, from a satisfiability algorithm barely faster than brute force.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Arithmetic Complexity Theory</Heading>
                <Paragraph>Besides Turing machines and Boolean circuits acting on bits, there’s another kind of computation that has enormous relevance to the attempt to prove P ̸= NP. Namely, we can consider computer programs that operate directly on elements of a field, such as the reals or complex numbers. Perhaps the easiest way to do this is via arithmetic circuits, which take as input a collection of elements x1, . . . , xn of a field F, and whose operations consist of adding or multiplying any two previous elements—or any previous element and any scalar from F—to produce a new F-element. We then</Paragraph>
                <Section>
                    <Heading>Permanent Versus Determinant</Heading>
                    <Paragraph>Just as P = NP is the “flagship problem” of Boolean complexity theory, so the central, flagship problem of arithmetic complexity is that of permanent versus determinant. This problem concerns the following two functions of an n × n matrix X ∈ F :</Paragraph>
                    <Equation>{String.raw`\mathrm{perm}(A) = \sum_{\sigma \in S_n} \prod_{i=1}^{n} a_{i,\sigma(i)}`}</Equation>
                    <Paragraph>The permanent: the determinant without its signs, and conjectured to be hard.</Paragraph>
                </Section>
                <Section>
                    <Heading>Arithmetic Circuit Lower Bounds</Heading>
                    <Paragraph>I won’t do justice in this survey to the now-impressive body of work motivated by Conjecture 72; in particular, I’ll say little about proof techniques. Readers who want to learn more about arithmetic circuit lower bounds should consult Shpilka and Yehudayoff [239, Chapter 3] for an excellent survey circa 2010, or Saraf [230] for a 2014 update. Briefly, though, computer scientists have tried to approach Conjecture 72 much as they’ve approached NP ̸⊂ P/poly, by proving lower bounds against more and more powerful arithmetic circuit classes. In that quest, they’ve had some notable successes (paralleling the Boolean successes), but have also run up against some differences from the Boolean case.</Paragraph>
                </Section>
                <Section>
                    <Heading>Arithmetic Natural Proofs?</Heading>
                    <Paragraph>In Section 6.5.2, we saw arithmetic circuit lower bounds that, again and again, seem to go “right up to the brink” of proving Valiant’s Conjecture, but then stop short. Given this, it’s natural to wonder what the barriers are to further progress in arithmetic complexity, and how they relate to the barriers in the Boolean case.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Geometric Complexity Theory</Heading>
                <Paragraph>I’ll end this survey with some extremely high-level remarks about Geometric Complexity Theory (GCT): an ambitious program to prove P ̸= NP and related conjectures using algebraic geometry and representation theory. This program has been pursued since the late 1990s; it was started by Ketan Mulmuley, with important contributions from Milind Sohoni and others. GCT has changed substantially since its inception: for example, as we’ll see, recent negative results by Ikenmeyer and Panova [130] among others have decisively killed certain early hopes for the GCT program, while still leaving many avenues to explore in GCT more broadly construed. Confusingly, the term “GCT” can refer either to the original Mulmuley-Sohoni vision, or to the broader interplay between complexity and algebraic geometry, which is now studied by a community of researchers, many of whom deviate from Mulmuley and Sohoni on various points. In this section, I’ll start by explaining the original Mulmuley-Sohoni perspective (even where some might consider it obsolete), and only later discuss more recent developments. Also, while the questions raised by GCT have apparently sparked quite a bit of interesting progress in pure mathematics—much of it only marginally related to complexity theory—in this section I’ll concentrate exclusively on the quest to prove circuit lower bounds.<Citation>[7](gct)</Citation></Paragraph>
                <Section>
                    <Heading>From Complexity to Algebraic Geometry</Heading>
                    <Paragraph>So what is GCT? It’s easiest to understand GCT as a program to prove Valiant’s Conjecture 72—that is, to show that any affine embedding of the n × n permanent over C into the m × m determinant over C requires (say) m = 2 , and hence, that the permanent requires exponential- size arithmetic circuits. GCT also includes an even more speculative program to prove Boolean lower bounds, such as NP ̸⊂ P/poly and hence P ̸= NP. However, if we accept the premises of GCT in the first place (e.g., the primacy of algebraic geometry for circuit lower bounds), then we might as well start with the permanent versus determinant problem, since that’s where the core ideas of GCT come through the most clearly.</Paragraph>
                </Section>
                <Section>
                    <Heading>Characterization by Symmetries</Heading>
                    <Paragraph>So far, it seems like all we’ve done is restated Valiant’s Conjecture in a more abstract language and slightly generalized it. But now we come to the main insight of GCT, which is that the permanent and determinant are both special, highly symmetric functions, and it’s plausible that we can leverage that fact to learn more about their orbit closures than we could if they were arbitrary functions. For starters, Per (X) is symmetric under permuting X’s rows or columns, transposing X, and multiplying the rows or columns by scalars that multiply to 1. That is, we have</Paragraph>
                </Section>
                <Section>
                    <Heading>The Quest for Obstructions</Heading>
                    <Paragraph>Because the permanent and determinant are characterized by their symmetries, and because they satisfy another technical property called “partial stability,” Mulmuley and Sohoni observe that a field called geometric invariant theory can be used to get a handle on their orbit closures. I won’t explain the details of how this works (which involve something called Luna’s Etale Slice Theorem´ [177]), but will just state the punchline.</Paragraph>
                </Section>
                <Section>
                    <Heading>GCT and P = NP</Heading>
                    <Paragraph>Suppose—let’s dream—that everything above worked out perfectly. That is, suppose GCT led to the discovery of explicit obstructions for embedding the padded permanent into the determinant, and thence to a proof of Valiant’s Conjecture 72. How would GCT go even further, to prove P ̸= NP?</Paragraph>
                </Section>
                <Section>
                    <Heading>Reports from the Trenches</Heading>
                    <Paragraph>In the past few years, there’s been a surprising amount of progress on resolving the truth or falsehood of some of GCT’s main hypotheses, and on relating GCT to mainstream complexity theory. This section relays some highlights from the rapidly-evolving story.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Lessons of GCT</Heading>
                    <Paragraph>Expert opinion is divided about GCT’s prospects. Some feel that GCT does little more than take complicated questions and make them even more complicated—and are emboldened in their skepticism by the recent no-go results [130, 68]. Others feel that GCT is a natural and reasonable approach, and that the complication is an inevitable byproduct of finally grappling with the real issues. Of course, one can also “cheer GCT from the sidelines” without feeling prepared to work on it oneself, particularly given the unclear prospects for any computer-science payoff in the foreseeable future. (Mulmuley once told me he thought it would take a hundred years until GCT led to major complexity class separations, and he’s the optimist!)</Paragraph>
                </Section>
                <Section>
                    <Heading>The Only Way?</Heading>
                    <Paragraph>In recent years, Mulmuley has advanced the following argument [191, 194, 193]: even if GCT isn’t literally the only way forward on P = NP, still, the choice of GCT to go after explicit obstructions is in some sense provably unavoidable—and furthermore, GCT is the “simplest” approach to finding the explicit obstructions, so Occam’s Razor all but forces us to try GCT first. I agree that GCT represents a natural attack plan. But I disagree with the claim that we have any theorem telling us that GCT’s choices are inevitable, or “basically” inevitable. In this section, I’ll explain why.</Paragraph>
                </Section>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
