# Formatting Reference Guide

## Introduction

The Academic Markdown to HTML Converter is a specialized tool designed for academic and technical writing that requires professional-grade LaTeX and citation support. This document serves as a comprehensive reference for the converter's capabilities and usage.

Key features include:

- LaTeX mathematical expressions (inline and display)
- LaTeX environments (theorem, lemma, proof, etc.)
- Academic citations with proper formatting
- Code syntax highlighting
- Definition lists
- Web-compatible link handling
- CSS validation disabling for KaTeX compatibility

This guide provides examples and explanations for each feature to help you create high-quality academic documents.

## Basic Markdown Syntax

The converter supports standard Markdown syntax while adding specialized academic extensions. For a complete reference to basic Markdown syntax, see the [official Markdown guide](https://www.markdownguide.org/basic-syntax/).

### Headings

Create headings using hash symbols (`#`). More hash symbols indicate lower-level headings:

```
# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
```

### Text Formatting

Format text using the following syntax:

```
**Bold text** is created with double asterisks
*Italic text* is created with single asterisks
***Bold and italic*** text uses triple asterisks
~~Strikethrough~~ text uses double tildes
```

### Lists

Create unordered lists with asterisks, plus signs, or hyphens:

```
* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
```

Create ordered lists with numbers:

```
1. First item
2. Second item
3. Third item
```

### Blockquotes

Create blockquotes using the greater-than symbol:

```
> This is a blockquote.
> 
> It can span multiple paragraphs.
```

### Tables

Create tables using pipe symbols and hyphens:

```
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Horizontal Rules

Create horizontal rules using three or more hyphens, asterisks, or underscores:

```
---
```

## Web-Compatible Links

The converter automatically transforms Markdown links to ensure they work correctly on the web. This is one of the key features that makes it suitable for publishing to GitHub Pages or other web platforms.

### Link Types and Format

#### Internal Links to Other Pages

```
[Link Text](path/to/page.md)
```

The converter automatically transforms `.md` extensions to `.html` for web compatibility.

#### Links to Sections Within a Page

```
[Link to a Section](#section-name)
```

These anchor links are properly encoded, with spaces converted to hyphens and case normalized.

#### External Links

```
[External Website](https://example.com)
```

External links remain unchanged in the conversion process.

#### Image Links

```
![Alt Text](path/to/image.jpg "Optional Title")
```

### How Links Are Transformed

When the document is converted to HTML, the following transformations occur:

1. `.md` extensions are changed to `.html`
   - `[Page](document.md)` becomes `<a href="document.html">Page</a>`

2. Anchor links are properly encoded
   - `[Section](#Section Name)` becomes `<a href="#section-name">Section</a>`

3. Links without extensions are assumed to be pages and get `.html` appended
   - `[Page](document)` becomes `<a href="document.html">Page</a>`

4. All links remain relative to maintain portability across different domains

### Testing Links

To test how links are transformed:

1. Create links to other markdown files in your repository
2. Create links to sections within your document
3. Convert the document with the Academic Markdown Converter
4. Verify the links in the output HTML file work correctly

Example testing document:

```markdown
# Link Testing

## Internal Links
[Link to another page](another-page.md)
[Link to a directory page](directory/index.md)

## Section Links
[Link to the test section below](#test-section)

## External Links
[Link to GitHub](https://github.com)

## Test Section
This is the test section targeted by the section link above.
```

## LaTeX Support

The converter provides robust support for LaTeX mathematical expressions and environments. It uses KaTeX for fast, high-quality rendering.

For a comprehensive guide to LaTeX math syntax, see the [LaTeX Project documentation](https://www.latex-project.org/help/documentation/) or the [KaTeX supported functions reference](https://katex.org/docs/supported.html).

### Inline Math

Use single dollar signs (`$`) to denote inline mathematical expressions:

```
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ where $a$, $b$, and $c$ are coefficients.
```

This renders as: The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ where $a$, $b$, and $c$ are coefficients.

### Display Math

Use double dollar signs (`$$`) to create display (block) mathematical expressions:

```
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$
```

This renders as:

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

### LaTeX Environments

The converter supports specialized LaTeX environments for theorems, proofs, and other academic structures:

#### Theorem Environment

```
\begin{theorem}
For any triangle, the sum of the interior angles is $180^{\circ}$.
\end{theorem}
```

#### Proof Environment

```
\begin{proof}
Let $\alpha$, $\beta$, and $\gamma$ be the three interior angles of a triangle.
Construct a line parallel to one side through the opposite vertex.
By the properties of parallel lines, $\alpha + \beta + \gamma = 180^{\circ}$.
\end{proof}
```

#### Lemma Environment

```
\begin{lemma}
A continuous function on a closed and bounded interval attains its maximum and minimum values.
\end{lemma}
```

#### Definition Environment

```
\begin{definition}
A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.
\end{definition}
```

#### Example Environment

```
\begin{example}
The numbers 2, 3, 5, 7, 11, and 13 are all prime numbers.
\end{example}
```

#### Other Supported Environments

- `\begin{remark}...\end{remark}`
- `\begin{note}...\end{note}`
- `\begin{corollary}...\end{corollary}`

Each environment is rendered with appropriate styling and formatting in the output HTML.

## Citation Support

The converter includes powerful citation capabilities using Citation.js. It supports various citation formats and automatically generates a bibliography.

### Basic Citation

Use footnote-style syntax for citations:

```
This is a statement that needs a citation[^1].

[^1]: Einstein, A. (1905). "Zur Elektrodynamik bewegter Körper". Annalen der Physik, 322(10), 891-921.
```

### Multiple Citations

You can use multiple citations throughout your document:

```
Quantum mechanics[^qm] and relativity[^rel] are fundamental theories in physics.

[^qm]: Dirac, P.A.M. (1930). "The Principles of Quantum Mechanics". Oxford University Press.
[^rel]: Einstein, A. (1915). "Die Feldgleichungen der Gravitation". Sitzungsberichte der Preussischen Akademie der Wissenschaften, 844-847.
```

### Citation Formats

The converter supports various citation formats through Citation.js, including BibTeX, CSL-JSON, and plain text. Here's an example using BibTeX:

```
The Schrödinger equation is fundamental to quantum mechanics[^schrodinger].

[^schrodinger]: @article{schrodinger1926undulatory,
  title={An Undulatory Theory of the Mechanics of Atoms and Molecules},
  author={Schr{\"o}dinger, Erwin},
  journal={Physical Review},
  volume={28},
  number={6},
  pages={1049--1070},
  year={1926},
  publisher={APS}
}
```

### Bibliography Generation

The converter automatically generates a bibliography section at the end of the document with properly formatted citations. If you already have a bibliography section, it will be replaced with the generated one.

## Definition Lists

The converter supports definition lists, which are useful for glossaries, dictionaries, or term explanations:

```
Term
: Definition of the term. This can be a single line or multiple paragraphs.

Another Term
: Definition of another term.
: A second definition for the same term.
```

This renders as:

Term
: Definition of the term. This can be a single line or multiple paragraphs.

Another Term
: Definition of another term.
: A second definition for the same term.

## Code Syntax Highlighting

The converter supports syntax highlighting for code blocks. Specify the language after the opening triple backticks:

````
```python
def quantum_superposition(qubit):
    """Create a superposition state from a qubit."""
    return (qubit_0 + qubit_1) / np.sqrt(2)
```
````

The converter uses highlight.js to provide syntax highlighting for numerous programming languages.

## Command Line Usage

The Academic Markdown Converter can be executed from the command line with the following syntax:

```
node converter.js [inputFile] [outputFile] [--verbose]
```

Parameters:
- `inputFile`: Path to the input markdown file
- `outputFile`: Path to the output HTML file
- `--verbose`: Optional flag for detailed logging output

If no input or output files are specified, the converter uses default paths.

## Example Document

Here's a complete example that demonstrates many of the converter's features:

```markdown
# Quantum Computing Basics

## Introduction

Quantum computing leverages the principles of quantum mechanics to process information in ways that classical computers cannot[^feynman].

## Quantum Bits

Unlike classical bits, quantum bits (qubits) can exist in superpositions of states. A qubit's state can be represented as:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

where $\alpha$ and $\beta$ are complex numbers such that $|\alpha|^2 + |\beta|^2 = 1$.

\begin{theorem}
A quantum system with $n$ qubits can represent $2^n$ states simultaneously, exponentially more than a classical system of the same size.
\end{theorem}

\begin{proof}
Each qubit can be in a superposition of two states. With $n$ independent qubits, the system can be in a superposition of $2 \times 2 \times ... \times 2$ (n times) = $2^n$ states.
\end{proof}

## Quantum Gates

Quantum gates are the building blocks of quantum circuits.

### The Hadamard Gate

\begin{definition}
The Hadamard gate creates a superposition state by transforming $|0\rangle$ to $\frac{|0\rangle + |1\rangle}{\sqrt{2}}$ and $|1\rangle$ to $\frac{|0\rangle - |1\rangle}{\sqrt{2}}$.
\end{definition}

The matrix representation of the Hadamard gate is:

$$H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$$

## Implementation

Here's a simple Python implementation of a qubit and the Hadamard gate:

```python
import numpy as np

# Define basis states
ket_0 = np.array([1, 0])
ket_1 = np.array([0, 1])

# Define Hadamard gate
H = (1/np.sqrt(2)) * np.array([[1, 1], [1, -1]])

# Apply Hadamard to |0⟩
superposition = H @ ket_0
print("Superposition state:", superposition)
```

## Quantum Terminology

Entanglement
: A quantum phenomenon where the quantum states of multiple particles are correlated in such a way that the quantum state of each particle cannot be described independently.

Decoherence
: The process by which quantum systems lose their quantum behavior through interaction with the environment.

## References

[Link to quantum algorithms](quantum-algorithms.md)
[Jump to Quantum Gates section](#quantum-gates)

[^feynman]: Feynman, R. P. (1982). "Simulating Physics with Computers". International Journal of Theoretical Physics, 21(6/7), 467-488.
```

## Conclusion

The Academic Markdown to HTML Converter provides a powerful toolset for creating academic and technical documents with sophisticated mathematical content, proper citations, and web compatibility. Use this reference guide to leverage its full capabilities in your scholarly writing.