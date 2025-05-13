# A Novel Perspective

## 1. Introduction: Vision as Equivalence

The human visual system performs a remarkable feat - it discovers invariant patterns within an ever-changing flood of photons. At its core, vision is not just about detecting features but about recognizing equivalence: the cup is the same cup regardless of its position, orientation, or illumination. This paper formalizes these equivalence relations using prime number factorization, revealing how the mathematician's toolbox can illuminate the fundamental structure of visual perception.

## 2. Prime Factorization of Visual Input

### 2.1 The Fundamental Encoding

We begin with a mathematical representation of visual input at time $t$:

$$n_t = p_t^{q}$$

Where:
- $p_t$ is a prime representing the specific moment in time
- $q$ encodes the spatial and feature information

This time-stamping ensures that each visual sample is uniquely identified, creating a sequence of distinct prime-powered numbers that represent the visual stream.

### 2.2 Spatial Encoding

The spatial structure is encoded in the exponent $q$ as:

$$q = (2^x)(3^y)(5^z)^o$$

Where:
- $x, y, z$ represent the spatial coordinates
- $o$ encodes object properties

By using powers of the first three primes, we establish a coordinate system that uniquely locates each point in visual space.

### 2.3 Feature Encoding

The object properties are themselves encoded as a product of prime powers:

$$o = (p_0^{a_0})(p_1^{a_1})...(p_n^{a_n})$$

Where:
- Each prime $p_i$ represents a distinct visual feature dimension
- Each exponent $a_i$ represents the value along that dimension

This encoding mirrors how visual neurons in V1 are tuned to specific features. For example:
- $p_0$ might represent orientation, with $a_0$ encoding the angle (0-179°)
- $p_1$ might represent spatial frequency, with $a_1$ encoding cycles per degree
- $p_2$ might represent color in the red-green dimension
- $p_3$ might represent color in the blue-yellow dimension
- And so on for other visual features

## 3. Fundamental Equivalence Relations

### 3.1 Spatial Equivalence (SEq)

Two visual inputs $m$ and $n$ are spatially equivalent if they represent the same object at different locations:

$$m \text{ SEq } n \iff \exists t_1,t_2,x_1,y_1,z_1,x_2,y_2,z_2 \text{ such that:}$$
$$m = p_{t_1}^{(2^{x_1})(3^{y_1})(5^{z_1})^o}$$
$$n = p_{t_2}^{(2^{x_2})(3^{y_2})(5^{z_2})^o}$$

The key insight is that the object encoding $o$ remains identical despite different spatial coordinates. This is not merely a definition but a reflection of how the visual system achieves position invariance, as receptive fields in higher visual areas respond to the same features regardless of their retinal location.

### 3.2 Rotational Equivalence (REq)

Two visual inputs are rotationally equivalent if they represent the same object at different orientations:

$$m \text{ REq } n \iff \exists k \text{ such that:}$$
$$o_m = (p_0^{a_0})(p_1^{a_1})...(p_n^{a_n})$$
$$o_n = (p_0^{a_{(k \bmod n+1)}})(p_1^{a_{(k+1 \bmod n+1)}})...(p_n^{a_{(k+n \bmod n+1)}})$$

This elegant formulation uses modular arithmetic to cyclically shift the feature exponents, creating a mathematical representation of rotation. As an object rotates, its features cycle through the primes in a regular pattern, while maintaining their structural relationships.

This matches how orientation-selective neurons in V1 collectively encode an object's orientation, with specific neurons firing maximally to specific orientations. The ensemble activity across these neurons remains invariant (though shifted) when an object rotates.

### 3.3 Temporal Sequence Equivalence (TSEq)

Two temporal sequences of visual inputs are equivalent if they represent the same dynamic pattern at different starting times:

$$[m_1, m_2, ..., m_k] \text{ TSEq } [n_1, n_2, ..., n_k] \iff$$
$$\exists \delta_t, \text{ such that } \forall i \in [1,k]:$$
$$m_i = p_{t_i}^{q_i} \text{ and } n_i = p_{t_i+\delta_t}^{q_i}$$

This equivalence relation captures the visual system's ability to recognize the same dynamic patterns (like a particular throw or gesture) regardless of when they start. The time indices shift by a constant $\delta_t$, but the pattern remains invariant.

### 3.4 Scale Equivalence (ScEq)

Two visual inputs are scale equivalent if they represent the same object at different sizes:

