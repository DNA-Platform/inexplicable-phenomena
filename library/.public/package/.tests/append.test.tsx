import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Chapter, Title, Paragraph, $Append, Append, AppendSpecification, $Paragraph, html } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

// AN APPEND IS A FILE'S CONTENTS APPENDED TO ITS CHAPTER BY THE BINDER — Sprint 89, Doug, 2026-09-28: "the
// contents of the annotation are the file contents… takes the identifier (part after chapter name then separator
// before extension) and type (extension like .tsx), that can be passed as props to the annotation"; "it will be
// there as an annotation." Here one is written by hand, as the binder writes it into a book's module.
describe('an append', () => {
    const chapter = (): $Chapter => built<$Chapter>(
        <Chapter>
            <Title>[The Plate](/a-paper/the-plate/)</Title>
            <Paragraph>What the plate is.</Paragraph>
            <Append identifier="version1" type=".tsx">{'export const wheel = 1;'}</Append>
            <Append type=".png">{'/assets/the-plate.png'}</Append>
        </Chapter>
    );

    it('stands on its chapter with the identifier and type the file spelled, its text the contents', () => {
        // FRONT-MOST FIRST, as the collection answers: the last written stands in front.
        const appends = chapter().annotations.find($Append);
        expect(appends.map(append => [append.$identifier, append.$type])).toEqual([['', '.png'], ['version1', '.tsx']]);
        expect(html.copy(appends[1].text)).toContain('export const wheel = 1;');
    });

    it('is hidden on the page as every annotation is, wearing its own mark, and the chapter\'s prose is untouched', () => {
        const Drawn = $(chapter());
        const html = renderToString(<Drawn />);
        expect(html).toMatch(/pa-append[^>]*>(<[^>]*>)*export const wheel = 1;/u);
        expect(html).toContain('What the plate is.');
    });

    it('is said of a chapter, and says so on a paragraph', () => {
        const paragraph = built<$Paragraph>(<Paragraph><Append type=".ts">{'x'}</Append>words</Paragraph>);
        expect(paragraph.specify().join('\n')).toContain('an append is said of a chapter, and this is not one');
        expect(new AppendSpecification()).toBeDefined();
    });
});
