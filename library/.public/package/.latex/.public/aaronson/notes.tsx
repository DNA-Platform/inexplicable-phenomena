import { $ } from '@dna-platform/chemistry';
import { $Chapter, Entry, Heading, Notes, Section } from '@dna-platform/public';

export default class $NotesChapter extends $Chapter {
    print() {
        return (
            <Notes>
                <Section>
                    <Heading>Notes</Heading>
                    <Entry>{"note2: Because I was asked: “yellow books” are the Springer mathematics books that line many mathematicians’ offices."}</Entry>
                    <Entry>{"note4: As an amusing side note, there’s a trick calledLevin’s universal search[168], in which one “dovetails” over all"}</Entry>
                    <Entry>{"note8: Or one could consider theminimumnumber of steps along any accepting path; the resulting class will be the same."}</Entry>
                    <Entry>{"note10: Technically, Daskalakis et al. showed that the search problem of finding a Nash equilibrium is complete for a complexity class calledPPAD.This could be loosely interpreted as saying that the problem is “as close toNP-hard as it could possibly be, subject to Nash’s theorem showing why the decision version is trivial.”"}</Entry>
                    <Entry>{"note11: In defining thekthlevel of the hierarchy, we could also have given oracles forΠPk−"}</Entry>
                    <Entry>{"note1: rather than ΣPk−"}</Entry>
                    <Entry>{"note1: : it doesn’t matter.Note also that “an oracle for complexity classC” should be read as “an oracle for anyC-complete languageL.”"}</Entry>
                    <Entry>{"note12: This requires one nontrivial result, that every prime number has a succinct certificate—or in other words, that primality testing is inNP[211].Since 2002, it is even known that primality testing is inP[15]."}</Entry>
                    <Entry>{"note16: A further surprising result from 1987, called theImmerman-Szelepcs´enyi Theorem[131, 254], says that the"}</Entry>
                    <Entry>{"note19: In the literature,LOGSPACEandNLOGSPACEare often simply calledLandNLrespectively."}</Entry>
                    <Entry>{"note30: Despite the term “circuit,” which comes from electrical engineering, circuits in theoretical computer science are ironicallyfreeof cycles; they proceed from the inputs to the output via layers of logic gates."}</Entry>
                    <Entry>{"note32: If each logic gate depends on at most 2 inputs, then log"}</Entry>
                    <Entry>{"note2: nis the smallest depth that allows the output to depend on allninput bits."}</Entry>
                    <Entry>{"note34: That is, a graph where every two vertices are connected by an edge with independent probabilityp."}</Entry>
                    <Entry>{"note35: But making matters more complicated still,survey propagation fails badly on random4Sat."}</Entry>
                    <Entry>{"note37: By contrast, public-keydigital signature schemes—that is, ways to authenticate a message without a shared secret key—can be constructed under the sole assumption that OWFs exist.See for example Rompel [225]."}</Entry>
                    <Entry>{"note38: At least, not forarbitrarypolynomials computed by small formulas or circuits.A great deal of progress has been made derandomizingPITfor restricted classes of polynomials.In fact, the deterministic primality test of Agrawal, Kayal, and Saxena [15] was based on a derandomization of one extremely special case ofPIT."}</Entry>
                    <Entry>{"note39: One can also consider theQMA-complete problems, which are a quantum generalization of theNP-complete problems themselves (see [54]), but we won’t pursue that here."}</Entry>
                    <Entry>{"note41: For example, if the world is governed by quantum mechanics as physicists currently understand it, thenC=BQP."}</Entry>
                    <Entry>{"note43: With some effort, Shannon’s lower bound can be shown to be tight: that is, everyn-variable Boolean functioncanbe represented by a circuit of sizeO(2n/n).(The obvious upper bound isO(n2n).)"}</Entry>
                    <Entry>{"note44: Crucially, this will be a different language for eachk; otherwise we’d getPSPACE̸⊂P/poly, which is far beyond our current ability to prove."}</Entry>
                    <Entry>{"note1: ⊕· · ·⊕xncan be written asy⊕z, wherey:=x"}</Entry>
                    <Entry>{"note2: andz:=xn/2+1⊕ · · · ⊕xn.This in turn can be written as (y∧z)∨(y∧z).Expanding recursively now yields a size-n"}</Entry>
                    <Entry>{"note2: formula forParity, made of AND, OR, and NOT gates."}</Entry>
                    <Entry>{"note0: [m] circuits—though in that case, the lower bound applies only toNEXP-complete problems, and polynomials are only one ingredient in the proof among many."}</Entry>
                    <Entry>{"note50: In theoretical computer science, the termnon-negligiblemeans lower-bounded by 1/nO(1)."}</Entry>
                    <Entry>{"note0: has been a longstanding open problem, as discussed in Section 6.2.4."}</Entry>
                    <Entry>{"note60: Indeed, everyfnhas an extension to a degree-npolynomial, namely amultilinearone (in which no variable is raised to a higher power than 1): for example, OR (x, y) =x+y−xy."}</Entry>
                    <Entry>{"note1: −Ω(1)space must also use Ω(n·√logn/log logn)time."}</Entry>
                    <Entry>{"note0: [lcm (m"}</Entry>
                    <Entry>{"note2: , . . .)].On the other hand, if we allow MOD-mgates fornon-constantm(and in particular, formgrowing polynomially withn), then we jump up toTC"}</Entry>
                    <Entry>{"note66: Interestingly, both the polynomial method and the proof of Lemma 68 are also closely related to the proof of Toda’s Theorem (Theorem 13), thatPH⊆P#P."}</Entry>
                    <Entry>{"note70: This strengthens a previous result of Impagliazzo, Kabanets, and Wigderson [134], who showed that, if such a deterministic algorithm exists that runs in 2no(1)time, thenNEXP̸⊂P/poly."}</Entry>
                    <Entry>{"note71: I’ll restrict to fields here for simplicity, but one can also consider (e.g.) rings."}</Entry>
                    <Entry>{"note2: , but not equal as formal polynomials."}</Entry>
                    <Entry>{"note73: The central difference between thePR?=NPRandPC?=NPCquestions is simply that, becauseRis an ordered field, one defines Turing machines overRto allow comparisons (<,≤) and branching on their results."}</Entry>
                    <Entry>{"note78: Indeed, #Pwould even have polynomial-size circuits of depth logO(1)n."}</Entry>
                    <Entry>{"note80: We can also talk about fixed constant depths in theAC"}</Entry>
                    <Entry>{"note0: case, but if we do, the conclusions are weaker.For example, if we managed to prove a 2Ω(n)size lower bound againstAC"}</Entry>
                    <Entry>{"note0: circuits of depth 3, for some languageL, then we could deduce from Theorem 52 that anyNLOGSPACEmachine forLwould require Ω(n"}</Entry>
                    <Entry>{"note2: /log"}</Entry>
                    <Entry>{"note2: n)time."}</Entry>
                    <Entry>{"note83: An immediate corollary is that any multilinearcircuitfor Per (X) or Det (X) requiresdepthΩ(log"}</Entry>
                    <Entry>{"note84: For simplicity, here I’ll assume that we mean an “ordinary” (Boolean) polynomial-time algorithm, though one could also require polynomial-time algorithms in the arithmetic model."}</Entry>
                    <Entry>{"note90: See Grochow [114, Proposition 3.4.9] for a simple proof of this, via a dimension argument."}</Entry>
                    <Entry>{"note95: A languageLis calledP-completeif (1)L∈P, and (2) everyL′∈Pcan be reduced toLby some form of reduction weaker than arbitrary polynomial-time ones (LOGSPACEreductions are often used for this purpose)."}</Entry>
                    <Entry>{"note96: This result of Lipton’s provided the germ of the proof thatIP=PSPACE; see Section 6.3.1.Mulmuley’s test improves over Lipton’s by, for example, requiring only nonadaptive queries toCrather than adaptive ones."}</Entry>
                    <Entry>{"note97: A standard example is the 2×2×2 tensor whose (2,1,1), (1,2,1), and (1,1,2) entries are all 1, and whose 5 remaining entries are all 0.One can check that this tensor has a rank of 3 but border rank of 2."}</Entry>
                    <Entry>{"note1: , . . . , xℓdoesn’t depend onC."}</Entry>
                    <Entry>{"note106: Examples are deleting two successive NOT gates, or applying de Morgan’s laws.By the completeness of Boolean"}</Entry>
                </Section>
            </Notes>
        );
    }
}
