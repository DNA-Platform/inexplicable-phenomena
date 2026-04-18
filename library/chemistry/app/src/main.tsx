import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { createRoot } from 'react-dom/client';
import { Highlight, themes } from 'prism-react-renderer';
import { Cookbook, Recipe, VeganRecipe, Ingredient, Step } from '@books/recipe';

// ============================================================
// Design system
// ============================================================

const GlobalStyle = createGlobalStyle`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Georgia', 'Times New Roman', serif; color: #2c2c2c; background: #f5f3ef; }
    button { font-family: inherit; }
`;

const Shell = styled.div` display: flex; min-height: 100vh; `;

const Sidebar = styled.nav`
    width: 260px; background: #2c2416; color: #c4b99a; display: flex; flex-direction: column;
    border-right: 1px solid #3d3225;
`;

const Logo = styled.div`
    padding: 24px 20px; border-bottom: 1px solid #3d3225;
    h1 { font-size: 1.2em; color: #e8dcc8; font-weight: normal; letter-spacing: 0.02em; }
    h1 span { color: #c0392b; font-weight: bold; }
    p { font-size: 0.75em; color: #8a7d6b; margin-top: 6px; line-height: 1.4; font-style: italic; }
`;

const ShelfLabel = styled.div`
    padding: 16px 20px 8px; font-size: 0.65em; text-transform: uppercase;
    letter-spacing: 0.12em; color: #6b5d4a;
`;

const BookSpine = styled.button<{ $active?: boolean; $color?: string }>`
    display: block; width: calc(100% - 16px); margin: 0 8px 4px; padding: 10px 12px;
    text-align: left; cursor: pointer; border: none; border-radius: 3px;
    background: ${p => p.$active ? (p.$color || '#4a3c2a') : 'transparent'};
    color: ${p => p.$active ? '#f5f0e8' : '#a89878'};
    font-family: inherit; font-size: 0.85em; transition: all 0.15s;
    border-left: 3px solid ${p => p.$active ? '#c0392b' : 'transparent'};
    &:hover { background: ${p => p.$active ? undefined : '#3a2e1e'}; color: #d4c8b0; }
    small { display: block; font-size: 0.8em; color: ${p => p.$active ? '#c4b99a' : '#6b5d4a'}; margin-top: 2px; font-style: italic; }
`;

const Content = styled.main` flex: 1; overflow-y: auto; `;
const ContentInner = styled.div` max-width: 780px; margin: 0 auto; padding: 40px; `;

// ============================================================
// Test annotation — subtle overlay on book content
// ============================================================

const TestNote = styled.div`
    background: #faf8f4; border: 1px solid #e8e2d8; border-radius: 6px;
    padding: 14px 18px; margin-bottom: 24px; font-size: 0.82em; line-height: 1.5;
    color: #6b5d4a;
    strong { color: #2c2416; display: block; margin-bottom: 4px; font-size: 0.9em; }
    .verify { margin-top: 8px; padding-top: 8px; border-top: 1px solid #e8e2d8; }
    .pass { color: #2e7d32; } .fail { color: #c62828; }
`;

const BookArea = styled.div`
    background: #fff; border: 1px solid #e0dbd3; border-radius: 8px;
    padding: 28px; margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
`;

// ============================================================
// Code viewer
// ============================================================

function ViewSource({ code, children }: { code: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <SourceLayout $open={open}>
            <SourceMain>
                {children}
                <SourceToggle onClick={() => setOpen(!open)}>
                    {open ? '✕ Close Source' : '{ } View Source'}
                </SourceToggle>
            </SourceMain>
            {open && (
                <SourcePanel>
                    <Highlight theme={themes.github} code={code.trim()} language="tsx">
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                            <SourceBlock style={style}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        {line.map((token, key) => <span key={key} {...getTokenProps({ token })} />)}
                                    </div>
                                ))}
                            </SourceBlock>
                        )}
                    </Highlight>
                </SourcePanel>
            )}
        </SourceLayout>
    );
}

const SourceLayout = styled.div<{ $open?: boolean }>`
    display: ${p => p.$open ? 'grid' : 'block'};
    grid-template-columns: ${p => p.$open ? '1fr 1fr' : '1fr'};
    gap: 16px;
`;
const SourceMain = styled.div``;
const SourcePanel = styled.div`
    max-height: 600px; overflow-y: auto;
    border: 1px solid #e8e2d8; border-radius: 6px; background: #fdfcfa;
`;
const SourceToggle = styled.button`
    background: #f5f3ef; border: 1px solid #e0dbd3; color: #6b5d4a; cursor: pointer;
    font-size: 0.8em; padding: 6px 12px; border-radius: 4px; margin-top: 12px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    &:hover { background: #ebe8e2; color: #2c2416; }
`;
const SourceBlock = styled.pre`
    font-size: 0.75em !important; line-height: 1.6; padding: 16px !important;
    margin: 0 !important; border-radius: 0;
`;

