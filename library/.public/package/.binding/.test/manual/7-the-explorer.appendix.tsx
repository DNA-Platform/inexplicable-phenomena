import { $ } from '@dna-platform/chemistry';
import { $Annotation, $Chapter, $Figure, $Paragraph, $Section, $Writing } from '@dna-platform/public';

export class $Appendix extends $Annotation {
    static of(chapter: $Chapter): $Section[] {
        return chapter.text.find($Section).filter(section => [...section.classes].includes('pa-appendix'));
    }

    static named(appendix: $Section): string {
        const appends = appendix.text.find($Paragraph).flatMap(paragraph => paragraph.text.find($Figure)).map(figure => figure.append).filter(append => append !== undefined);
        return appends.map(append => `${append.$identifier}${append.$type}`).join(' ') || (appendix.canonical?.name ?? '');
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-appendix');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        const section = this.parent;
        if (section instanceof $Section && ![...section.classes].includes('pa-appendix')) section.classes.add(this, 'pa-appendix');
        super.$Bound();
    }
}

export const Appendix = $($Appendix);
