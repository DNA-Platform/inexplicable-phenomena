import { $ } from '@dna-platform/chemistry';
import { opened } from '../../opened';
import $Book from '../../../../../mathematics/.library/.book';
import Cover from '../../../../../mathematics/.library/.cover';
import Synopsis from '../../../../../mathematics/.library/.synopsis';
import Table from '../../../../../mathematics/.library/.table';
import SaggioDiInterpretazioneDellaGeometriaNonEuclidea1 from '../../../../../mathematics/.library/1-saggio-di-interpretazione-della-geometria-non-euclidea';
import OnTheRepresentationOfALargeEvenInteger2 from '../../../../../mathematics/.library/2-on-the-representation-of-a-large-even-integer';
import ContinuityAndIrrationalNumbers3 from '../../../../../mathematics/.library/3-continuity-and-irrational-numbers';
import ArithmetizationOfMetamathematicsInAGeneralSetting4 from '../../../../../mathematics/.library/4-arithmetization-of-metamathematics-in-a-general-setting';
import DemonstratioNovaTheorematis5 from '../../../../../mathematics/.library/5-demonstratio-nova-theorematis';
import OnFormallyUndecidablePropositions6 from '../../../../../mathematics/.library/6-on-formally-undecidable-propositions';
import SomeProblemsOfPartitioNumerorumIii7 from '../../../../../mathematics/.library/7-some-problems-of-partitio-numerorum-iii';
import TheFoundationsOfGeometry8 from '../../../../../mathematics/.library/8-the-foundations-of-geometry';
import OnSurfacesOfConstantGaussianCurvature9 from '../../../../../mathematics/.library/9-on-surfaces-of-constant-gaussian-curvature';
import OutlineOfATheoryOfTruth10 from '../../../../../mathematics/.library/10-outline-of-a-theory-of-truth';
import SolutionOfAProblemOfLeonHenkin11 from '../../../../../mathematics/.library/11-solution-of-a-problem-of-leon-henkin';
import GeometricalResearchesOnTheTheoryOfParallels12 from '../../../../../mathematics/.library/12-geometrical-researches-on-the-theory-of-parallels';
import ExtensionsOfSomeTheoremsOfGodelAndChurch13 from '../../../../../mathematics/.library/13-extensions-of-some-theorems-of-godel-and-church';
import OnComputableNumbers14 from '../../../../../mathematics/.library/14-on-computable-numbers';
import SystemsOfLogicBasedOnOrdinals15 from '../../../../../mathematics/.library/15-systems-of-logic-based-on-ordinals';

const Book = $($Book);

export const book = () => (
    <Book>
        {Cover()}
        {Synopsis()}
        {Table()}
        {SaggioDiInterpretazioneDellaGeometriaNonEuclidea1()}
        {OnTheRepresentationOfALargeEvenInteger2()}
        {ContinuityAndIrrationalNumbers3()}
        {ArithmetizationOfMetamathematicsInAGeneralSetting4()}
        {DemonstratioNovaTheorematis5()}
        {OnFormallyUndecidablePropositions6()}
        {SomeProblemsOfPartitioNumerorumIii7()}
        {TheFoundationsOfGeometry8()}
        {OnSurfacesOfConstantGaussianCurvature9()}
        {OutlineOfATheoryOfTruth10()}
        {SolutionOfAProblemOfLeonHenkin11()}
        {GeometricalResearchesOnTheTheoryOfParallels12()}
        {ExtensionsOfSomeTheoremsOfGodelAndChurch13()}
        {OnComputableNumbers14()}
        {SystemsOfLogicBasedOnOrdinals15()}
    </Book>
);

if (import.meta.hot) import.meta.hot.accept(next => { if (next !== undefined) opened.open(next.book); });