// ============================================================
// Welcome
// ============================================================

const WelcomePage = styled.div`
    text-align: center; padding: 60px 20px;
    h2 { font-size: 1.8em; font-weight: normal; color: #2c2416; margin-bottom: 16px; }
    p { color: #8a7d6b; line-height: 1.7; max-width: 520px; margin: 0 auto 12px; font-size: 0.95em; }
    .accent { color: #c0392b; }
`;

function Welcome() {
    return (
        <WelcomePage>
            <h2>The <span className="accent">$</span>Chemistry Bookshelf</h2>
            <p>
                A component framework where objects react. Each book on the shelf
                demonstrates a framework capability through natural interaction.
                Open a book. Read it. Interact with it. The books ARE the tests.
            </p>
            <p>
                Select a book from the shelf to begin.
            </p>
        </WelcomePage>
    );
}

// ============================================================
// The books
// ============================================================

function HomeCooking() {
    return <>
        <TestNote>
            <strong>Typed Composition · Expand/Collapse · Polymorphism</strong>
            This cookbook's binding constructor receives typed recipes. The header
            shows aggregate stats computed from the recipe objects. Click any
            recipe header (▸) to expand and see its ingredients and steps.
            The 🌱 recipe is a $VeganRecipe subclass — it gets a different
            look through two overridden style properties, not through props.
            <div className="verify">
                <span className="pass">✓ Recipes expand on click. Header shows "3 recipes · 67 minutes total". The 🌱 recipe has a green accent.</span><br />
                <span className="fail">✗ Nothing expands on click, or the aggregate stats show 0.</span>
            </div>
        </TestNote>
        <ViewSource code={`// The binding constructor IS the composition API.
class $Cookbook extends $Chemical {
    $title!: string;
    recipes: $Recipe[] = [];
    get totalTime() {
        return this.recipes.reduce(
            (s, r) => s + r.$prepTime + r.$cookTime, 0);
    }
    $Cookbook(...recipes: $Recipe[]) {
        this.recipes = recipes.map(r => $check(r, $Recipe));
    }
}

// Polymorphism — two properties change the look:
class $VeganRecipe extends $Recipe {
    Card = VeganCard;    // green left border
    Header = VeganHeader; // subtle green tint
}`}>
        <BookArea>
            <Cookbook title="Home Cooking" author="">
                <Recipe title="Pasta Aglio e Olio" prepTime={5} cookTime={15}>
                    <Ingredient name="spaghetti" amount="400g" />
                    <Ingredient name="garlic" amount="6 cloves, thinly sliced" />
                    <Ingredient name="extra virgin olive oil" amount="⅓ cup" />
                    <Ingredient name="red pepper flakes" amount="1 tsp" />
                    <Ingredient name="flat-leaf parsley" amount="¼ cup, chopped" />
                    <Step instruction="Bring a large pot of generously salted water to a rolling boil." />
                    <Step instruction="Cook spaghetti until just short of al dente — it will finish in the pan." />
                    <Step instruction="Warm olive oil in a large skillet over medium heat. Add garlic, cook until pale gold. Not brown — gold." />
                    <Step instruction="Add red pepper flakes, toss in drained pasta with a splash of pasta water. Toss until the sauce clings." />
                    <Step instruction="Finish with parsley. Serve immediately." />
                </Recipe>
                <VeganRecipe title="Roasted Cauliflower Tacos" prepTime={15} cookTime={25}>
                    <Ingredient name="cauliflower" amount="1 large head, in florets" />
                    <Ingredient name="cumin" amount="1 tsp" />
                    <Ingredient name="smoked paprika" amount="1 tsp" />
                    <Ingredient name="corn tortillas" amount="8 small" />
                    <Ingredient name="ripe avocado" amount="2, sliced" />
                    <Ingredient name="lime" amount="1, in wedges" />
                    <Step instruction="Toss cauliflower with olive oil, cumin, smoked paprika, and salt." />
                    <Step instruction="Roast at 425°F for 25 minutes until deeply caramelized." />
                    <Step instruction="Warm tortillas in a dry skillet. Fill with cauliflower, avocado, and a squeeze of lime." />
                </VeganRecipe>
                <Recipe title="Perfect Scrambled Eggs" prepTime={2} cookTime={5}>
                    <Ingredient name="eggs" amount="3 large" />
                    <Ingredient name="unsalted butter" amount="1 tbsp" />
                    <Ingredient name="flaky salt" amount="to finish" />
                    <Step instruction="Crack eggs into a cold pan with butter." />
                    <Step instruction="Stir constantly over medium-low. Large, soft curds." />
                    <Step instruction="Remove while still slightly wet. Season with salt." />
                </Recipe>
            </Cookbook>
        </BookArea>
        </ViewSource>
    </>;
}

