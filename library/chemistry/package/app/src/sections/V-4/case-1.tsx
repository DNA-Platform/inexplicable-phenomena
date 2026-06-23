import React from 'react';
import { $, $Chemical } from '@/index';
import {
    TagInputFrame, TagField, TagFieldRow, TagAddButton,
    TagList, TagPill, TagRemove, TagCount,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $TagInput extends $Chemical {
    tags: string[] = [];
    draft = '';

    updateDraft(e: React.ChangeEvent<HTMLInputElement>) {
        this.draft = e.target.value;
    }

    submit() {
        const tag = this.draft.trim();
        if (tag && !this.tags.includes(tag)) {
            this.tags.push(tag);
            this.draft = '';
        }
    }

    onKey(e: React.KeyboardEvent) {
        if (e.key === 'Enter') this.submit();
    }

    remove(index: number) {
        this.tags.splice(index, 1);
    }

    view() {
        const hasTags = this.tags.length > 0;
        return (
            <>
                <TagInputFrame>
                    <TagFieldRow>
                        <TagField
                            placeholder="Type a tag..."
                            value={this.draft}
                            onChange={this.updateDraft}
                            onKeyDown={this.onKey}
                        />
                        <TagAddButton onClick={this.submit}>Add</TagAddButton>
                    </TagFieldRow>
                    <TagList>
                        {this.tags.map((tag, i) => (
                            <TagPill key={`${tag}-${i}`}>
                                {tag}
                                <TagRemove onClick={() => this.remove(i)}>&times;</TagRemove>
                            </TagPill>
                        ))}
                    </TagList>
                    {hasTags && <TagCount>{this.tags.length} tag{this.tags.length > 1 ? 's' : ''}</TagCount>}
                </TagInputFrame>
                <VerdictSection>
                    <VerdictRow $state={hasTags ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasTags ? 'pass' : 'pending'} />
                        {hasTags
                            ? `✓ ${this.tags.length} tag${this.tags.length > 1 ? 's' : ''} added via Array.push`
                            : '○ type a tag and press Enter'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const TagInput = $($TagInput);

export default function Case1Demo() {
    return <TagInput />;
}
