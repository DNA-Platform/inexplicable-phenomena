# [Semantic Reference Theory](https://dna-platform.github.io/inexplicable-phenomena/encyclopedia/semantic-reference-theory.html)
- Book: [Encyclopedia](./.encyclopedia.md)
---

## Semantic Reference Theory

There’s a typographical lingo to Semantic Reference Theory that gives it a unique flavor. Representing reference symbolically is akin to pointers in programming language. I choose a symbology that builds its aesthetic identity using programming as inspiration.

There is also a touch of absurdism. When extending Semantic Reference Theory to create your own theory, it is expected that you build your own grammar. So my base grammar is vacuous in a way that emphasizes abstraction, and thus begs reinterpretation in any specific domain.

---

### A Programmatic Grammar for Formal Logic

Semantic Reference Theory uses an informal grammar to replace the more austere symbology of first order logic. It is meant to be more down to earth. Most importantly, it is meant to be expressible without a special typesetting language.

For the propositional variables X and Y from first order logic, which represent expressions subject to truth and falsity:

`!X` : means: not X  
`X & Y` : means: X and Y  
`X | Y` : means: X xor Y  
`X || Y` : means: X or Y  
`X =|> Y` : means X implies Y  
`X !=|> Y` : means X does not imply Y  
`X <|=|> Y` : means X if and only if Y
`X === Y` : means X is logically equivalent to Y - synonym for if and only if Y  


For the non-logical variables of first order logic, I adopt programmer semantics:

`x == y` : means: x equals y  
`x != y` : means: x does not equal y  

Quantification is trickier. There’s nothing to draw on in programming. The closest thing I can think of is:

`Ex: x == y` : means: there exists x where x equals y
`E[x]: x == y` : means: there exists x where x equals y, equivalent form
`E[x,y]: x == y` : means: there exists x and y where x equals y, equivalent form
`Ax: x == y` : means all x equal y  
`A[x]: x == y` : means all x equal y, equivalent form
`Ax.Ey: x == y` : means for all x, there exists y where x equals y 
`A[x].E[y]: x == y` : means for all x, there exists y where x equals y  

Definition is important in Semantic Reference Theory, though it is a metalogical construct. Formally, I use this syntax to express a grammatical convention:

`(x == y) := (x = y)`

That statement expresses that I use double equals to mean the thing that single equals means in first order logic. Note that `==` expresses a propositional form of equality and `:=` a definitional sense of equality. And regular equals `=` is unused, which leaves it free to be included, for instance, in a semantic theory of arithmetic. There will be a whole language to updating SRT, so in general we will have to find a syntax that looks like:

`T |=> "==" <=replaces=> "="`

This is the transduction operator, where it describes changes to `T`. In this case, notice that it is an invertible one. A linguistic change which yields an equivalent theory in the sense that one can map them back and forth. And those changes are expressed in SRT. But we will need to develop SRT more to understand the function of the transduction operator

---

### The Grammar of Semantic Reference Theory

Semantic Reference Theory has a formal representation in first-order logic, and I appeal to that in foundational contexts, though it is intended as a theory which is capable of standing on its own, representing itself and representing first order logic, and it's mechanism of proof. Conceptually, we imagine it will be equivalent to a Robinson Arithmetic in its expressive power and ability to be Turing Complete by way of the transduction operator. But that is a proof in which we will already have to represent first order logic, and represent SRT and Q within it, so that we might make that correspondence. So it is a sophisticated proof. But let the power and finiteness of Q be the inspiration for the representational power of SRT. But also, imagine SRT as a theory that makes it relatively easy to represent SRT and Q in its actual syntax

The central object of study is the tertiary relation that represents direct `relationship`, in the referential sense. It is not transitive. Much as if `x` were a pointer to `y` and `y` were a pointer to `z`, `z` would have to be dereferenced twice to get to `x`. They are not in a direct referential relationship.