function TwoKitchens() {
    return <>
        <TestNote>
            <strong>What you're testing: Instance Independence</strong>
            Two cookbooks rendered from the same .Component template. Each creates its own
            instance via Object.create(). Expand a recipe in one kitchen — the other is unaffected.
            <div className="verify">
                <span className="pass">✓ Expanding in Kitchen A doesn't affect Kitchen B.</span><br />
                <span className="fail">✗ Both kitchens expand/collapse together.</span>
            </div>
        </TestNote>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <BookArea>
                <Cookbook title="Kitchen A" author="Chef Alice">
                    <Recipe title="Risotto" prepTime={10} cookTime={25}>
                        <Ingredient name="arborio rice" amount="1½ cups" />
                        <Ingredient name="white wine" amount="½ cup" />
                        <Ingredient name="parmesan" amount="1 cup, grated" />
                        <Step instruction="Toast rice in butter. Add wine." />
                        <Step instruction="Ladle in warm stock, stirring, until creamy." />
                        <Step instruction="Finish with parmesan off the heat." />
                    </Recipe>
                    <Recipe title="Green Salad" prepTime={5} cookTime={0}>
                        <Ingredient name="mixed greens" amount="a big handful" />
                        <Ingredient name="lemon" amount="½" />
                        <Step instruction="Wash. Dress with olive oil and lemon. Season." />
                    </Recipe>
                </Cookbook>
            </BookArea>
            <BookArea>
                <Cookbook title="Kitchen B" author="Chef Bob">
                    <VeganRecipe title="Mushroom Ragu" prepTime={10} cookTime={30}>
                        <Ingredient name="mixed mushrooms" amount="500g" />
                        <Ingredient name="crushed tomatoes" amount="1 can" />
                        <Ingredient name="fresh thyme" amount="a few sprigs" />
                        <Step instruction="Sear mushrooms in batches until golden." />
                        <Step instruction="Add tomatoes and thyme. Simmer 20 minutes." />
                        <Step instruction="Serve over polenta or pasta." />
                    </VeganRecipe>
                    <Recipe title="Garlic Bread" prepTime={5} cookTime={10}>
                        <Ingredient name="baguette" amount="1" />
                        <Ingredient name="garlic butter" amount="4 tbsp" />
                        <Step instruction="Split, spread with garlic butter, broil until golden." />
                    </Recipe>
                </Cookbook>
            </BookArea>
        </div>
    </>;
}

// ============================================================
// Bookshelf
// ============================================================

const books = [
    {
        shelf: 'Cookbooks',
        items: [
            { id: 'home-cooking', title: 'Home Cooking', author: 'Composition tests', color: '#5a3e28', component: HomeCooking },
            { id: 'two-kitchens', title: 'Two Kitchens', author: 'Side by Side', color: '#3e5a28', component: TwoKitchens },
        ]
    },
];

function App() {
    const [activeId, setActiveId] = useState<string | null>('home-cooking');
    const active = books.flatMap(s => s.items).find(b => b.id === activeId);
    const Page = active?.component;

    return (
        <>
            <GlobalStyle />
            <Shell>
                <Sidebar>
                    <Logo>
                        <h1><span>$</span>Chemistry</h1>
                        <p>A component framework where objects react</p>
                    </Logo>
                    {books.map(shelf => (
                        <React.Fragment key={shelf.shelf}>
                            <ShelfLabel>{shelf.shelf}</ShelfLabel>
                            {shelf.items.map(book => (
                                <BookSpine
                                    key={book.id}
                                    $active={activeId === book.id}
                                    $color={book.color}
                                    onClick={() => setActiveId(book.id)}
                                >
                                    {book.title}
                                    <small>{book.author}</small>
                                </BookSpine>
                            ))}
                        </React.Fragment>
                    ))}
                </Sidebar>
                <Content>
                    <ContentInner>
                        {Page ? <Page /> : <Welcome />}
                    </ContentInner>
                </Content>
            </Shell>
        </>
    );
}

createRoot(document.getElementById('root')!).render(<App />);
