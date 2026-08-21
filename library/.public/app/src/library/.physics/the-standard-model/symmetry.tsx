import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title } from '@dna-platform/lib';

export class $Symmetry extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Symmetry: The Change That Changes Nothing</Title>
                    {'\n\nA symmetry is a change that changes nothing. Rotate a sphere and you have the same sphere; that is the whole idea, and everything after it is bookkeeping about which changes leave which things alone. The bookkeeping turns out to be most of physics, which is either a scandal or a clue depending on how the day is going.'}
                    {'\n\nBegin with the least interesting case, because it is the one that fixes the vocabulary. Take a square drawn on paper. Turn it a quarter turn and the drawing is indistinguishable from the drawing you started with. Turn it an eighth of a turn and it is not. The quarter turn belongs to the square and the eighth turn does not, and the collection of the turns that belong is a more durable description of the square than any list of its corners: the corners move, the collection does not.'}
                    {'\n\n> A symmetry is not a property a thing has. It is a way of failing to tell two situations apart.'}
                    {'\n\nThat sentence is worth reading twice, because the whole subject leans on it. Symmetry is stated negatively. It is the absence of a distinction, and an absence of a distinction is a fact about what can be measured rather than a fact about what is there. Two arrangements related by a symmetry are not merely similar; there is no experiment that separates them, and physics declines to call them different.'}

                    {'\n\n## What is conserved, and why it had to be something'}
                    {'\n\nIn 1918 Emmy Noether proved the theorem that turned this from an aesthetic observation into a working instrument. Every continuous symmetry of a physical system corresponds to a conserved quantity. Not roughly — exactly, and with a recipe for building one from the other.'}
                    {'\n\nThe correspondences read like a translation table between two languages nobody had noticed were the same language.'}
                    {'\n\n- Move an experiment sideways and nothing changes. That is momentum.\n- Run it an hour later and nothing changes. That is energy.\n- Turn it to face another way and nothing changes. That is angular momentum.\n- Shift the phase of a charged field and nothing changes. That is electric charge.'}
                    {'\n\nThe first three are ordinary enough that they feel like accounting. The fourth is not, and it is the one this book is about, because the change involved is not a change anybody can perform. You cannot slide the phase of an electron field the way you can slide a table across a room. The invariance is a statement about a description, and out of a statement about a description falls a quantity that shows up on an ammeter.'}
                    {'\n\nNoether’s theorem is usually written down in one line, and the line is worth seeing even if the derivation is not:'}
                    {'\n\n$$\\frac{d}{dt}\\left(\\frac{\\partial L}{\\partial \\dot q}\\delta q - L\\,\\delta t\\right) = 0$$'}
                    {'\n\nEverything interesting is hidden in what δq is allowed to be. Choose the shifts that leave the Lagrangian alone and the bracket stops moving. Choose any other shifts and it does not, and the bracket means nothing.'}

                    {'\n\n## Broken, hidden, and merely approximate'}
                    {'\n\nA symmetry can fail in more than one way, and the ways are not interchangeable. It is worth keeping them apart, because two of the three are how the world got its variety.'}
                    {'\n\nAn **approximate** symmetry is one that holds until you look closely. Isospin treats the proton and the neutron as two faces of one particle, and it works well until the electric charge of the proton is allowed to matter. Nothing deep is happening; the symmetry was a good approximation and stopped being one.'}
                    {'\n\nA **broken** symmetry is stranger. The laws keep the symmetry and the solutions do not. A pencil balanced on its point obeys rules with no preferred direction, and it falls in a particular direction anyway. Nothing chose; the situation could not stay symmetric and remain a situation. Physics calls this spontaneous breaking, and the Higgs field is its most consequential instance: the vacuum picked a phase, and every mass in the table below follows from that one unforced choice.'}
                    {'\n\nAn **anomalous** symmetry is the unsettling one. It holds in the classical theory and fails when the theory is quantised — not because anybody approximated, but because the act of counting states cannot be done symmetrically. A symmetry that survives the equations and dies in the measure is a reminder that the equations were never the whole of the physics.'}

                    {'\n\n## The table, and what it does not explain'}
                    {'\n\nWhat follows from all of this is a very short list of ingredients and a very long list of consequences.'}
                    {'\n\nTwelve fermions in three generations, arranged so that each generation is a photocopy of the first at a different mass. Four force-carrying fields. One scalar that gives the rest their mass by breaking a symmetry the laws still respect. That is the entire inventory of everything anyone has ever measured, and it fits on a postcard.'}
                    {'\n\n$$\\mathcal{L} = -\\tfrac{1}{4}F_{\\mu\\nu}F^{\\mu\\nu} + i\\bar\\psi\\gamma^\\mu D_\\mu\\psi + \\text{h.c.} + \\psi_i y_{ij}\\psi_j\\phi + \\text{h.c.} + |D_\\mu\\phi|^2 - V(\\phi)'}
                    {'\n\nFive terms. The first says the force fields propagate. The second says matter moves and feels them. The third gives matter its mass. The fourth gives the Higgs its own dynamics. The fifth is the potential whose shape does the breaking.'}
                    {'\n\nAnd the honest part: not one of the twenty-odd numbers in those terms is explained by any of it. The masses are measured and inserted. The mixing angles are measured and inserted. The theory says what the shape of the answer is and declines to say why the answer has the value it has, which is the position every successful physical theory has eventually found itself in.'}

                    {'\n\n## A note on what a field is'}
                    {'\n\nIt is easy to read the word *field* as a picture — an invisible substance filling space, jelly with ripples in it. The picture is a hindrance more often than a help.'}
                    {'\n\nA field is a rule that assigns a value to every point, and the values in question are not positions of anything. When the electron field is excited in a region, an electron is there; when it is not, no electron is. The particle is not in the field the way a fish is in the sea. The particle is what a certain kind of excitation is called.'}
                    {'\n\n> The question "what is the field made of" has the same shape as the question "what is a promise made of." It is asking for a substance where the answer is a structure.'}
                    {'\n\nThis matters for symmetry because the changes that leave things alone are changes to the rule, not motions of a substance. When the phase of a field is shifted everywhere at once, nothing moves. Something is described differently, and the difference makes no difference — which is, precisely, a symmetry.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA change that changes nothing, the conserved quantity it forces into existence, the three ways it can fail, and the very short list that follows.'}
                </Section>
            </>
        );
    }
}

export const Symmetry = $($Symmetry);
