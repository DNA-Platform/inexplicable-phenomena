import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    TodoFrame, TodoHeader, TodoInput, AddButton,
    TodoList, TodoRow, Checkbox, TodoText, DeleteButton,
    TodoFooter, ClearButton, TodoItemRow, TodoItemContent,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $TodoItem extends $Chemical {
    $text = '';
    done = false;

    toggle() { this.done = !this.done; }

    view() {
        return (
            <TodoRow $done={this.done}>
                <Checkbox $checked={this.done} onClick={this.toggle}>
                    {this.done ? '✓' : ''}
                </Checkbox>
                <TodoText>{this.$text}</TodoText>
            </TodoRow>
        );
    }
}

class $TodoApp extends $Chemical {
    items: $TodoItem[] = [];
    draft = '';

    $TodoApp(...items: $TodoItem[]) {
        this.items = items.map(i => $check(i, $TodoItem));
    }

    setDraft(value: string) { this.draft = value; }

    add() {
        const text = this.draft.trim();
        if (!text) return;
        const item = new $TodoItem();
        item.$text = text;
        this.items = [...this.items, item];
        this.draft = '';
    }

    remove(index: number) {
        this.items = this.items.filter((_, i) => i !== index);
    }

    clearCompleted() {
        this.items = this.items.filter(i => !i.done);
    }

    get remaining() { return this.items.filter(i => !i.done).length; }
    get completed() { return this.items.filter(i => i.done).length; }

    view() {
        const hasItems = this.items.length > 0;
        const hasCompleted = this.completed > 0;
        return (
            <>
                <TodoFrame>
                    <TodoHeader>
                        <TodoInput
                            value={this.draft}
                            onChange={(e) => this.setDraft(e.currentTarget.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') this.add(); }}
                            placeholder="What needs to be done?"
                        />
                        <AddButton onClick={this.add}>Add</AddButton>
                    </TodoHeader>
                    <TodoList>
                        {this.items.map((item, i) => {
                            const Item = $(item);
                            return (
                                <TodoItemRow key={i}>
                                    <TodoItemContent><Item /></TodoItemContent>
                                    <DeleteButton onClick={() => this.remove(i)}>×</DeleteButton>
                                </TodoItemRow>
                            );
                        })}
                    </TodoList>
                    {hasItems && (
                        <TodoFooter>
                            <span>{this.remaining} remaining</span>
                            {hasCompleted && (
                                <ClearButton onClick={this.clearCompleted}>
                                    clear {this.completed} completed
                                </ClearButton>
                            )}
                        </TodoFooter>
                    )}
                </TodoFrame>
                <VerdictSection>
                    <VerdictRow $state={hasItems ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasItems ? 'pass' : 'pending'} />
                        {hasItems
                            ? `✓ ${this.items.length} items — each is a $TodoItem chemical with independent toggle state`
                            : '○ add an item to verify'}
                    </VerdictRow>
                    <VerdictRow $state={hasCompleted ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasCompleted ? 'pass' : 'pending'} />
                        {hasCompleted
                            ? `✓ ${this.completed} completed — cross-chemical read: $TodoApp.completed reads each $TodoItem.done`
                            : '○ toggle an item done to verify cross-chemical reads'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const TodoItem = $($TodoItem);
const TodoApp = $($TodoApp);

export default function Case1Demo() {
    return (
        <TodoApp>
            <TodoItem text="Learn $Chemistry" />
            <TodoItem text="Build something reactive" />
        </TodoApp>
    );
}
