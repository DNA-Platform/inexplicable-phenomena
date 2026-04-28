import React from 'react';
import styled from 'styled-components';
import { $Chemical, $check } from '@/abstraction/chemical';
import { $ } from '@/abstraction/chemical';

// ============================================================
// Styled components — the visual vocabulary
// ============================================================

const IngredientItem = styled.li`
    padding: 2px 0;
`;

const StepItem = styled.li`
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
    &:last-child { border-bottom: none; }
    strong { margin-right: 6px; }
`;

// ============================================================
// $Ingredient
// ============================================================

export class $Ingredient extends $Chemical {
    $name!: string;
    $amount!: string;

    view() {
        return <IngredientItem>{this.$amount} {this.$name}</IngredientItem>;
    }
}

// ============================================================
// $Step
// ============================================================

export class $Step extends $Chemical {
    $instruction!: string;
    $number = 0;

    view() {
        return <StepItem><strong>{this.$number}.</strong> {this.$instruction}</StepItem>;
    }
}

// ============================================================
// $Recipe — a chemical with semantic style properties
//
// Each visual element is a styled component stored as a class
// property. Subclasses override the property to change
// appearance. The view reads from this — polymorphism IS theming.
// ============================================================

const RecipeCard = styled.article`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
`;

const RecipeHeader = styled.header`
    cursor: pointer;
    padding: 12px 16px;
    background: #fafafa;
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover { background: #efefef; }
    h3 { margin: 0; font-size: 1em; }
    h3::before { content: '▸ '; color: #999; font-size: 0.8em; }
    small { color: #888; font-size: 0.8em; }
`;

const RecipeIngredients = styled.ul`
    columns: 2;
    list-style: none;
    padding: 0;
`;

const RecipeSteps = styled.ol`
    padding-left: 0;
    list-style: none;
`;

export class $Recipe extends $Chemical {
    $title!: string;
    $prepTime = 0;
    $cookTime = 0;

    ingredients: $Ingredient[] = [];
    steps: $Step[] = [];
    expanded = false;

    Card = RecipeCard;
    Header = RecipeHeader;
    Ingredients = RecipeIngredients;
    Steps = RecipeSteps;

    get totalTime(): number { return this.$prepTime + this.$cookTime; }

    $Recipe(...args: ($Ingredient | $Step)[]) {
        this.ingredients = args.filter(a => a instanceof $Ingredient).map(i => $check(i, $Ingredient));
        this.steps = args.filter(a => a instanceof $Step).map((s, i) => {
            s.$number = s.$number || i + 1;
            return $check(s, $Step);
        });
    }

    toggle() { this.expanded = !this.expanded; }

    view() {
        const { Card, Header, Ingredients, Steps } = this;
        return (
            <Card>
                <Header onClick={() => this.toggle()}>
                    <h3>{this.$title}</h3>
                    <small>{this.$prepTime}m prep · {this.$cookTime}m cook · {this.totalTime}m total</small>
                </Header>
                {this.expanded && <>
                    <Ingredients>
                        <$>{this.ingredients.map(ingredient => <ingredient.$Component />)}</$>
                    </Ingredients>
                    <Steps>
                        <$>{this.steps.map(step => <step.$Component />)}</$>
                    </Steps>
                </>}
            </Card>
        );
    }
}

// ============================================================
// $VeganRecipe — subclass overrides style properties
//
// Green accents signal the dietary category.
// The cookbook doesn't know. Polymorphism handles it.
// ============================================================

const VeganCard = styled(RecipeCard)`
    border-left: 3px solid #4caf50;
`;

const VeganHeader = styled(RecipeHeader)`
    background: #f6faf6;
    &:hover { background: #edf5ed; }
    &::after { content: '🌱'; margin-left: 8px; font-size: 0.8em; }
`;

export class $VeganRecipe extends $Recipe {
    Card = VeganCard;
    Header = VeganHeader;
}

// ============================================================
// $Cookbook — typed composition
//
// Receives $Recipe[] through the binding constructor.
// Computes aggregate data from typed children.
// ============================================================

const CookbookHeader = styled.header`
    margin-bottom: 32px;
    border-bottom: 2px solid #333;
    padding-bottom: 16px;
    h1 { margin: 0; font-size: 2em; }
    h2 { margin: 4px 0 0; font-weight: normal; color: #666; }
    p { color: #999; margin-top: 8px; }
`;

export class $Cookbook extends $Chemical {
    $title!: string;
    $author!: string;

    recipes: $Recipe[] = [];

    get totalPrepTime(): number { return this.recipes.reduce((sum, r) => sum + r.totalTime, 0); }
    get recipeCount(): number { return this.recipes.length; }

    $Cookbook(...recipes: $Recipe[]) {
        this.recipes = recipes.map(r => $check(r, $Recipe));
    }

    view() {
        return (
            <div>
                <CookbookHeader>
                    <h1>{this.$title}</h1>
                    {this.$author && <h2>{this.$author}</h2>}
                    <p>{this.recipeCount} recipes · {this.totalPrepTime} minutes total</p>
                </CookbookHeader>
                <$>{this.recipes.map(recipe => <recipe.$Component />)}</$>
            </div>
        );
    }
}

// ============================================================
// The membrane — $ disappears
// ============================================================

export const Cookbook = new $Cookbook().Component;
export const Recipe = new $Recipe().Component;
export const VeganRecipe = new $VeganRecipe().Component;
export const Ingredient = new $Ingredient().Component;
export const Step = new $Step().Component;
