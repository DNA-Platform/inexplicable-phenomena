import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $$Book, $CardCatalogue, Book, CardCatalogue } from '@dna-platform/lib';

// THE CARDS OF THIS LIBRARY, GENERATED. A card in the framework is an
// $$Book and nothing more; which fields a library's cards carry is
// that library's business, so this declares them.
//
// Identity is the ROUTE, because a route is what a reader arrives holding. The
// title is writing and may change without breaking a link.
//
// NOTHING HERE IMPORTS A BOOK. A card is a book present without the book, and a
// module that reached for one would be handling the item it stands in for.
export class $Card extends $$Book {
    $title = '';
    $subtitle = '';
    $synopsis = '';
    $chapters: string[] = [];

    get path(): string { return this.name; }

    get title(): string { return this.$title; }

    get subtitle(): string { return this.$subtitle; }

    get synopsis(): string { return this.$synopsis; }

    get chapters(): string[] { return this.$chapters; }

    // NARROWED, because every card in THIS library is a $Card. The base promises
    // a $$Book; a generated catalogue knows better and says so.
    override get subject(): $Card | undefined { return this.$subject as $Card | undefined; }

    override get library(): $Card | undefined { return super.library as $Card | undefined; }

    // NO CANONICAL LINK. A canonical link is a SUBJECT'S — it says which of the
    // books a subject holds speaks for it — and a card catalogues nothing.
    //
    // AND NO LIBRARY CLIMB. It used to live here, and a rule about books that
    // lives in generated code is a rule with two homes that can disagree. It is
    // $Book.library now, in the framework, asked of a book rather than a card.
}

const Card = $($Card);

const card = (path: string, title: string, subtitle: string, synopsis: string, chapters: string[]): $Card =>
    $(<Card name={path} title={title} subtitle={subtitle} synopsis={synopsis} chapters={chapters} />) as $Card;

export const library: $Card = card("/", "A Test Library", "", "Two subjects, four books, every rule exercised.", ["What This Library Is", "What This Library Exercises"]);
export const philosophy: $Card = card("/philosophy", "Philosophy", "The Study of What Follows", "One book, no declaration.", []);
export const philosophyTheHardProblem: $Card = card("/philosophy/the-hard-problem", "The Hard Problem", "Why There Is Something It Is Like", "Function explained, experience unexplained.", ["What It Is Like"]);
export const physics: $Card = card("/physics", "Physics", "The Study of What There Is", "Two books, one of them canonical.", ["What Physics Is"]);
export const physicsGaugeTheory: $Card = card("/physics/gauge-theory", "Gauge Theory", "The Shape of a Force", "A local symmetry, and the force it demands.", ["The Gauge Principle"]);
export const physicsTheStandardModel: $Card = card("/physics/the-standard-model", "The Standard Model", "A Catalogue of Fields", "Twelve fermions, four forces, one field.", ["Symmetry"]);
export const theTeam: $Card = card("/the-team", "The Team", "An Autobiography", "The book that wrote itself, so the others have somebody to name.", ["Who We Are"]);

// THE SUBJECT LINKS, CARD TO CARD. Nothing is opened to answer any of these: the
// library computes recursively through them, and agreement is checked in place
// rather than by walking books.
library.$subject = library;
philosophy.$subject = library;
philosophyTheHardProblem.$subject = philosophy;
physics.$subject = library;
physicsGaugeTheory.$subject = physics;
physicsTheStandardModel.$subject = physics;
theTeam.$subject = library;

// WHO WROTE EACH, AND WHAT EACH SUBJECT HOLDS. The annotation rules ask a card
// these and the card carried neither — which is why $Subject, $Author and
// $Canonical shipped byte-identical: there was nothing for them to differ ABOUT.
library.$author = theTeam;
physicsGaugeTheory.$author = theTeam;
theTeam.$author = theTeam;
library.$entries = [physics, philosophy, theTeam];
philosophy.$entries = [philosophyTheHardProblem];
physics.$entries = [physicsTheStandardModel, physicsGaugeTheory];

// A CLASS, so a SCOPE CAN HOLD ONE. An annotation asks its scope for the
// catalogue and finds its own card there, which is why nothing has to be inserted
// into <Author>The Team</Author>. The composition root registers this.
export class $TheCatalogue extends $CardCatalogue {
    override $cards: $$Book[] = [
        library,
        philosophy,
        philosophyTheHardProblem,
        physics,
        physicsGaugeTheory,
        physicsTheStandardModel,
        theTeam,
    ];
}

export const TheCatalogue = $($TheCatalogue);

export const catalogue = $(<TheCatalogue />) as $TheCatalogue;

// AND THE SCOPE IS GIVEN IT. An annotation asks its scope for the catalogue and
// finds its own card there — which is why nothing is inserted into an element a
// person wrote. A library declaring its own catalogue is content, not
// configuration, so it is declared here rather than in the application.
export const file = (): void => { $(Book, CardCatalogue)(TheCatalogue); };

export const at = (path: string): $Card | undefined =>
    catalogue.holds(path) ? catalogue.card(path) as $Card : undefined;
