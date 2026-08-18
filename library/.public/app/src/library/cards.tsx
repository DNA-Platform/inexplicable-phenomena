import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $IndexCard, IndexCard, $CardCatalogue } from '@dna-platform/lib';

// THE CARDS OF THIS LIBRARY, GENERATED. A card in the framework is an
// $IndexCard<$Book> and nothing more; which fields a library's cards carry is
// that library's business, so this declares them.
//
// Identity is the ROUTE, because a route is what a reader arrives holding. The
// title is writing and may change without breaking a link.
//
// NOTHING HERE IMPORTS A BOOK. A card is a book present without the book, and a
// module that reached for one would be handling the item it stands in for.
export class $Card extends $IndexCard<$Book> {
    $title = '';
    $subtitle = '';
    $synopsis = '';
    $chapters: string[] = [];
    $subject?: $Card = undefined;

    get path(): string { return this.name; }

    get title(): string { return this.$title; }

    get subtitle(): string { return this.$subtitle; }

    get synopsis(): string { return this.$synopsis; }

    get chapters(): string[] { return this.$chapters; }

    get subject(): $Card | undefined { return this.$subject; }

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

export const library: $Card = card("/", "A Test Library", "", "Two subjects, four books, every rule exercised.", ["Synopsis", "What This Library Is", "What This Library Exercises"]);
export const philosophy: $Card = card("/philosophy", "Philosophy", "The Study of What Follows", "One book, no declaration.", ["Synopsis"]);
export const philosophyTheHardProblem: $Card = card("/philosophy/the-hard-problem", "The Hard Problem", "Why There Is Something It Is Like", "Function explained, experience unexplained.", ["Synopsis", "What It Is Like"]);
export const physics: $Card = card("/physics", "Physics", "The Study of What There Is", "Two books, one of them canonical.", ["Synopsis", "What Physics Is"]);
export const physicsGaugeTheory: $Card = card("/physics/gauge-theory", "Gauge Theory", "The Shape of a Force", "A local symmetry, and the force it demands.", ["Synopsis", "The Gauge Principle"]);
export const physicsTheStandardModel: $Card = card("/physics/the-standard-model", "The Standard Model", "A Catalogue of Fields", "Twelve fermions, four forces, one field.", ["Synopsis", "Symmetry"]);
export const theTeam: $Card = card("/the-team", "The Team", "An Autobiography", "The book that wrote itself, so the others have somebody to name.", ["Synopsis", "Who We Are"]);

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

export const catalogue = new $CardCatalogue<$Book>(
    library,
    philosophy,
    philosophyTheHardProblem,
    physics,
    physicsGaugeTheory,
    physicsTheStandardModel,
    theTeam,
);

export const at = (path: string): $Card | undefined =>
    catalogue.holds(path) ? catalogue.card(path) as $Card : undefined;
