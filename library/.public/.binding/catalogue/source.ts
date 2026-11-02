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
// AND, FOR PROSE, THE ELEMENT IT STANDS IN, by its tag's name and the element's start, so a pass may ask which runs
// are one heading's words; the structure claims a heading's id as it claims a title's. Sprint 118, D5.
export type Run = { kind: 'prose' | 'string'; from: number; to: number; text: string; element?: string; within?: number };

// AND EVERY ELEMENT BY ITS START: its tag's name, the start of the element it stands in and the names of the
// elements it holds, a self-closing one among them, so a pass may ask what stands around a heading. Sprint 118, U4.
export type Element = { name: string; parent?: number; children: string[] };

// AND WHAT A FILE IMPORTS, by the specifiers as written — never read for the notation, but read for
// use: a file beside a chapter that the chapter imports is a tool the chapter runs, and is used. And each name
// imported, to the module it comes from, so a pass may ask whose word an element is.
export type Source = { runs: Run[]; imports: string[]; imported: Map<string, string>; elements: Map<number, Element>; line: (at: number) => number };

export const source = (file: string, code: string): Source => {
    const parsed = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    const runs: Run[] = [];
    const imports: string[] = [];
    const imported = new Map<string, string>();
    const elements = new Map<number, Element>();
    const standing: { at: number; element: Element }[] = [];
    const visit = (node: ts.Node): void => {
        if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
            const name = (ts.isJsxElement(node) ? node.openingElement : node).tagName.getText(parsed);
            const at = node.getStart(parsed);
            const within = standing[standing.length - 1];
            const element: Element = { name, ...(within === undefined ? {} : { parent: within.at }), children: [] };
            if (within !== undefined) within.element.children.push(name);
            elements.set(at, element);
            standing.push({ at, element });
            ts.forEachChild(node, visit);
            standing.pop();
            return;
        }
        // AN IMPORT OR AN EXPORT IS MACHINERY: its path is a string, and it is never writing.
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
            if (node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
                imports.push(node.moduleSpecifier.text);
                const bindings = ts.isImportDeclaration(node) ? node.importClause?.namedBindings : undefined;
                if (bindings !== undefined && ts.isNamedImports(bindings))
                    for (const one of bindings.elements) imported.set(one.name.text, node.moduleSpecifier.text);
            }
            return;
        }
        // JSX TEXT THAT IS ONLY WHITESPACE IS THE INDENTATION BETWEEN TAGS, not writing — a third of
        // the test library's text nodes, measured 2026-09-28.
        if (ts.isJsxText(node)) {
            if (node.containsOnlyTriviaWhiteSpaces) return;
            const from = node.getStart(parsed);
            const within = standing[standing.length - 1];
            runs.push({ kind: 'prose', from, to: node.end, text: code.slice(from, node.end), ...(within === undefined ? {} : { element: within.element.name, within: within.at }) });

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

    return { runs, imports, imported, elements, line: at => parsed.getLineAndCharacterOfPosition(at).line + 1 };
};
