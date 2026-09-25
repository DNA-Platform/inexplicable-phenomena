import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation, Annotation, Annotations, $Parenthetical, Parenthetical, $Narrative, Narrative, Text } from '@dna-platform/public';
import { AnnotationSpecification, specify, Level, html, reflection } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

class $Quiet extends $Annotation {
    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-quiet'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}
class $Hushed extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Shouted)
                writing.annotations.express(annotation, false);
    }
}
class $Shouted extends $Annotation {
    specification = new ShoutedSpecification();

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-shouted');
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Quiet)
                writing.annotations.express(annotation, false);
    }

    override erase(writing: $Writing): void { writing.classes.revert(this); }
}
class ShoutedSpecification extends AnnotationSpecification {
    @specify('a shouted writing has something to shout')
    $hasSomethingToShout(writing: $Writing): void {
        $check([...writing.text].length > 0, 'a shouted writing has something to shout, and this one has nothing');
    }
}
class $Mark extends $Annotation { }
class $Stamp extends $Mark { }
class $Demanding extends $Annotation {
    specification = new DemandingSpecification();
}
class DemandingSpecification extends AnnotationSpecification {
    @specify('a demanding annotation wants something written')
    $wantsSomethingWritten(writing: $Writing): void {
        $check([...writing.text].length > 0, 'a demanding annotation wants something written');
    }
}
class $Boxed extends $Annotation {
    override defines(writing: $Writing): void {
        writing.containers.add(this, 'div');
    }

    override erase(writing: $Writing): void {
        writing.containers.revert(this);
    }
}
class $Tagged extends $Annotation {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-tagged');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}
class $Framed extends $Annotation {
    override defines(writing: $Writing): void {
        writing.containers.add(this, 'article');
    }

    override erase(writing: $Writing): void {
        writing.containers.revert(this);
    }
}
class $Unframed extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Framed)
                writing.annotations.express(annotation, false);
    }
}
class $Unstamped extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Stamp)
                writing.annotations.express(annotation, false);
    }
}
class $Excused extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Demanding)
                writing.annotations.express(annotation, false);
    }
}
const acts: string[] = [];
class $Logged extends $Annotation {
    override defines(writing: $Writing): void {
        acts.push(`defines ${html.copy(this.text)}`);
    }

    override erase(writing: $Writing): void {
        acts.push(`erase ${html.copy(this.text)}`);
    }
}
class $Tidying extends $Writing {
    $Tidying(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        for (const annotation of this.annotations.find($Annotation))
            this.annotations.remove(this, annotation);
    }
}
class $Aside extends $Writing {
    protected override $Define(): void {
        this.annotations.add(this, Parenthetical);
    }
}
const looked: string[][] = [];
class $Looking extends $Annotation {
    override defines(writing: $Writing): void {
        looked.push([...writing.annotations].map(annotation => reflection.name(annotation)));
    }
}
const read: boolean[][] = [];
class $Reading extends $Annotation {
    override defines(writing: $Writing): void {
        read.push([
            writing.annotations.expressed($Stamp) !== undefined,
            writing.annotations.expressed($Unstamped) !== undefined,
            writing.annotations.expressed(this) !== undefined,
        ]);
    }
}
class $Restamped extends $Annotation {
    override defines(writing: $Writing): void {
        for (const stamp of writing.annotations.find($Stamp))
            writing.annotations.express(stamp, true);
    }
}
class $Budding extends $Annotation {
    override defines(writing: $Writing): void {
        if (writing.annotations.find($Mark).length === 0)
            writing.annotations.add(writing, Mark);
    }
}
class $Grafting extends $Annotation {
    override defines(writing: $Writing): void {
        if (writing.annotations.find($Budding).length === 0)
            writing.annotations.add(writing, Budding);
    }
}
class $Owned extends $Writing {
    $Owned(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.classes.add(this, 'pa-tagged');
    }
}
class $Editing extends $Writing {
    strike(): void {
        for (const shouted of this.annotations.find($Shouted))
            this.annotations.remove(this, shouted);
    }
}
class $Section extends $Writing {
    $Section(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'section');
    }
}
class $Narrating extends $Writing {
    narrate(): void {
        this.annotations.add(this, Narrative);
    }
}
class $Growing extends $Writing {
    grow(): void {
        this.text.add(this, <Writing> more</Writing>);
    }
}
let draws = 0;
class $Counted extends $Writing {
    override view(): React.ReactNode {
        draws++;
        return super.view();
    }
}
const Mark = $($Mark);
const Stamp = $($Stamp);
const Demanding = $($Demanding);
const Boxed = $($Boxed);
const Tagged = $($Tagged);
const Framed = $($Framed);
const Unframed = $($Unframed);
const Unstamped = $($Unstamped);
const Excused = $($Excused);
const Logged = $($Logged);
const Editing = $($Editing);
const Owned = $($Owned);
const Looking = $($Looking);
const Reading = $($Reading);
const Restamped = $($Restamped);
const Budding = $($Budding);
const Grafting = $($Grafting);
const Tidying = $($Tidying);
const Aside = $($Aside);
const Section = $($Section);
const Counted = $($Counted);
const Narrating = $($Narrating);
const Growing = $($Growing);

