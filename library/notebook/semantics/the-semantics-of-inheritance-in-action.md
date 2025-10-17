# The Semantics of Inheritance in Action

### The definition of inheritance

To denote that x inherits directly from y:
```
x --> y
```

Direct inheritance can be defined in terms of a specific relationship:
```
x --> y := (x, y) == y
```

To denote that x inherits from y generally:
```
x -> y
```

We need a referent to denote it recursively:
```
x =inherits> y <iff> x --> y
```

Inheritance can be defined in terms of equality and direct inheritance:
```
x -> y :=
  x == y |
  x --> y | 
  E[y']: x --> y' -> y
```

This allows the transitivity of inheritance to be expressed through a referent, which is a constant in the formalism and not a new relation in the sense of first-order logic, preserving the idea that R(x,y,t) is the only relation in Semantic Reference Theory and its derivative work

We might be able to avoid the need for a referent by expressing the idea as an axiom that states:
```
x =y> y <iff> 
   x == y |
   E[y']: (x,y') == y' & y' =y> y 
```

### An example of an inheritance chain

How exactly can a inherits from d?
```
a -> d
```

a directly inherits from b:
```
a --> b
```

therefore the relationship between a and b can be expressed most specifically as b:
```
(a,b) == b
```

from the previous step, a is a canonical representative of b
```
a =b> b
```

because a is a representative of b we can conclude that b represents a
```
b =b> a
```

let us repeat these steps with c:
```
b --> c
```

we conclude
```
a --> b --> c
a --> c
a =b> b =c> c
a =b> b & b --> c =|>
a =c> c
```

doing the same process, we get:
```
a --> b --> c --> d
a =b> b =c> c =d> d
a =d> d
```

So you can see that the pattern of being a representative is the meaning of inheritance:
```
x =y> y
```

That is to say that if a referent is representative of something, it must inherit its properties from it in some way

But all inheritance chains must be grounded in canonicalization for them to work:
```
(a,b) == b
(b,c) == c
(c,d) == d
```

Otherwise, I don't imagine that the criteria for substitution will be satisfied. But I have to give it more thought

It is worth noting that the semantics of symbolism tell us that:
```
(x) =(p)> x =|> x =p> x
```

Therefore, the statement that x has a symbol can be thought of in terms of self-relationship:
```
(x) =(x)> x =|> x =x> x
```

By definition:
```
x =x> x <iff> (x,x) == x
```

This does not have to be true, and it ends up being a marker for an inability for a referent to be symbolized

But if that's the case:
```
x =p> x =|> (x,x) -> p
```

But notice that symbolization converts having properties into direct inheritance:
```
(x,x) == x -> p
```

That says something interesting about the meaning of referents that can and cannot be symbolized. But the full extent of the correspondence has not entirely dawned on me yet


