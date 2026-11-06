import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Annotation, AnnotationSpecification } from './Annotation';

export class $Reminder extends $Annotation {
    specification = new ReminderSpecification();

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-reminder'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class ReminderSpecification extends AnnotationSpecification {
    @specify('a reminder holds what to carry forward from its writing')
    $holdsWhatToCarry(writing: $Writing): void {
        $check(writing.annotations.find($Reminder).every(reminder => html.copy(reminder.text).trim() !== ''),
            'a reminder holds what to carry forward from its writing, and this one holds nothing');
    }
}

export const Reminder = $($Reminder);
