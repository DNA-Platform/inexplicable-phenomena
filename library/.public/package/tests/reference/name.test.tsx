import { renderToStaticMarkup } from 'react-dom/server';
import { $, $Chemical, $check, type $Html } from '@dna-platform/chemistry';
import { $Name, Name } from '@/index';
import { test, expect } from 'vitest';

test('$Name renders its content and frames it as a link', () => {
    const html = renderToStaticMarkup(<Name>Moby-Dick</Name>);
    expect(html).toContain('Moby-Dick');
    expect(html).toContain('<a');
});

class $Holder extends $Chemical {
    block?: $Html<'block'>;

    get named(): $Name | undefined {
        return this.block?.$elements?.find(e => e instanceof $Name) as $Name | undefined;
    }

    $Holder(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view() {
        return <div className="out">{this.named?.for}</div>;
    }
}
const Holder = $($Holder);

test('a name’s for is the name — surface and target coincide', () => {
    const html = renderToStaticMarkup(<Holder><Name>Moby-Dick</Name></Holder>);
    expect(html).toContain('>Moby-Dick<');
});

test('a name’s copy flattens nested markup, stripping the tags', () => {
    const html = renderToStaticMarkup(
        <Holder><Name><span>The <b>Whale</b></span></Name></Holder>
    );
    expect(html).toContain('The Whale');
    expect(html).not.toContain('<b>');
});
