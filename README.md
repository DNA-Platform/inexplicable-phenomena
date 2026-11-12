# Inexplicable Phenomena

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.15389666.svg)](https://doi.org/10.5281/zenodo.15389666)

A library of subjectivity, written by Doug Rubino and published as it is bound at
**https://dna-platform.github.io/inexplicable-phenomena/**.

## What is being written

*The Subject of Arithmetic*, a paper, as part of a larger project to introduce the notion of
subjectivity in a mathematical context as an alternative perspective to incompleteness. The paper
reads Gödel's theorem a second way: not as a truth arithmetic cannot reach, but as the boundary of
what a subject can refer to, with the completed totality indistinguishable, by reference, from
zero. From that one commitment follow a rule of inference beside induction, proof by symmetry, and
an object at the end of limits where zero and infinity are one place.

## Where the work is

The notes are written in the open and change most days.

- **[The Notebook of Arithmetic](https://dna-platform.github.io/inexplicable-phenomena/arithmetic-notebook/)**, the notes of the paper: its parts from the preface to Goldbach, the rulings, the formalism, and the newest chapter, [Zero and Infinity](https://dna-platform.github.io/inexplicable-phenomena/arithmetic-notebook/#zero-and-infinity), on the connection between the subjective reading of Gödel and Riemann's exchange of zero and infinity.
- **[The Project of Arithmetic](https://dna-platform.github.io/inexplicable-phenomena/arithmetic-project/)**, the sprints that write the paper, newest last.
- **[The Library of Mathematics](https://dna-platform.github.io/inexplicable-phenomena/mathematical-library/)**, the publications the notes lean on, Beltrami to Turing, each held beside its chapter where its terms allow.
- **[Arithmetic](https://dna-platform.github.io/inexplicable-phenomena/arithmetic/)**, the subject's catalogue; **[Mathematics](https://dna-platform.github.io/inexplicable-phenomena/our-math/)** above it; and the whole library's [front](https://dna-platform.github.io/inexplicable-phenomena/).

## How it is made

The books under `library/` are written as code against the `@dna-platform/public` package and bound
into the site under `library/.public` by the binder beside it. The site is committed as it is bound,
so what is published is byte for byte what is here. A push that changes the site deploys it to GitHub
Pages and makes a release, which Zenodo archives under the DOI above.

## Licence

See [LICENSE.md](LICENSE.md).