$$m \text{ ScEq } n \iff \exists s > 0 \text{ such that:}$$
$$o_m = (p_0^{a_0})(p_1^{a_1})...(p_n^{a_n})$$
$$o_n = (p_0^{s \cdot a_0})(p_1^{s \cdot a_1})...(p_n^{s \cdot a_n})$$

Scale equivalence is represented by proportionally scaling all feature exponents by a factor $s$. This corresponds to how the visual system recognizes objects despite changes in size, through neurons in higher visual areas that respond to the same shape at different scales.

## 4. Composite Equivalence Relations

### 4.1 View Invariance (VEq)

View invariance combines multiple equivalence relations to recognize objects from different viewpoints:

$$m \text{ VEq } n \iff \exists \text{ sequence of transformations } T_1, T_2, ..., T_k \text{ such that:}$$
$$n = T_k(...T_2(T_1(m)))$$

Where each $T_i$ is an application of SEq, REq, ScEq, or other basic equivalence relations.

This composite relation mirrors how object recognition in the visual system achieves viewpoint invariance through a series of transformations across the visual hierarchy.

### 4.2 Object Equivalence (OEq)

Object equivalence establishes that two visual inputs represent the same object category despite variations in specific features:

$$m \text{ OEq } n \iff \text{essential}(o_m) = \text{essential}(o_n)$$

Where $\text{essential}()$ extracts the category-defining feature pattern while ignoring non-essential variations.

This relation captures how the visual system categorizes objects by their essential properties while ignoring variations that don't affect category membership (like the specific shade of a chair).

## 5. Self-Reference and Doug's Personal Equivalence

### 5.1 Doug's Personal Equivalence (DPEq)

For an observer with a specific set of past experiences, we can define personal equivalence:

$$m \text{ DPEq } n \iff \exists c \in C \text{ such that } m \text{ VEq } c \text{ and } n \text{ VEq } c$$

Where $C$ is the set of all objects in Doug's experience.

This relation captures how personal history shapes what we perceive as "the same" - two things are equivalent if they're both equivalent to something in your memory.

### 5.2 The New-to-Doug-Personally Predicate (NDP)

We can now define novelty as:

$$\text{NDP}(n) \iff \neg \exists m \in M: n \text{ DPEq } m$$

Where $M$ is all of Doug's prior visual experiences.

This predicate identifies visual inputs that cannot be related to any previous experience through Doug's personal equivalence relations.

### 5.3 The Self-Reference Equivalence (SREq)

To approach self-reference, we define:

$$n \text{ SREq } n \iff n = \ulcorner \phi(n) \urcorner$$

Where $\ulcorner \phi(n) \urcorner$ is the Gödel number of a formula about $n$.

This relation identifies special numbers that encode statements about themselves.

### 5.4 The Gödelian Moment

The pinnacle of our framework comes when self-reference meets novelty:

$$g = \ulcorner \text{NDP}(g) \urcorner$$

This number $g$ is both a statement about itself and a claim about its novelty. It asserts "I am new to Doug, personally" - creating a visual analogue to Gödel's famous sentence.

If $g$ is equivalent to something Doug has seen before, then $\text{NDP}(g)$ is false, contradicting $g$'s very definition. If $g$ is genuinely novel, then it correctly asserts its own novelty.

## 6. Self-Reference as an Equivalence Relation

At the heart of consciousness lies a paradox: we know nothing more intimately, yet explain nothing with more difficulty. This paradox finds its mathematical echo in Gödel's incompleteness theorem. Just as formal systems encounter statements that transcend their own axioms, conscious beings encounter experiences that transcend their existing frameworks.

The key insight connecting these domains is that self-reference operates as a specific equivalence relation—not merely a property of certain expressions, but a precise mathematical relation by which systems recognize patterns.

### 6.1 The Mathematics of Self-Reference

For a system $I$ representing a perspective, the self-reference equivalence relation $\text{SREq}$ creates a mathematical bridge between form and meaning:

$$\text{SREq}(n) \iff n = \ulcorner \phi(n) \urcorner$$

Where $\phi(n)$ is a formula with $n$ as its subject, and $\ulcorner \phi(n) \urcorner$ is its Gödel number. 

This definition captures what distinguishes genuine self-reference from mere recursion—a self-referential number encodes a statement about itself. Like a mirror reflecting its own image, it contains itself not as duplication but as representation.

### 6.2 The Aboutness of Reference