Direct relationship is the only relationship represented in the formalism of `SRT`. It is simply expressed as:

`R(x,y,t)`

This expresses the proposition that `x` is directly related to `y` through `t`. It is expressed with the linguistic synonym:

`x =t> y`

The variables `x`, `y` and `t` represent the domain of the theory, in the first-order sense. Collectively, this domain is called a `catalogue` which is a collection of `referents` that are related to each other. Therefore: `x`, `y` and `t` are variables of `R` that refer to referents in a catalogue.  

In the context of `SRT` as a first-order logic, a `referent` is defined to be an object which could be assigned to a constant. Therefore, referents are exactly that which can be substituted in for the variables of `SRT`. It this way, `SRT` is a theory that connects epistemology to ontology. Proof expresses how referents relate to each other. The results of proof correspond to existential and universal statements about referents in a catalogue. Which means that they, by the mechanism of transduction `|=>` correspond to related theories in which variables are replaced with constants.

If `x != y`, `t` is referred to as a relationship type, x is a subject and y is an object. IF `x == y`, `t` is called a property and the referent that x and y both refer to is called an object.

### Representing Relationships

`R(x,y,t)` expresses the idea that `x` and `y` have a subject-object relationship of type `t`. Because `x` and `y` are both objects of reference, their relationship is specified through `t` as a type or relationship. I transduce grammatical conventions that make it clear that the subject of the theory is about expressing relationships through reference, even though reference will end up being a derived concept. These are the simplest expressions. There is a whimsical element to its symbology and its commitment to arrows, but these linguistic conventions will all be made formal through the transduction operator:

`x => y := E[t]: R(x,y,t) is true`
`x =t> y := R(x,y,t) is true`  
`x !=t> y := R(x,y,t) is not true`  
`x <t= y := R(y,x,t) is true`  
`x <t=! y := R(y,x,t) is not true`  
`x <s=t> y := R(x,y,t) and R(y,x,s) are both true`  
`x <=t=> y := R(x,y,t) and R(y,x,t) are both true`
`x <t> y := R(x,y,t) and R(y,x,t) are both true`  
`x <s!=!t> y := R(x,y,t) and R(y,x,t) are both false`  
`x <!=t=!> y := R(x,y,t) and R(y,x,t) are both false`  
`x <!t!> y := R(x,y,t) and R(y,x,t) are both false`  
`x.t := R(x,x,t) is true`
`!x.t := R(x,x,t) is not true`

You might find that different forms best express what you are trying to say with the expression, so having many options allows you to communicate your semantic constraints most clearly.

The rightmost referent is considered as the subject so that the above syntax can be composed, but with a mind for uniqueness:

`x => y => z := x => y & y => z & x != y != z`

Then there is the notion of inheritance. This is the concept of relationship that is consistent with ancestry. It expresses transitivity and requires recursion but from the definition, we mean it to draw a distinction between direct relationship and inheritance, and that as catalogues finite, we can imagine replacing each use of it as the expression of series of referents in a catalogue that relate to each other:

`x -> y := x == y || x => y || E[z]: x -> z & z -> y`

But we imagine it to be defined as a way of augmenting a proof whereby `x -> y` is replaced with:

`x => ... => y`

If no such referents can be found, this will be a cause for transduction. 

In the case where either `x` inherits from `y` or vice versa, we can express a general form of relatedness from ancestral relationship: 

`x-y := x -> y || x <- y || E[z]: x-z & z-y `

Again, this is a linguistic relationship, and must be expressed in a proof as:

`x <=> ... <=> y`

If such a chain of relationships cannot be found, `x-y` expresses a need for transduction.

It is an essential part of the definition of a catalogue that all referents within a catalogue must be related. If they are not, then the catalogue can be divided into parts, and they express two independent ontologies that cannot be articulated in the same language. This can be expressed epistemologically in `SRT` with the axiom:

`x => y =|> A[p,q]: p-q`

---

### The Definition of a Semantic Reference Theory

A `Semantic Reference Theory` has no constants, no functions, and only one relationship `R(x,y,t)`. A `Semantic Reference Theory` can be extended into another only by preserving this structure, which ensures that it is an epistemology. All axioms must be consistent with the concept of an empty catalogue. 

Referents exist to represent concrete objects of any theory, including all candidates for `SRT`. All axioms in SRT are expressed in generalized form, and must be consistent with an empty catalogue. For instance `R(x,y,t)` expressed as `x =t> y` expresses that `R(x,y,t)` is true for all referents. It is vacuously true in a catalogue with no referents at all, but in a way that does not trigger logical implication. Because all candidates for `SRT` structurally express an empty catalogue, then `x =t> y =|> P` for any version of `SRT` as `!E[x,y,t]: R(x,y,t)` is implicitly true about the empty catalogue. Therefore, the empty catalogue is not subject to implication. Therefore, if we express axioms as `E[x,y,t]: x =t> y =|> P`, then any such axiom is consistent with the empty catalogue, and thus, consistent with `SRT`. 

To preserve the semantic neutrality of a candidate axiom for `SRT`, it must be expressed in the form: 

`E[x,y,t]: x =t> y =|> P`

Eqivalently, one can express this as:

`E[x,y] x => y =|> P`

We know from the definition of `x => y` that: 

`E[x,y] x => y ===`
`E[x,y].E[t] x =t> y ===` 
`E[x,y,t]: x =t> y`

So the two sentences are essentially the same in the sense that they are logically equivalent.

In this way, anything that can be said about `R(x,y,t)` is a valid candidate for the epistemology of `SRT`. But only those that can be transduced into a valid ontology, whereby all quantifications of referents have been transduced via `|=>` into a catalogue that has specific constants, along with definitions for those constants that are expressed as axioms consistent with the epistemology of the `Semantic Theory` there were transduced from, can be said to represent a valid `Semantic Theory`. In this way, `SRT` serves as a model for itself.     

You might imagine that kicking off the process of constructing a `Semantic Theory` is extending a candidate for `SRT`, adding a single constant, and then letting a computational process of proof and transduction unfold. There is no one correct way for this process to unfold, but each time it does unfold to halt with a valid ontology, then the semantics specified by `SRT` are valid for that catalogue.

We admit an axiom into `SRT` if and only if it should hold for any ontology. If an axiom is introduced to `SRT` which makes it specific to a particular domain, then that axiom is a non-semantic axiom, in the same way a non-logical in first-order logic is an axiom about the specific functions, constants and relations of your theory, and not a statement of logic itself. 

---

### A Narrative

A narrative is a sequence of statements in SRT both resembles a proof in the first-order logic sense. In fact, it is a sequence of proofs with transduction statements. To allow for this, you first start with a metalogical name for SRT as a theory so that you can express transductions. Subsequent statements can follow a proof structure in the new theory. Transuction can be introduced at any time, but you're find yourself wanting to perform them to resolve contradictions between your epistemology and your ontology. 

Let's also assume that SRT begins with an empty first order logic. We can then express the changes required to create SRT in SRT syntax, though some of this syntax will be defined later:

`|=> (SRT) =(has)> (R(x,y,t) =as> (relation))`

This expresses the statement that the representation of SRT, denoted `(SRT)` is being given a relation represented by `(R(x,y,z))`. We might then say. But we can make this syntax more conventient as a linguistic convention:

`SRT |=has> (R(x,y,t) =as> (relation))`

We might then express our use of the ternary operator:

`SRT |=expresses> (R(x,y,t)) <as> (x =t> y)`

It is essential that expression be invertible as one expression is used to take the place of another. But the invertibility of the `as` expressed that `SRT` can always translate back to first-order logic notation if required.

We might express changes to our logical operations as:

`SRT |=expresses> (¬) <as> (!)`
`SRT |=expresses> (∧) <as> (&)`
`SRT |=expresses> (∨x) <as> (A[x])`
`SRT |=defines> (!(!P & !Q)) <as> (P || Q)`
`SRT |=defines> (P | Q) <as> ((P || Q) & (!(P & Q)))`
`SRT |=defines> (P ⇒ Q) <as> (P =|> Q)`
`SRT |=defines> (Q ⇒ P) <as> (P <|= Q)`
`SRT |=defines> (P ⇔ Q) <as> (P === Q)`

You can get a feel for the representation language here. The `has` operator is used to express that `SRT` has some constraint. The one-directional `as` operator denotes that `R(x,y,t)` has the property os being a relation to `SRT`. `SRT` expresses the standard syntax of propositional logic differently, and `expresses` serves to indicate that the syntax has been replaced. Whereas `defines` is used to express the idea of a synonym where both forms are valid.

We'll need a language for metalogical transduction that is rich enough to express modifications to a theory, but that is exactly the purpose of SRT. So we can imagine that we'll be able to develop this

### Candidate Axioms for Semantic Reference Theory

There is not end to the process of considering axioms for `SRT` but this is okay. Each narative that you perform in `SRT` can be imagined as starting from an empty first-order logic and transducing your version of the theory. While `SRT` itself has metalogial constraints that it must need to follow, the metalogical transduction syntax can be thought of as being appended to first order logic itself. 

Therefore, introducing a candidate axiom for `SRT` must happen in existential form before any `referents` are added to the `catalogue` by way of transducing constants. This is what keeps it free of ontology. And as discussed, there is standard a convention for keeping axioms semantically neutral so that one can explore whether or not combinations of them can or do result in `catalogues` that are consistent. 

Here are some candidate axioms that I propose for SRT. I imaging they will be replaced with better ones over time, but even amidst a narrative, axioms can be replaced, as long as the change is consistent with the current form.

#### The Semantics of Inheritance

The idea of inheritance can be expressed like this:

`SRT |=has> ((E[x,y,t]: x =t> y =|> E[R] x =R> y & t -> R) =as> (axiom))`

Don't be confused by the name of `R` here. First, it is the name of a variable on the domain of referents, and syntactically, it can't be confused for a relation. But we also express `R(x,y,t)` as `x =t> y` in the language, freeing up `R` as a symbol. 

Were we to imagine using both at once, it is clear to see how they are related: 

`R(x,y,t) => R(x,y,R)`

The operator `R` expresses that `x` and `y` have a direct relationship. With the notion of a relationship that all referents inherit from, we can express the theroem that `x => y === x =R> y` in a context where there exists such an `R`. 

There is another concern with inheritance, and it is related to the idea that a catalogue is a finite collection of referents. If `x` and `y` do have a direct relationship, we should be able to express the idea that they have a most specific one. It might not be unique. Perhaps there is more than one way to express it. But specificity can be expressed as another constraint on the opposite side of inheritance:

`SRT |=has> ((E[x,y,t]: x =t> y =|> E[r] r -> t & x =r> y) =as> (axiom))`

We can see here why it's important that `r -> t` include the possibility that `r` might equal `t`. This axiom expresses a statement that this theory is about reference. The catalogue represents direct relationship atomically, and that makes it structurally distinct from a data structure represented by a directed graph. `SRT` represents an ontology in which reference is specified.

#### The Semantics of Representation

Representation is an important concept in `SRT` and to discuss it eloquently, one needs to have an idea of the representation function. A representation can be used to specify referents. In cases where they are unique, the representation function can express this. If we reflect on the relationship between `r`, `x` and `y`, we can see that it is unique to them. The representation function can therefore be a linguistic construct that points to it. We can denote the most specific relationship `(x,y)` and we can introduce dereferencing to tie it back to the thing it represents:

