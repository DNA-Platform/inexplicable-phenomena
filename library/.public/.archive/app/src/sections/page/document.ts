// The demo script (U22). Not a sample — the source the whole review walk runs on.
// Every markdown case is authored here on purpose, but the piece is written to read
// as a real short essay, not a fixture. A normal template literal (not String.raw)
// so it can hold literal backticks for code spans and fences; LaTeX backslashes are
// therefore doubled, and every markdown backtick is escaped.
export const documentSource = `# The Algebra of Perspective

Every act of *reading* is a change of coordinates. A page holds one representation; a reader arrives carrying another; **meaning** is what survives the transformation between them. The same circle is $x^2 + y^2 = r^2$ to Descartes and $r e^{i\\theta}$ to Euler — one object, two notations — and the shortest sentence binding every notation to every other is the most beautiful identity in the language:

$$e^{i\\pi} + 1 = 0$$

## The book is its structure

A book is not its paper but its **structure** — words that point, sentences that contain, a title that stands first and speaks for the whole. Ask a paragraph what it holds and it answers with live parts: a \`$Section\` divides into paragraphs, a \`$Sentence\` into \`$Word\`s, and nothing is stored twice — every count in the footer below is computed fresh from this one source. Even the marks obey the rule. A bare 2 * 3 dropped into a line of prose is neither arithmetic nor emphasis; the asterisk between the numbers stands for nothing but itself, a mark the reader steps over the way they step over a comma. The wager is older than any of our software — it runs back to [Descartes' analytic turn](https://plato.stanford.edu/entries/descartes-mathematics/), where a curve first became an equation you could hold in your hand.

## What this section is made of

The parse is not how the page is drawn — the block already carries everything a reader sees. It is a reading *about* the writing: what is here, at what grade, and whether each part is what it claims to be. Below, the same section listed by its own model. Touch a line and the prose it names answers.

\`\`\`parts
\`\`\`

## A word, in four lines

Specialization here is not a new machine but one more branch on a machine already running. The whole of a word is small enough to read at a glance:

\`\`\`tsx
class $Word extends $Writing {
  divide() { return []; }      // a word is the floor: it holds no parts
  compose() { return this; }   // and composes to itself
}
\`\`\`

Change a single branch and the same source yields a different reading — a link where there was a word, a figure where there was a fence — while the shape underneath never moves:

\`\`\`text
book
└─ chapter
   └─ section
      └─ paragraph
         └─ sentence
            └─ word
\`\`\`

## Mathematics stands inline

Writing goes down through the same door that reading came up through, and mathematics rides along as an ordinary citizen of the sentence. The Fourier pair states the whole wager in a single line — that a thing and its transform are two readings of one object:

$$\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x)\\, e^{-2\\pi i x \\xi}\\, dx$$

> A notation is a promise about what may be safely forgotten.

What you are reading is not converted text. It is a **composition** — paragraphs holding sentences holding words — rendered by the very objects that can tell you, to the word, how much it holds.

## A block left open

A block that never closes is not prose to be guessed at; it is a question the model must answer in its own words rather than swallow. Here is one, left open on purpose — the last thing on the page, so nothing after it can be lost:

\`\`\`tsx
class $Unclosed extends $Figure {
  // this fence is never closed — an honest demonstration
  // that an unterminated block is a validity question,
  // not a licence to eat the rest of the section
`;
