import React from 'react';
import { $, $Chemical } from '@/index';
import {
    FormFrame, FieldGroup, FieldLabel, FieldInput, FieldTextarea,
    FieldError, SubmitButton, SuccessBanner,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $ContactForm extends $Chemical {
    name = '';
    email = '';
    message = '';
    submitted = false;

    get $errors(): { name?: string; email?: string; message?: string } {
        const errors: { name?: string; email?: string; message?: string } = {};
        if (!this.name.trim()) errors.name = 'Name is required';
        if (!this.email.includes('@')) errors.email = 'Email must contain @';
        if (this.message.length < 10) errors.message = `Message must be at least 10 characters (${this.message.length}/10)`;
        return errors;
    }

    get $isValid(): boolean {
        return Object.keys(this.$errors).length === 0;
    }

    setName(e: React.ChangeEvent<HTMLInputElement>) {
        this.name = e.target.value;
    }

    setEmail(e: React.ChangeEvent<HTMLInputElement>) {
        this.email = e.target.value;
    }

    setMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.message = e.target.value;
    }

    submit(e: React.FormEvent) {
        e.preventDefault();
        if (this.$isValid) this.submitted = true;
    }

    view() {
        const errors = this.$errors;
        const passed = this.submitted;

        if (passed) {
            return (
                <>
                    <SuccessBanner>
                        Message sent from {this.name} ({this.email})
                    </SuccessBanner>
                    <VerdictSection>
                        <VerdictRow $state="pass">
                            <VerdictDot $state="pass" />
                            ✓ form submitted — all validations passed, $submitted flipped to true
                        </VerdictRow>
                    </VerdictSection>
                </>
            );
        }

        return (
            <>
                <FormFrame onSubmit={this.submit}>
                    <FieldGroup>
                        <FieldLabel>Name</FieldLabel>
                        <FieldInput
                            placeholder="Jane Doe"
                            value={this.name}
                            onChange={this.setName}
                        />
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>Email</FieldLabel>
                        <FieldInput
                            placeholder="jane@example.com"
                            value={this.email}
                            onChange={this.setEmail}
                        />
                        {errors.email && <FieldError>{errors.email}</FieldError>}
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>Message</FieldLabel>
                        <FieldTextarea
                            placeholder="Tell us something..."
                            value={this.message}
                            onChange={this.setMessage}
                        />
                        {errors.message && <FieldError>{errors.message}</FieldError>}
                    </FieldGroup>
                    <SubmitButton $disabled={!this.$isValid} type="submit">
                        Send message
                    </SubmitButton>
                </FormFrame>
                <VerdictSection>
                    <VerdictRow $state={this.$isValid ? 'pass' : 'pending'}>
                        <VerdictDot $state={this.$isValid ? 'pass' : 'pending'} />
                        {this.$isValid
                            ? '✓ all fields valid — click Send to submit'
                            : '○ fill all fields correctly to enable submit'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const ContactForm = $($ContactForm);

export default function Case1Demo() {
    return <ContactForm />;
}