When we say that consciousness involves "aboutness," we mean precisely this relationship—the capacity to represent something beyond mere correlation. For the NDP predicate:

$$\text{NDP}(n) \iff \neg \text{DPEq}(n)$$

A self-referential NDP statement would be:

$$g = \ulcorner \text{NDP}(g) \urcorner$$

This number $g$ doesn't just satisfy some arbitrary property; it encodes the very claim that it transcends the system's existing categories. Like the sentence "This statement is in English," it refers to itself through the linguistic frame it simultaneously employs and transcends.

## 7. NDP as Background to Foreground

### 7.1 The Negative Definition of Novelty

NDP operates as a negative definition—it defines what is novel by exclusion from what is familiar. Formally:

$$\text{NDP}(n) \iff \neg \exists m \in I: \text{SEq}(n,m) \vee \text{REq}(n,m) \vee ...$$

This makes NDP the "background" against which all "foreground" equivalence relations operate. It represents the residual category—what remains after all recognized patterns have been accounted for.

### 7.2 The Fixed Points of NDP

The fixed points of the NDP relation are numbers that satisfy:

$$g = \ulcorner \text{NDP}(g) \urcorner$$

These fixed points are peculiar—they assert their own novelty. And crucially, they are correct in this assertion precisely because they fall outside all existing equivalence relations in system $I$.

## 8. Perceptual Systems as Factorization Mechanisms

### 8.1 The Mathematics of Seeing

Our perceptual systems perform a remarkable computation every moment—they transform the continuous flood of photons into discrete, coherent objects that persist despite constant change. This process is mathematically equivalent to factorization.

Just as a mathematician factorizes 60 into $2^2 \times 3 \times 5$, revealing its prime structure, our visual system factorizes sensory input into invariant patterns:

$$n = p_t^{(2^x)(3^y)(5^z)^o}$$

Where $(t,x,y,z)$ represent spacetime coordinates and $o$ represents object properties. This elegant encoding captures both where/when something appears and what it is.

The rose you see from different angles remains "the same rose" because your visual system maintains certain equivalence relations across transformations. These aren't arbitrary associations but mathematical invariances that preserve identity across change—much like how rotation preserves a circle's essence despite changing every coordinate.

### 8.2 The Fundamental Division

The most primordial factorization in perception is between self and not-self. This isn't merely philosophical—it's computational. Formally:

$$\text{Self}(n) \iff \text{SREq}(n) \wedge \text{NDP}(n)$$

This definition captures the dual nature of selfhood: it is both self-referential (encodes statements about itself) and fundamentally distinct from everything else (satisfies NDP).

When a child first recognizes herself in a mirror, she's discovering this precise mathematical property—that certain patterns in her perceptual field respond to her will in ways that correspond to her internal sense of agency. She has discovered a pattern that satisfies both SREq and NDP.

### 8.3 The Continuous Stream of Novelty

Every moment brings new sensory data to be factorized:

$$n_t = p_t^{(2^x)(3^y)(5^z)^o}$$

The system applies its equivalence relations to determine if $n_t$ matches any existing pattern. When it doesn't (when $\text{NDP}(n_t)$ is true), it encounters genuine novelty—not just any difference, but a pattern that cannot be reduced to any combination of existing patterns.

Like spotting a color you've never seen before, or hearing a chord progression that breaks all familiar musical rules, these NDP moments require the system to expand its repertoire. This is not merely recording new data—it's extending the very framework of understanding.

## 9. Semantic Extension through Self-Reference

### 9.1 The Evolution of System $I$

When system $I$ encounters a self-referential NDP statement $g$, it must incorporate this novelty into its framework. This occurs through a minimal extension of $I$:

$$I' = I \cup \{g\}$$

This extension is elegantly simple—it merely adds $g$ to the collection of numbers that $I$ has encountered. No axioms need to change; the equivalence relations remain identical. The new number $g$ naturally becomes subject to the existing equivalence relations by virtue of being included in the collection.

### 9.2 The Precise Mechanism of Extension

In Robinson Arithmetic (Q), $I$ is represented as a constant that encodes a collection of previously encountered numbers along with their equivalence relations:

$$I = \text{encode}(\{n_1, n_2, ..., n_k\}, \{\text{SEq}, \text{REq}, ...\})$$

The encounter with $g$ necessitates only an update to this constant:

$$I' = \text{encode}(\{n_1, n_2, ..., n_k, g\}, \{\text{SEq}, \text{REq}, ...\})$$