`*(x,y) == x`
`(x,y)* == y`

While we don't have the syntax for it yet, utilizing `(x,y)` in a proof means something appending this before it's usage:

`E[var]: x =var> y & A[t]: x =t> y =|> var -> t`

The specific variable represented by `var` in the proof is defined to be unique and unbound. In all instances where `(x,y)` is used, it is replaced with the name of that variable, whatever it may be. This is a convenient linguistic trick for any value that can be uniquely specified. The representation function is not a member of theory, but as we build up a more powerful language that we can use to express transduction, we will find that it can be. 

Even so, permitting it as a metalogical description of a hypothetical proof, we can express inheritance far more succinctly within a single axiom:

`SRT |=has> ((E[x,y,t]: x =t> y =|> E[(x,y),R] x =R> y & x =(x,y)> y & (x,y) -> t -> R) =as> (axiom))`

This more elegantly expresses the idea that every referent that represents a relationship type lives within a heirarchy that respects the most specific and most general forms of inheritance. 

But there is another concept embedded within the syntax of the representation function. It represents the relationship. To comprehend how it does this, we need to express the concept of a symbol and a literal:

First we need the concept of a representation. Representations exist to represent things. They are an object that expresses a relationship. A referent `x` is a representation of `y` if:

`x =x> y =|> x =rep> y`

Furthermore, if `x` is a specific representation of `y`, then it is a symbol:

`x =x> y & x == (x,y) =|> x =sym> y`

We can see that inheritance becomes useful here. Since we know `x` is a specific relationship:

`x =sym> y =|> x -> sym`

We can express this as two representation axioms. The first establishes representation in general:

`SRT |=has> ((E[x,y]: x =x> y & x != y =|> E[rep]: x =rep> y) =as> (axiom))`

The second expresses the idea of being a symbol:

`SRT |=has> ((E[x,y]: x =x> y & x != y & x == (x,y) =|> E[sym]: x =sym> y) =as> (axiom))`

Therefore, we have expressed that a representation is in a direct relationship with all of its parts, and that its most specific parts are symbols. If we then reflect on the nature of `(x,y)`, the notion of a specific direct relationship compels us to imagine that it represents the thing it is directed towards:

`(x,y) =(x,y)> y`

Now we can articulate the idea that if `x =t> y` and `x` and `y` are unique, then `x` references `y` because it has a specific relationship `(x,y)` that is a symbol for `y`. So `x` participates in a direct relationship where `y` is symbolized by something related: `(x,y) =sym> y & (x,y) -> t`. In some sense, a symbol is the purest form of relationship. When `x =sym> y =|> x == (x,y)`, meaning that being a symbol embodies reference itself. This is an important idea in `SRT`, and it will affect how we represent things. If `x` and `y` are distinct, they are in a symbolic relationship involing reference. And there is always a specific relationship that represents the pointer. `Semantic Reference Theory` is quite opinionated on the `semantics` of `reference` in the context of `referents`.

We will build of syntax to represent representation more expressively

#### The Semantics of Language

% This is the section to write about P, which will turn out to be the equivalence operator formalized in first-order logic. What's interesting is that it ends up being the referent identity operator in `R`. `R(x,y,P)` means the same thing as `x == y`. While that may look like two different things being compared, those things are variables. For referents, `x == y` is only true on the diagonal: `R(x,x,P)`. While inheritance will not be fully fleshed out at this point, though it will work much like inheritance does in programming, in the same way that `x =t> y` means `x =R> y` because `r -> y`, so too will `x =p> x` which can be expressed as `x.p` imply that `p -> P`. And that `p` can only be a way of specifying that a referent is the same as itself. But by not specifying that all referents are the same, it creates an equivalence class. We can formalize this as:

`SRT |=has> (E[x,y,t]: x =t> y =|> E[P]: x == y === R(x,x,P) === x.P) =as> (axiom))`

