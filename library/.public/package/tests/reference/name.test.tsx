import { renderToStaticMarkup } from 'react-dom/server';
import { $, $Chemical, $check } from '@dna-platform/chemistry';
import { $Name, Name } from '@/index';
import { test, expect } from 'vitest';

test('$Name renders its content and frames it as a link', () => {
    const html = renderToStaticMarkup(<Name>Moby-Dick</Name>);
    expect(html).toContain('Moby-Dick');
    expect(html).toContain('<a');
});

class $Holder extends $Chemical {
    named!: $Name;

    $Holder(named: $Name) {
        this.named = $check(named, $Name);
    }

    view() {
        return <div className="out">{this.named.symbol}</div>;
    }
}
const Holder = $($Holder);

test('$Name.symbol is the text of a bare-string name', () => {
    const html = renderToStaticMarkup(<Holder><Name>Moby-Dick</Name></Holder>);
    expect(html).toContain('>Moby-Dick<');
});

test('$Name.symbol flattens nested markup, stripping the tags', () => {
    const html = renderToStaticMarkup(
        <Holder><Name><span>The <b>Whale</b></span></Name></Holder>
    );
    expect(html).toContain('The Whale');
    expect(html).not.toContain('<b>');
});
