import ts from 'typescript';

// THE READING OF A FILE'S SOURCE THROUGH THE TYPESCRIPT PARSER, once, for every pass that reads the
// notation. The parser says where writing stands — JSX text, a string literal, a template with
// nothing substituted — and nothing else in a file is read: not a comment, not an import's path, not a
// tag's name. The scanner and the transform both take these runs, so the two cannot read different
// text. Why the parser locates and a regex reads within a run, and why an edit is a splice by
// position, is measured in Reading TSX with the Compiler API (.lib/the-catalogue-and-the-specification/10).
//
// `catalogue/source.ts` is a PROXY NAME, flagged for Doug.

// A RUN IS THE RAW SLICE, so every offset within it is an offset into the file; whether it is read by
// JSX's rule or as written is the reader's business, decided by its kind.
export type Run = { kind: 'prose' | 'string'; from: number; to: number; text: string };

export type Source = { runs: Run[]; line: (at: number) => number };

export const source = (file: string, code: string): Source => {
    const parsed = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    const runs: Run[] = [];
    const visit = (node: ts.Node): void => {
        // AN IMPORT OR AN EXPORT IS MACHINERY: its path is a string, and it is never writing.
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
        // JSX TEXT THAT IS ONLY WHITESPACE IS THE INDENTATION BETWEEN TAGS, not writing — a third of
        // the test library's text nodes, measured 2026-09-28.
        if (ts.isJsxText(node)) {
            if (node.containsOnlyTriviaWhiteSpaces) return;
            const from = node.getStart(parsed);
            runs.push({ kind: 'prose', from, to: node.end, text: code.slice(from, node.end) });

            return;
        }
        // A STRING WHEREVER IT STANDS — a prop, a literal in a helper — with its quotes stripped.
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const from = node.getStart(parsed) + 1;
            runs.push({ kind: 'string', from, to: node.end - 1, text: code.slice(from, node.end - 1) });

            return;
        }
        ts.forEachChild(node, visit);
    };
    visit(parsed);

    return { runs, line: at => parsed.getLineAndCharacterOfPosition(at).line + 1 };
};