const Quiet = $($Quiet);
const Shouted = $($Shouted);
const Hushed = $($Hushed);

describe('the four powers of an annotation, exercised on one class', () => {
    it('defines makes the trait, express takes a sibling out of expression, erase takes it back, specifies answers the binder', () => {
        const writing = built<$Writing>(<Writing>a word <Quiet /><Shouted /></Writing>);

        expect([...writing.classes]).toContain('pa-shouted');
        expect(writing.is($Shouted)).toBe(true);
        expect(writing.is($Quiet)).toBe(false);
        expect([...writing.classes]).not.toContain('pa-quiet');

        writing.$is = Hushed;
        writing.view();
        expect([...writing.classes]).not.toContain('pa-shouted');
        expect([...writing.classes]).toContain('pa-quiet');

        writing.$is = [];
        writing.view();
        expect([...writing.classes]).toContain('pa-shouted');
        expect([...writing.classes]).not.toContain('pa-quiet');
    });

    it('specifies answers the binder and nothing else does', () => {
        expect(built<$Writing>(<Writing>a word <Shouted /></Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Shouted /></Writing>).specify())
            .toEqual(['Writing: a shouted writing has something to shout, and this one has nothing']);
        expect(built<$Writing>(<Writing is={Hushed}><Shouted /></Writing>).specify()).toEqual([]);
    });

    it('a writing already drawn redraws when an annotation is added to its genome, when one is presented and taken away, and when a method of the writing strikes one', async () => {
        const writing = built<$Editing>(<Editing>a word</Editing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('');

        await act(async () => { writing.annotations.add(writing, Shouted); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('pa-shouted');

        await act(async () => { writing.$is = Hushed; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');

        await act(async () => { writing.$is = []; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('pa-shouted');

        await act(async () => { writing.strike(); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
        expect([...writing.annotations].length).toBe(0);
    });
});

describe('what comes into a writing is sorted once, into its text and its annotations', () => {
    it('its text holds what is not an annotation, in its order, wherever the annotations stood', () => {
        const writing = built<$Writing>(<Writing><Annotation /><Tidying /><Annotation /><Counted /></Writing>);
        const text = [...writing.text];
        expect(text.length).toBe(2);
        expect(text[0]).toBeInstanceOf($Tidying);
        expect(text[1]).toBeInstanceOf($Counted);
        expect([...writing.annotations].length).toBe(2);
    });

    it('an annotation written inside the prose stands beside the prose, and is found', () => {
        const writing = built<$Writing>(<Writing>before <Annotation /> after</Writing>);
        expect([...writing.annotations].length).toBe(1);
        expect([...writing.text].every(chemical => !(chemical instanceof $Annotation))).toBe(true);
    });

    it('both are collections, the annotations their own kind, and each writing has its own', () => {
        const writing = built<$Writing>(<Writing><Writing /></Writing>);
        expect(writing.text).toBeInstanceOf(Text);
        expect(writing.annotations).toBeInstanceOf(Annotations);
        expect(([...writing.text][0] as $Writing).text).not.toBe(writing.text);
    });

    it('in the annotations, add means the front at the next define, and the two questions count only what is expressed', () => {
        const writing = built<$Writing>(<Writing><Stamp /></Writing>);
        const [mark] = writing.annotations.add(writing, Mark);
        writing.annotations.define();
        expect([...writing.annotations][0]).toBe(mark);
        expect(writing.annotations.contains($Mark)).toBe(true);
        expect(writing.annotations.containsOne($Stamp)).toBe(true);
        expect(writing.annotations.containsOne($Mark)).toBe(false);
        writing.$is = Unstamped;
        writing.annotations.define();
        expect(writing.annotations.containsOne($Mark)).toBe(true);
        expect(writing.annotations.contains($Stamp)).toBe(false);
        expect(writing.annotations.find($Mark).length).toBe(2);
    });

    it('the annotations say what they hold: each member\'s symbol in order, the genome of the writing, changing the moment one joins or leaves and never when a define decides expression', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /><Mark /></Writing>);
        expect(String(writing.annotations)).toMatch(/^\$Chemistry\.\$Mark\[\d+\],\$Chemistry\.\$Parenthetical\[\d+\],$/);
        const before = String(writing.annotations);
        const [stamp] = writing.annotations.add(writing, Stamp);
        expect(String(writing.annotations)).not.toBe(before);
        writing.annotations.remove(writing, stamp);
        expect(String(writing.annotations)).toBe(before);
        const narrated = built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>);
        const code = String(narrated.annotations);
        narrated.annotations.define();
        expect(String(narrated.annotations)).toBe(code);
    });

    it('an annotation written later stands nearer the front, and what $is stands is in front of them all', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Stamp /><Mark /></Writing>);
        const annotations = [...writing.annotations];
        expect(annotations[0]).toBeInstanceOf($Narrative);
        expect(annotations[1]).toBeInstanceOf($Mark);
        expect(annotations[1]).not.toBeInstanceOf($Stamp);
        expect(annotations[2]).toBeInstanceOf($Stamp);
    });
});

describe('$is declares what a writing is from outside: one or many, at the front, changed by changing it', () => {
    it('takes one, or a list of a class, a component, an element or a chemical', () => {
        const writing = built<$Writing>(<Writing is={[$Mark, Parenthetical]} />);
        expect(writing.annotations.find($Mark).length).toBe(1);
        expect(writing.annotations.find($Parenthetical).length).toBe(1);
        const elemental = built<$Writing>(<Writing is={[<Mark />, built<$Parenthetical>(<Parenthetical />)]} />);
        expect([...elemental.annotations].length).toBe(2);
        expect([...built<$Writing>(<Writing is={Narrative} />).annotations][0]).toBeInstanceOf($Narrative);
        expect([...built<$Writing>(<Writing is={$Mark} />).annotations][0]).toBeInstanceOf($Mark);
    });

    it('reads as what was given; the annotations possess the edits, what it became, and the full set; setting it makes the edits at once and the next define integrates them, dropping what it stood before and keeping what was written; the same given again is nothing', () => {
        const writing = built<$Writing>(<Writing is={$Mark}><Parenthetical /></Writing>);
        expect(writing.$is).toBe($Mark);
        expect(writing.annotations.edits.length).toBe(1);
        expect(writing.annotations.edits[0]).toBe([...writing.annotations][0]);
        expect([...writing.annotations].length).toBe(2);
        const mark = writing.annotations.edits[0];
        writing.$is = $Mark;
        expect(writing.annotations.edits[0]).toBe(mark);
        writing.$is = [$Mark];
        expect(writing.annotations.edits[0]).not.toBe(mark);
        const marked = writing.annotations.edits[0];
        writing.$is = [$Mark];
        expect(writing.annotations.edits[0]).toBe(marked);
        writing.$is = [];
        expect(writing.annotations.edits.length).toBe(0);
        writing.annotations.define();
        expect([...writing.annotations].length).toBe(1);
        expect([...writing.annotations][0]).toBeInstanceOf($Parenthetical);
    });

    it('define stands what $is gives in front of everything before it walks, so an annotation given from outside acts before what was written', () => {
        const written = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        expect([...written.classes]).not.toContain('pa-parenthetical');
        written.view();
        expect([...written.classes]).not.toContain('pa-parenthetical');
        expect(written.annotations.find($Parenthetical)[0]).toBe([...written.annotations][1]);
    });

    it('stands at the front in its order, and is not made unique', () => {
        const writing = built<$Writing>(<Writing is={[$Mark, $Parenthetical]}><Mark /></Writing>);
        const annotations = [...writing.annotations];
        expect(annotations[0]).toBeInstanceOf($Mark);
        expect(annotations[1]).toBeInstanceOf($Parenthetical);
        expect(writing.annotations.find($Mark).length).toBe(2);
        expect(writing.annotations.find($Mark)[0]).toBe(annotations[0]);
    });

    it('what it stands is parented to the writing', () => {
        const writing = built<$Writing>(<Writing is={[$Mark, <Narrative />]} />);
        for (const annotation of writing.annotations)
            expect(annotation.parent).toBe(writing);
    });
});

describe('an annotation acts on the writing it stands in, at the bond and at every draw', () => {
    it('classes is a set each writing resets at its bond and its annotations fill at every pass; Parenthetical adds pa-parenthetical', () => {
        expect([...built<$Writing>(<Writing />).classes]).toEqual([]);
        expect([...built<$Writing>(<Writing>an aside <Parenthetical /></Writing>).classes]).toContain('pa-parenthetical');
        expect([...built<$Writing>(<Writing is={Parenthetical}>an aside</Writing>).classes]).toContain('pa-parenthetical');
        const writing = built<$Writing>(<Writing><Parenthetical /><Tagged /></Writing>);
        expect([...writing.classes]).toEqual(['pa-tagged', 'pa-parenthetical']);
        expect([...built<$Writing>(<Writing><Parenthetical /></Writing>).classes]).not.toContain('pa-tagged');
        writing.$is = Narrative;
        writing.view();
        expect([...writing.classes]).toEqual(['pa-tagged']);
    });

    it('an annotation that is not expressed erases what it defined, and another annotation taking it out of expression is the door to that', () => {
        const aside = built<$Writing>(<Writing>an aside <Parenthetical /></Writing>);
        expect([...aside.classes]).toContain('pa-parenthetical');
        aside.$is = Narrative;
        aside.view();
        expect([...aside.classes]).not.toContain('pa-parenthetical');
        expect(aside.is($Parenthetical)).toBe(false);
        expect([...built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>).classes]).not.toContain('pa-parenthetical');
        const natural = built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>);
        expect([...natural.classes]).not.toContain('pa-parenthetical');
        expect(natural.is($Parenthetical)).toBe(false);
        expect([...natural.annotations].length).toBe(2);
    });

    it('the first is the most powerful: an annotation takes what stands behind it out of expression, and has nothing to reach in one that has already run', () => {
        const ahead = built<$Writing>(<Writing><Parenthetical /><Narrative /></Writing>);
        expect([...ahead.annotations][0]).toBeInstanceOf($Narrative);
        expect([...ahead.classes]).not.toContain('pa-parenthetical');
        expect(ahead.is($Parenthetical)).toBe(false);
        const behind = built<$Writing>(<Writing><Narrative /><Parenthetical /></Writing>);
        expect([...behind.annotations][0]).toBeInstanceOf($Parenthetical);
        expect([...behind.classes]).toContain('pa-parenthetical');
        expect(behind.is($Parenthetical)).toBe(true);
    });

    it('the pass is idempotent: what the view\'s pass leaves is what the bond\'s pass left', () => {
        for (const writing of [
            built<$Writing>(<Writing>a <Parenthetical /><Tagged /></Writing>),
            built<$Writing>(<Writing is={Narrative}><Parenthetical /><Tagged /></Writing>),
            built<$Aside>(<Aside is={Mark}>a</Aside>),
        ]) {
            const classes = [...writing.classes];
            const expressed = [...writing.annotations].map(annotation => writing.annotations.expressed(annotation) !== undefined);
            writing.view();
            expect([...writing.classes]).toEqual(classes);
            expect([...writing.annotations].map(annotation => writing.annotations.expressed(annotation) !== undefined)).toEqual(expressed);
        }
    });

    it('an annotation that leaves lets what it took out of expression express again, since every pass computes expression from what the genome holds', () => {
        const writing = built<$Writing>(<Writing><Parenthetical /></Writing>);
        expect([...writing.classes]).toContain('pa-parenthetical');
        const [narrative] = writing.annotations.add(writing, Narrative);
        writing.view();
        expect([...writing.classes]).not.toContain('pa-parenthetical');
        expect(writing.is($Parenthetical)).toBe(false);
        writing.annotations.remove(writing, narrative);
        writing.view();
        expect([...writing.classes]).toContain('pa-parenthetical');
        expect(writing.is($Parenthetical)).toBe(true);
    });

    it('acting is idempotent, and an annotation acts on a copy of the list', () => {
        const writing = built<$Writing>(<Writing is={Narrative}><Parenthetical /></Writing>);
        writing.view();
        writing.view();
        expect([...writing.annotations].length).toBe(2);
        expect([...writing.classes]).not.toContain('pa-parenthetical');
    });

    it('a class stands its own annotations in $Define, before the first pass, and what $is gives stands in front of them', () => {
        const aside = built<$Aside>(<Aside is={Mark}>a</Aside>);
        expect([...aside.annotations][0]).toBeInstanceOf($Mark);
        expect([...aside.annotations][1]).toBeInstanceOf($Parenthetical);
        expect([...aside.classes]).toContain('pa-parenthetical');
        const narrated = built<$Aside>(<Aside is={Narrative}>a</Aside>);
        expect([...narrated.classes]).not.toContain('pa-parenthetical');
    });
});

describe('a define takes back what ran, applies what changed, stands the edits of $is in front, and runs the annotations from the first', () => {
    it('erases what ran last time, last first, and then runs every annotation from the first', () => {
        const writing = built<$Writing>(<Writing>a <Logged>behind</Logged><Logged>front</Logged></Writing>);
        acts.length = 0;
        writing.annotations.define();
        expect(acts).toEqual(['erase behind', 'erase front', 'defines front', 'defines behind']);
    });

    it('is a stack: the annotation added last is first, runs first, and is the most powerful', () => {
        const stopped = built<$Writing>(<Writing><Stamp /><Unstamped /></Writing>);
        expect([...stopped.annotations][0]).toBeInstanceOf($Unstamped);
        expect(stopped.is($Stamp)).toBe(false);
        const standing = built<$Writing>(<Writing><Unstamped /><Stamp /></Writing>);
        expect([...standing.annotations][0]).toBeInstanceOf($Stamp);
        expect(standing.is($Stamp)).toBe(true);
    });

    it('takes several for one author, the elements of a $Define stacked as TSX, and stands them at the front in the order written', () => {
        const writing = built<$Writing>(<Writing>a <Parenthetical /></Writing>);
        writing.annotations.add(writing,
            <Mark />,
            <Narrative />
        );
        writing.annotations.define();
        expect([...writing.annotations].map(annotation => reflection.name(annotation))).toEqual(['Mark', 'Narrative', 'Parenthetical']);
    });

    it('holds a change until the next define, so what is read is what the last define established', () => {
        const writing = built<$Writing>(<Writing>a <Mark /></Writing>);
        const [stamp] = writing.annotations.add(writing, Stamp);
        expect(writing.annotations.find($Stamp)).toEqual([]);
        writing.annotations.define();
        expect([...writing.annotations][0]).toBe(stamp);
        writing.annotations.remove(writing, stamp);
        expect(writing.annotations.find($Stamp)).toEqual([stamp]);
        writing.annotations.define();
        expect(writing.annotations.find($Stamp)).toEqual([]);
    });

    it('is the one place an annotation acts: a removal waits for the define, which erases what the removed one did', () => {
        const writing = built<$Writing>(<Writing>a <Logged>only</Logged></Writing>);
        acts.length = 0;
        writing.annotations.remove(writing, writing.annotations.find($Logged)[0]);
        expect(acts).toEqual([]);
        writing.annotations.define();
        expect(acts).toEqual(['erase only']);
    });

    it('takes back what an annotation did after it left, however it left, because it erases what ran and not what is still there', () => {
        const removed = built<$Writing>(<Writing>a <Boxed /></Writing>);
        removed.annotations.remove(removed, removed.annotations.find($Boxed)[0]);
        removed.annotations.define();
        expect([...removed.containers]).toEqual(['span']);
        const given = built<$Writing>(<Writing is={Boxed}>a</Writing>);
        expect([...given.containers]).toEqual(['span', 'div']);
        given.$is = [];
        given.annotations.define();
        expect([...given.containers]).toEqual(['span']);
    });

    it('draws an annotation that leaves and comes back where it drew before, since a define depends on what the annotations are and never on how they got there', () => {
        const writing = built<$Writing>(<Writing>a <Boxed /><Framed /></Writing>);
        expect([...writing.containers]).toEqual(['span', 'article', 'div']);
        writing.$is = Unframed;
        writing.annotations.define();
        expect([...writing.containers]).toEqual(['span', 'div']);
        writing.$is = [];
        writing.annotations.define();
        expect([...writing.containers]).toEqual(['span', 'article', 'div']);
    });

    it('stands the edits of $is in front at every define, cited to the collection, so revert(this) takes back exactly them and what was written stays', () => {
        const writing = built<$Writing>(<Writing is={Narrative}>a <Parenthetical /></Writing>);
        writing.annotations.add(writing, Mark);
        writing.annotations.define();
        expect([...writing.annotations].map(annotation => reflection.name(annotation))).toEqual(['Narrative', 'Mark', 'Parenthetical']);
        writing.$is = [];
        writing.annotations.define();
        expect([...writing.annotations].map(annotation => reflection.name(annotation))).toEqual(['Mark', 'Parenthetical']);
    });

    it('never takes what the writing holds of its own: an annotation that adds a class the writing also has takes back only its own', () => {
        const writing = built<$Writing>(<Owned>a <Tagged /></Owned>);
        expect([...writing.classes]).toEqual(['pa-tagged', 'pa-tagged']);
        writing.annotations.remove(writing, writing.annotations.find($Tagged)[0]);
        writing.annotations.define();
        expect([...writing.classes]).toEqual(['pa-tagged']);
    });

    it('answers whether an annotation or a type is expressed, and does nothing for a hand outside a define', () => {
        const writing = built<$Writing>(<Writing>a <Stamp /><Unstamped /></Writing>);
        const stamp = writing.annotations.find($Stamp)[0];
        expect(writing.annotations.expressed(stamp)).toBeUndefined();
        expect(writing.annotations.expressed($Stamp)).toBeUndefined();
        expect(writing.annotations.expressed($Unstamped)).toBeInstanceOf($Unstamped);
        writing.annotations.express(stamp);
        expect(writing.annotations.expressed(stamp)).toBeUndefined();
    });
});

describe('while a define runs the annotations are one generation: the genome it established, and a record of what it called defines on', () => {
    it('answers, while it runs, the genome the define established, whole and in order, every annotation however it will be expressed', () => {
        const writing = built<$Writing>(<Writing>a <Mark /><Stamp /><Unstamped /><Looking /></Writing>);
        looked.length = 0;
        writing.annotations.define();
        expect(looked).toEqual([['Looking', 'Unstamped', 'Stamp', 'Mark']]);
    });

    it('answers expression by what the run did for everything it has reached, and by what was asked for everything ahead, which starts expressed', () => {
        const ahead = built<$Writing>(<Writing>a <Stamp /><Unstamped /><Reading /></Writing>);
        read.length = 0;
        ahead.annotations.define();
        expect(read).toEqual([[true, true, true]]);
        const behind = built<$Writing>(<Writing>a <Reading /><Stamp /><Unstamped /></Writing>);
        read.length = 0;
        behind.annotations.define();
        expect(read).toEqual([[false, true, true]]);
    });

    it('lets a later annotation give expression back to one not yet reached, so the last word before an annotation is reached decides', () => {
        const given = built<$Writing>(<Writing>a <Stamp /><Restamped /><Unstamped /></Writing>);
        expect(given.is($Stamp)).toBe(true);
        const taken = built<$Writing>(<Writing>a <Stamp /><Unstamped /><Restamped /></Writing>);
        expect(taken.is($Stamp)).toBe(false);
    });

    it('records only what it called defines on, so an annotation reaching back to one already reached changes nothing the collection says of it', () => {
        const passed = built<$Writing>(<Writing>a <Restamped /><Stamp /><Unstamped /></Writing>);
        expect(passed.is($Stamp)).toBe(false);
        const ran = built<$Writing>(<Writing>a <Unstamped /><Stamp /></Writing>);
        expect(ran.is($Stamp)).toBe(true);
    });

    it('lets an annotation change the genome while it runs, and the change is the next generation: the run and every read stay on the genome it established', () => {
        const writing = built<$Writing>(<Writing>a <Budding /></Writing>);
        expect(writing.annotations.find($Mark)).toEqual([]);
        writing.annotations.define();
        expect(writing.annotations.find($Mark).length).toBe(1);
        writing.annotations.define();
        expect(writing.annotations.find($Mark).length).toBe(1);
    });

    it('lets recursion unfold one generation a define: an annotation added by an annotation adds another', () => {
        const writing = built<$Writing>(<Writing>a <Grafting /></Writing>);
        expect(writing.annotations.find($Budding)).toEqual([]);
        writing.annotations.define();
        expect(writing.annotations.find($Budding).length).toBe(1);
        expect(writing.annotations.find($Mark)).toEqual([]);
        writing.annotations.define();
        expect(writing.annotations.find($Mark).length).toBe(1);
    });

    it('drawn, settles once the genome stops changing: two generations of additions cost the three draws of any mount, each draw a define', async () => {
        const writing = built<$Counted>(<Counted>a <Grafting /></Counted>);
        const Drawn = $(writing);
        draws = 0;
        await act(async () => { render(<Drawn />); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(writing.annotations.find($Mark).length).toBe(1);
        expect(draws).toBe(3);
    });

    it('answers at an index what it answers by iterating, which for the annotations is what the last define established', () => {
        const writing = built<$Writing>(<Writing>a <Mark /><Stamp /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Stamp);
        expect(writing.annotations.at(-1)).toBe(writing.annotations.find($Mark).find(mark => !(mark instanceof $Stamp)));
        writing.annotations.add(writing, Parenthetical);
        expect(writing.annotations.at(0)).toBeInstanceOf($Stamp);
        writing.annotations.define();
        expect(writing.annotations.at(0)).toBeInstanceOf($Parenthetical);
    });
});

describe('a writing draws through its containers, a layer for itself and one for each annotation that adds one', () => {
    it('is a span until a class says otherwise, and an annotation adds its layer under its own key', () => {
        expect([...built<$Writing>(<Writing />).containers]).toEqual(['span']);
        expect([...built<$Section>(<Section />).containers]).toEqual(['section']);
        expect([...built<$Writing>(<Writing><Boxed /></Writing>).containers]).toEqual(['span', 'div']);
        expect([...built<$Writing>(<Writing is={Boxed} />).containers]).toEqual(['span', 'div']);
    });

    it('draws its layers inner to outer: the first is its own element, wearing the classes and the id, and each after it wraps the one before', async () => {
        const writing = built<$Writing>(<Writing>a <Boxed /><Tagged /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const outermost = container?.firstElementChild;
        expect(outermost?.tagName).toBe('DIV');
        expect(outermost?.className).toBe('pd-container');
        expect(outermost?.firstElementChild?.tagName).toBe('SPAN');
        expect(outermost?.firstElementChild?.className).toBe('pa-tagged');
    });

    it('marks every layer around it pd-container and never its own element, so a rule can reach its layers without reaching the writing that holds it', async () => {
        const writing = built<$Writing>(<Writing>outer <Writing>inner <Boxed /><Framed /></Writing></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const outer = container!.firstElementChild!;
        expect(outer.tagName).toBe('SPAN');
        expect(outer.className).toBe('');
        const layers = [...outer.querySelectorAll('.pd-container')].map(layer => layer.tagName);
        expect(layers).toEqual(['DIV', 'ARTICLE']);
        expect(outer.querySelector('article.pd-container > span')?.className).toBe('');
    });

    it('drawn, the container is the element its classes are on, and each annotation is rendered inside it as its own writing with pd-annotation on it', async () => {
        const writing = built<$Section>(<Section>a <Mark /><Tagged /><Parenthetical /></Section>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const section = container?.firstElementChild;
        expect(section?.tagName).toBe('SECTION');
        expect(section?.className).toBe('pa-parenthetical pa-tagged');
        expect(section?.querySelectorAll(':scope > span.pd-annotation').length).toBe(3);
        expect(section?.textContent).toContain('a');
    });

    it('an annotation is a note on the page: what someone wrote inside it is rendered at its writing, with pd-annotation on it, and its note renders at the level of that writing, nothing by default; the annotations render back to front, the front last', async () => {
        const writing = built<$Writing>(<Writing>a <Mark>because it was late</Mark><Tagged /></Writing>);
        expect([...writing.annotations][0]).toBeInstanceOf($Tagged);
        expect([...writing.annotations.find($Mark)[0].classes]).toContain('pd-annotation');
        expect(writing.annotations.find($Mark)[0].note()).toBeNull();
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        const notes = container?.querySelectorAll('span.pd-annotation');
        expect(notes?.length).toBe(2);
        expect(notes?.[0].textContent).toBe('because it was late');
        expect(notes?.[1].textContent).toBe('');
        expect(container?.firstElementChild?.childElementCount).toBe(2);
    });

    it('Parenthetical renders, as its note, the styled global style that targets pa-parenthetical; an annotation that is not expressed renders no note', async () => {
        const writing = built<$Writing>(<Writing>an aside <Parenthetical /></Writing>);
        const parenthetical = writing.annotations.find($Parenthetical)[0];
        const style = parenthetical.note() as React.ReactElement;
        expect(style).not.toBeNull();
        expect(typeof style.type).toBe('object');
        expect((style.type as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.memo'));
        const narrated = built<$Writing>(<Writing>an aside <Parenthetical /><Narrative /></Writing>);
        const unexpressed = narrated.annotations.find($Parenthetical)[0];
        const drawn = unexpressed.view() as React.ReactElement<{ children: React.ReactNode[] }>;
        expect(drawn.props.children[1]).toBeNull();
    });
});

describe('drawn, a writing defines itself at every draw and settles', () => {
    it('a parenthetical writing has pa-parenthetical on it, and one draw is one draw', async () => {
        const writing = built<$Counted>(<Counted>a <Parenthetical /></Counted>);
        const Drawn = $(writing);
        draws = 0;
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.querySelector('span.pa-parenthetical')?.textContent).toContain('a');
        expect(draws).toBeLessThanOrEqual(3);
    });

    it('an annotation given through $is takes the trait out of expression and redraws the writing without it, and taking it away redraws with it again', async () => {
        const writing = built<$Writing>(<Writing>a <Parenthetical /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('pa-parenthetical');
        await act(async () => { writing.$is = Narrative; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
        await act(async () => { writing.$is = []; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('pa-parenthetical');
    });

    it('setting $is from outside redraws the writing as what it now is', async () => {
        const writing = built<$Writing>(<Writing>a <Parenthetical /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        expect(container?.firstElementChild?.className).toBe('pa-parenthetical');
        await act(async () => { writing.$is = Narrative; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
    });

    it('the collections are live: a method of the writing adding an annotation redraws it, and one adding content shows the new text', async () => {
        const narrating = built<$Narrating>(<Narrating>an aside <Parenthetical /></Narrating>);
        const DrawnNarrating = $(narrating);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<DrawnNarrating />).container; });
        expect(container?.firstElementChild?.className).toBe('pa-parenthetical');
        await act(async () => { narrating.narrate(); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.className).toBe('');
        const growing = built<$Growing>(<Growing>some</Growing>);
        const DrawnGrowing = $(growing);
        let grown: HTMLElement | undefined;
        await act(async () => { grown = render(<DrawnGrowing />).container; });
        expect(grown?.textContent).toBe('some');
        await act(async () => { growing.grow(); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(grown?.textContent).toBe('some more');
    });
});

describe('specify is the assert the binder calls; it is called by nothing in the library and cascades down', () => {
    it('answers the failures of the writing, and nothing when it is up to code; Writing itself has no rule, a letter may hold anything', () => {
        expect(built<$Writing>(<Writing><Writing /></Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing>a</Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Demanding /></Writing>).specify()).toEqual(['Writing: a demanding annotation wants something written']);
    });

    it('the bond does not specify; a writing holding a string is built, and refused only when asked', () => {
        expect(() => built<$Writing>(<Writing>a</Writing>)).not.toThrow();
    });

    it('every expressed annotation weighs in through specifies', () => {
        const wanting = built<$Writing>(<Writing><Demanding /></Writing>);
        expect(wanting.specify()).toEqual(['Writing: a demanding annotation wants something written']);
        expect(built<$Writing>(<Writing><Demanding /><Excused /></Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Demanding /><Writing /></Writing>).specify()).toEqual([]);
    });

    it('cascades through its text, so every failure within the writing appears', () => {
        const writing = built<$Writing>(<Writing><Writing><Demanding /></Writing><Writing><Writing><Demanding /></Writing></Writing><Demanding /></Writing>);
        const failures = writing.specify();
        expect(failures).toEqual([
            'Writing / Writing 0: a demanding annotation wants something written',
            'Writing / Writing 1 / Writing 0: a demanding annotation wants something written',
        ]);
    });

    it('never specifies an annotation: an annotation weighs in on the writing it annotates, and is not itself checked', () => {
        const annotated = built<$Writing>(<Writing><Writing /><Mark><Demanding /></Mark></Writing>);
        expect(annotated.specify()).toEqual([]);
    });

    it('reports every rule an annotation carries, not only the first that fails', () => {
        const writing = built<$Writing>(<Writing><Level>x</Level></Writing>);
        expect(writing.specify()).toEqual([
            'Writing: a level is said of a composition, and this is not one',
            'Writing: a level is a number, and this one was written as something else',
        ]);
    });

    it('a subclass adjusts its collections in its own bond, after calling Writing\'s, and a change to its annotations lands at the next define', () => {
        const writing = built<$Writing>(<Tidying><Annotation /><Writing /></Tidying>);
        writing.annotations.define();
        expect([...writing.annotations].length).toBe(0);
        expect([...writing.text].length).toBe(1);
        expect(writing.specify()).toEqual([]);
    });
});