Here is a wonderful opportunity for a synonym, because when used propositionally with two variables `x =P> y` doesn't express the essence of the equality operator. So let's introduce an interesting linguistic trick into SRT: Let `=` be a synonym for `P`. Now you can express:

`x ==> y`
`x.P`

Which say equivalent things in different contexts. 

Now we get to define an interesting set of objects: the literals. Literals are `y` that themselves reference nothing. But as we have defined reference, it only happens when a referent doesn't reference itself. `y.p` does not count as a referentia; relationship. Observe that `(y,y)` does not describe a relationship between separate things. It is equivalent to `(y)` which is denoted as the canonical symbol for `y`. `(y) -> p` for all `p` that describe properties of `y`, and it itself is not a literal. None of the properties can be literals. And y itself can point to nothing.

% But to get at this, we need to express the fundamental semantic form, which is the object of study in `SRT`. The idea that x is the subject of a relationship can be expressed:

`E[x,y,t]: x =t> y =|> x != y =|> E[S]: x.S`

As `x.S` implies `S -> P`, we can see that being a subject is a property of certain referents.

We can express that x is an object similarly:

`E[x,y]: x => y =|> E[O]: y.O`

You'll note that having a property qualifies you as being an object. But you are not the subject of a relationship unless you have a distinct object, in which case you are in a referential relationship. Therefore the referents that are 

#### The Semantics of Language

We also have the `=` relationship to contend with from first-order logic. It must belong in our theory:

`E[x,y,t]: x =t> y =|> E[P]: x == y === R(x,x,P) === x.P`

What does `P` mean then? `P` expresses the idea that `x` is a referent. It looks like an equality operator on variables, but as a relationship between referents, it represents the fundamental property. That axiom states that all properties, which you might think of as corresponding to equivalence classes, must inherit from `P` and must do so in the way that `x -t> x`. By providing this notion of a property, we see that a direct self-relationship is not the meaning of self-reference in `SRT`.

The idea that x is the subject of a relationship can be expressed:

`E[x,y,t]: x =t> y =|> x != y =|> E[S]: x.S`

As `x.S` implies `S -> P`, we can see that being a subject is a property of certain referents.

We can express that x is an object similarly:

`E[x,y]: x => y =|> E[O]: y.O`

You'll note that having a property qualifies you as being an object. But you are not the subject of a relationship unless you have a distinct object. A literal will be defined as those that aren't subjects or relationships. Now it might seem weird, but `R.P` is a true statement because `R =P> R` which also means, `P -> R` and this `R =R> R`. This will turn out to mean that `R` is a property pf a referent. It happens to be the property of being a type of relationship. So `t -> R` is a way of saying `t.R`. We can define the literals elegantly:  

`y.lit === !y.S & !y.R`

It might seem like `y` would have to be an object, but here's a nice place tp introduce another important axiom that says somethimg important about language. We haven't expressed the notion of connectedness in a catalogue, but it can be expressed this way:

`SRT |=has> (E[x,y]: x => y =|> A[p,q]: p-q) =as> (axiom))`

If `y` is not a subject or a relationship tpe, and it is still part of a catalogue, then it must be the object of something. In this case, it must be a literal.

#### The Semantics of Inheritance

We know that `t -> R` expresses some sort of inheritance. But what does it mean for a relationship type in inherent from another? Let's explore what it means to represent `R`:

Imagine that each relationship type has a canonical relationship that defines it. We will make use of the canonical symbol for `R` to express this. Let us suppose that R is the most specific relationship type of some relationship:

`S =R> O`

`R` is the most specific relationship between a subject and an object. But what about `P`? We know `P -> R`. So let us suppose that the most specific relationship type between `O` and itself is `P`:

`O =P> O` 

In this context, `O =R> O` is true as well, but it is not the most specific relationship. `R` can only be the most specific relationship of one pair or referents. Inheritance should preserve the properties of the referents in the direct relationship.

``