import { $TheLibrary } from './1-the-book.code.tsx';

// THE LIBRARY REFERENCE MANUAL: the book that accompanies the library's reference and holds, as the
// files beside its chapters, every tool the library is built with — the book class, the theme, the
// masthead and the byline, the catchword, the faces. Doug, 2026-09-28: "you literally use the code in
// the reference manual as the tools in the library." So this file is the manual's door: every other
// book imports its tools from here, and each chapter of the manual prints the file it documents.
export default class $TheManual extends $TheLibrary { }

export * from './1-the-book.code.tsx';
export * from './2-the-theme.code.tsx';
export * from './3-the-masthead-and-the-byline.code.tsx';
export * from './4-the-catchword.code.tsx';
export * from './5-the-faces.code.tsx';
