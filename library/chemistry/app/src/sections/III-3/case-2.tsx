import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    BookFrame, BookTitle, ChapterList,
    ErrorBox, SuccessBox,
} from './case.styled';

class $Chapter extends $Chemical {
    $title?: string;
    view() { return <li>{this.$title}</li>; }
}

class $Page extends $Chemical {
    view() { return <li>not a chapter</li>; }
}

class $StrictBook extends $Chemical {
    chapters: $Chapter[] = [];
    $StrictBook(...chapters: $Chapter[]) {
        this.chapters = chapters.map(c => $check(c, $Chapter));
    }
    view() {
        return (
            <BookFrame>
                <BookTitle>strict book</BookTitle>
                <ChapterList>
                    {this.chapters.map((c, i) => {
                        const C = $(c);
                        return <C key={i} />;
                    })}
                </ChapterList>
            </BookFrame>
        );
    }
}

const Chapter = $($Chapter);
const Page = $($Page);
const StrictBook = $($StrictBook);

// React class ErrorBoundary — required by React's reconciler. $Chemistry
// composes with the React ecosystem; error boundaries are a React primitive
// (only React.Component subclasses register as boundaries via componentDidCatch /
// getDerivedStateFromError). This is the same pattern as using <Link> from
// react-router or <QueryProvider> from react-query: chemicals compose with
// the package, they don't replace it.
class CatchBoundary extends React.Component<
    { children: React.ReactNode; resetKey: any },
    { error?: string }
> {
    state: { error?: string } = {};
    static getDerivedStateFromError(e: any) { return { error: String(e?.message ?? e) }; }
    componentDidUpdate(prev: any) {
        if (prev.resetKey !== this.props.resetKey && this.state.error) {
            this.setState({ error: undefined });
        }
    }
    render() {
        if (this.state.error) return <ErrorBox>$check threw: {this.state.error}</ErrorBox>;
        return this.props.children;
    }
}

// $BadGoodToggle — owns the toggle's reactive state. The button click writes
// $bad; the view reads it. Pure $Chemistry — no useState, no setter callbacks.
class $BadGoodToggle extends $Chemical {
    $bad = false;
    toggle() { this.$bad = !this.$bad; }

    view() {
        const bad = this.$bad;
        return (
            <div>
                <div style={{ marginBottom: '12px' }}>
                    <button
                        onClick={this.toggle}
                        style={{
                            padding: '6px 12px',
                            border: '1px solid currentColor',
                            borderRadius: '4px',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        {bad ? 'reset to valid children' : 'pass an invalid child ($Page instead of $Chapter)'}
                    </button>
                </div>
                <CatchBoundary resetKey={bad}>
                    {bad ? (
                        <StrictBook key="bad">
                            <Chapter title="Real chapter" />
                            <Page />
                        </StrictBook>
                    ) : (
                        <SuccessBox key="good">
                            ✓ Valid children. Click the button to inject a {'<Page />'} where $StrictBook expects only $Chapter; watch $check throw.
                        </SuccessBox>
                    )}
                </CatchBoundary>
            </div>
        );
    }
}

const BadGoodToggle = $($BadGoodToggle);

export default function Case2Demo() {
    return <BadGoodToggle />;
}