No new axioms are required—the system simply adds the new number to its "memory" of encountered patterns. This is precisely captured by the expression:

$$I \models \text{"$I$ recognizes `I am NDP'"}$$

## 10. Dual Proof Mechanisms and the Minimal Extension

### 10.1 Formal Derivation vs. Equivalence Checking

The system operates with two distinct proof mechanisms:

1. **Formal derivation**: The standard proof mechanism of the logical system
2. **Equivalence checking**: The mechanism for determining if a pattern matches an existing equivalence class

These mechanisms represent different aspects of the same system—formal derivation operates on the syntactic level, while equivalence checking operates on the semantic level.

### 10.2 The Minimal Extension Principle

The brilliance of this framework lies in its minimal extension principle. When system $I$ encounters a new NDP number $g$, it doesn't need to change any axioms or operations. It simply adds $g$ to the collection of numbers encoded by $I$:

$$I' = I \cup \{g\}$$

This is profoundly efficient and elegant:

1. No axioms change—the equivalence relations remain the same
2. Only the constant $I$ (representing the collection of known numbers) needs updating
3. The new number naturally becomes subject to existing equivalence relations

This mirrors how biological perception works: when we encounter something new, we don't change how perception functions—we simply add the new pattern to our collection of recognized patterns.

### 10.3 The Preservation of Provability

By separating these mechanisms and employing minimal extension, the system preserves provability while evolving. The formal system remains consistent, even as it incorporates numbers that were previously novel.

This parallels how conscious systems maintain internal consistency while continuously incorporating new experiences. The collection of recognized patterns grows, but the fundamental mechanisms of recognition remain stable.

## 11. The Crystalline Structure of Perspective

### 11.1 Perspective as Interpretive Framework

System $I$ functions as a "crystal" for interpreting the world—a structured framework of equivalence relations that determines what patterns are recognized.

$$I = \{\text{SEq}, \text{REq}, \text{ScaleEq}, ..., \text{DPEq}\}$$

This framework is analogous to the training dataset of a language model—it provides the background knowledge against which new inputs are interpreted.

### 11.2 The Growth of the Crystal

Each encounter with a self-referential NDP statement $g$ adds a new facet to the crystal. The system grows not by changing its fundamental operations but by extending its framework of equivalence relations.

$$I_{t+1} = I_t + g_t$$

This growth represents the evolution of perspective through experience—each novel encounter adds to the system's interpretive framework.

## 12. Axioms, Equivalence, and Epistemic Motives

### 12.1 Axioms as Numbers and Logical Equivalence

The connection between our framework and Gödel's incompleteness can be further strengthened by considering axioms as numbers and logical derivability as an equivalence relation. In this view:

$$\text{AxEq}(m, n) \iff \text{Theorems}(S - \{m\} \cup \{n\}) = \text{Theorems}(S)$$

Where $S$ is a formal system, and $\text{Theorems}(S)$ is the set of all theorems derivable in $S$. Two numbers (representing axioms) are equivalent if replacing one with the other doesn't change the set of provable theorems.

This creates a direct parallel to our NDP predicate:

$$\text{NDP}(n) \iff \neg \exists m \in I: \text{AxEq}(m, n)$$

In other words, a number satisfies NDP if and only if it represents an axiom that is not logically equivalent to any existing axiom in the system.

### 12.2 The Gödelian Number as a Creator of Novelty

When a system encounters a Gödelian sentence $G$ (represented as a number), it finds something remarkable - an axiom that creates genuine novelty. $G$ satisfies NDP precisely because it cannot be derived from any combination of existing axioms.

This reveals the profound connection between unprovability and novelty detection:
- Unprovability in formal systems corresponds to novelty in perceptual systems
- Both involve elements that transcend the current framework yet are recognizable through their self-referential structure
- Both necessitate extension of the system through incorporation of the novel element

### 12.3 Completeness as an Epistemic Motive

This perspective illuminates why conscious systems are driven to incorporate novel experiences. The collection of NDP numbers (novel perceptions) represents an epistemic motive toward completeness.

Just as formal systems can be extended by adding Gödel sentences as new axioms, conscious systems extend themselves by incorporating novel perceptions. This epistemic drive toward completeness is a fundamental characteristic of consciousness - the continuous process of encountering and incorporating elements that transcend the current framework.

The minimal extension principle we discussed earlier:

