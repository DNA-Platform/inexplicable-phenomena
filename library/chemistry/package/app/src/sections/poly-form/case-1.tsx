import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    FormFrame, FieldGroup, FieldLabel, FieldInput, FieldSelect,
    CheckboxRow, Checkbox, FieldError, SubmitButton, SuccessBanner,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $FormField extends $Chemical {
    $label = '';
    $required = false;
    error = '';

    validate(): boolean {
        return true;
    }

    renderInput(): React.ReactNode {
        return null;
    }

    view() {
        return (
            <FieldGroup>
                <FieldLabel>{this.$label}{this.$required ? ' *' : ''}</FieldLabel>
                {this.renderInput()}
                {this.error && <FieldError>{this.error}</FieldError>}
            </FieldGroup>
        );
    }
}

class $TextField extends $FormField {
    value = '';
    valid = false;
    $minLength = 0;
    $pattern?: string;
    $patternHint?: string;

    setValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.value = e.target.value;
        if (this.error) this.error = '';
        if (this.value.trim()) {
            this.valid = true;
            setTimeout(() => { this.valid = false; }, 600);
        }
    }

    validate(): boolean {
        const v = this.value.trim();
        if (this.$required && !v) {
            this.error = `${this.$label} is required`;
            this.valid = false;
            return false;
        }
        if (this.$minLength && v.length < this.$minLength) {
            this.error = `${this.$label} must be at least ${this.$minLength} characters`;
            this.valid = false;
            return false;
        }
        if (this.$pattern && v && !new RegExp(this.$pattern).test(v)) {
            this.error = this.$patternHint || `Invalid ${this.$label.toLowerCase()}`;
            this.valid = false;
            return false;
        }
        this.error = '';
        return true;
    }

    renderInput() {
        return (
            <FieldInput
                type="text"
                value={this.value}
                onChange={this.setValue}
                placeholder={this.$label}
                $hasError={!!this.error}
                $valid={this.valid}
            />
        );
    }
}

class $SelectField extends $FormField {
    value = '';
    $options: string[] = [];
    valid = false;

    setValue(e: React.ChangeEvent<HTMLSelectElement>) {
        this.value = e.target.value;
        if (this.error) this.error = '';
        if (this.value) {
            this.valid = true;
            setTimeout(() => { this.valid = false; }, 600);
        }
    }

    validate(): boolean {
        if (this.$required && !this.value) {
            this.error = `Please select a ${this.$label.toLowerCase()}`;
            this.valid = false;
            return false;
        }
        this.error = '';
        return true;
    }

    renderInput() {
        return (
            <FieldSelect
                value={this.value}
                onChange={this.setValue}
                $hasError={!!this.error}
                $valid={this.valid}
                aria-label={this.$label}
                title={this.$label}
            >
                <option value="">Select {this.$label}...</option>
                {this.$options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </FieldSelect>
        );
    }
}

class $CheckboxField extends $FormField {
    checked = false;

    toggle() {
        this.checked = !this.checked;
        if (this.error) this.error = '';
    }

    validate(): boolean {
        if (this.$required && !this.checked) {
            this.error = `You must accept the terms to continue`;
            return false;
        }
        this.error = '';
        return true;
    }

    renderInput() {
        return (
            <CheckboxRow>
                <Checkbox
                    type="checkbox"
                    checked={this.checked}
                    onChange={this.toggle}
                />
                {this.$label}
            </CheckboxRow>
        );
    }

    view() {
        return (
            <FieldGroup>
                {this.renderInput()}
                {this.error && <FieldError>{this.error}</FieldError>}
            </FieldGroup>
        );
    }
}

class $Form extends $Chemical {
    fields: $FormField[] = [];
    submitted = false;
    bannerVisible = false;
    attemptedSubmit = false;

    $Form(...fields: $FormField[]) {
        this.fields = fields.map(f => $check(f, $FormField));
    }

    get allFilled(): boolean {
        return this.fields.every(f => {
            if (f instanceof $TextField) return !!f.value.trim();
            if (f instanceof $SelectField) return !!f.value;
            if (f instanceof $CheckboxField) return f.checked;
            return true;
        });
    }

    get errorCount(): number {
        return this.fields.filter(f => !!f.error).length;
    }

    submit(e: React.FormEvent) {
        e.preventDefault();
        this.attemptedSubmit = true;
        let allValid = true;
        for (const field of this.fields) {
            if (!field.validate()) allValid = false;
        }
        if (allValid) {
            this.submitted = true;
            setTimeout(() => { this.bannerVisible = true; }, 50);
        }
    }

    view() {
        if (this.submitted) {
            return (
                <>
                    <SuccessBanner $visible={this.bannerVisible}>
                        Form submitted successfully with {this.fields.length} fields
                    </SuccessBanner>
                    <VerdictSection>
                        <VerdictRow $state="pass">
                            <VerdictDot $state="pass" />
                            {'✓ form submitted — all polymorphic fields validated and $submitted flipped to true'}
                        </VerdictRow>
                    </VerdictSection>
                </>
            );
        }

        const hasErrors = this.errorCount > 0;

        return (
            <>
                <FormFrame onSubmit={this.submit}>
                    {this.fields.map((field, i) => {
                        const Field = $(field);
                        return <Field key={i} />;
                    })}
                    <SubmitButton $disabled={false} type="submit">
                        {hasErrors
                            ? `${this.errorCount} error${this.errorCount === 1 ? '' : 's'} — fix and resubmit`
                            : this.attemptedSubmit ? 'Resubmit' : 'Submit'}
                    </SubmitButton>
                </FormFrame>
                <VerdictSection>
                    <VerdictRow $state={this.attemptedSubmit && hasErrors ? 'fail' : 'pending'}>
                        <VerdictDot $state={this.attemptedSubmit && hasErrors ? 'fail' : 'pending'} />
                        {this.attemptedSubmit && hasErrors
                            ? `✗ ${this.errorCount} field${this.errorCount === 1 ? '' : 's'} failed validation — each subclass validates independently`
                            : '○ click Submit with empty fields to trigger polymorphic validation'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const TextField = $($TextField);
const SelectField = $($SelectField);
const CheckboxField = $($CheckboxField);
const Form = $($Form);

export default function Case1Demo() {
    return (
        <Form>
            <TextField label="Name" required minLength={2} />
            <TextField
                label="Email"
                required
                pattern="^[^@]+@[^@]+\\.[^@]+$"
                patternHint="Enter a valid email (e.g. name@example.com)"
            />
            <SelectField label="Role" options={['Developer', 'Designer', 'Manager']} required />
            <CheckboxField label="I agree to the terms" required />
        </Form>
    );
}