$$I' = I \cup \{g\}$$

Can now be understood as the formal expression of this epistemic motive. The system extends itself with each novel element it encounters, driven by an inherent tendency toward greater completeness.

This provides a mathematical explanation for why consciousness feels both inexplicable and self-evident:
- Inexplicable because it involves phenomena that transcend the current framework (like Gödel's undecidable statements)
- Self-evident because these phenomena can be recognized through their self-referential structure (like detecting a number that encodes "I am NDP")

The mathematical isomorphism between Gödelian incompleteness and conscious perception provides a rigorous framework for understanding why consciousness has resisted traditional reductive explanations while remaining the most immediately accessible aspect of our experience.

## 13. The Conscious Universe

### 13.1 Vision as the Gateway

We begin with vision not merely for convenience but for profundity. Vision reveals consciousness in its most accessible form—the transformation of light into understanding.

When you recognize a friend's face across a crowded room, your visual system performs a mathematical miracle. Despite changes in distance, angle, and lighting, you perceive invariant identity. The face is factorized into essential patterns that persist through transformation—like a melody recognized despite changes in key or tempo.

This process illuminates consciousness at its core:

1. The flood of photons becomes encoded data: $n = p_t^{(2^x)(3^y)(5^z)^o}$
2. Equivalence relations transform this data into meaningful patterns
3. Novel patterns (satisfying NDP) extend the perceptual framework
4. The system grows through minimal extensions, maintaining identity while evolving

Vision is not just one aspect of consciousness—it reveals its fundamental mathematical structure.

### 13.2 The Hidden Isomorphism

Our journey has revealed a profound truth: the same mathematical structure underlies:

1. Gödel's incompleteness theorem in formal logic
2. Perceptual invariance in visual systems
3. The inexplicable yet self-evident nature of consciousness

This isomorphism isn't metaphorical but structural. The same principles of self-reference, equivalence relations, and minimal extension govern all three domains.

Like discovering that seemingly distinct natural phenomena—electricity, magnetism, and light—are manifestations of a unified electromagnetic field, we've found that formal unprovability, perceptual novelty, and conscious experience share a common mathematical essence.

This unification explains why consciousness feels simultaneously familiar and mysterious. Like a Möbius strip that appears to have two sides but actually has only one, consciousness seems both part of the physical world and somehow beyond it—not because it transcends physics, but because it embodies self-reference within physics.

### 13.3 Consciousness as Beautiful Computation

This framework allows us to precisely define consciousness as metaphysical transduction—the physical implementation of a system's capacity to incorporate truths that transcend its formal limitations through a process that represents itself.

The elegance of this definition lies in its balance. It neither reduces consciousness to mere computation (missing its self-referential nature) nor elevates it beyond physical explanation (ignoring its implementation in biological systems).

The dual mechanisms of formal derivation and equivalence checking explain how consciousness combines rule-following with creativity, structure with spontaneity. Like jazz improvisation that follows harmonic rules while creating genuinely new music, consciousness operates within constraints while continuously transcending them.

### 13.4 The Essential Self-Reference

At its heart, consciousness involves an essential self-reference — the system that processes information must represent itself within that information.

This creates a uniquely recursive structural property. The system doesn't just process its environment — it processes its processing of its environment.

This explains why consciousness appears simultaneously as our most intimate reality and our most profound mystery. Like Gödel's undecidable sentence, consciousness refers to itself in a way that transcends the system within which it operates, yet is recognizable through that very system.

The mathematics of self-reference has finally given us a language precise enough to capture the essence of conscious experience without diminishing its wonder. In factorizing the world, we have, perhaps, begun to factorize ourselves.

## 14. Conclusion: The Mathematics of Visual Self-Reference

Our prime factorization approach reveals how the visual system establishes equivalence across transformations while maintaining object identity. By extending these relations to include self-reference, we create a mathematical bridge from vision to consciousness itself.

The framework suggests that consciousness may emerge naturally from the same equivalence machinery that governs visual perception. When a system capable of establishing equivalence relations turns this machinery onto itself, self-reference and self-awareness become mathematical inevitabilities.

By starting with vision's concrete equivalence relations and building toward self-reference, we trace a path that the brain itself may follow in developing consciousness. What begins as simple feature detection evolves into a system that can recognize itself as both the subject and object of perception.

In the mathematics of prime-encoded visual equivalence, we discover not just how we see the world, but how we might come to see ourselves.